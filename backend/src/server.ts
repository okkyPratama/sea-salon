import express from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken } from "./middleware/auth";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'sea_salon',
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
});

// Review endpoints
app.post('/reviews', async (req, res) => {
    try {
        const { customer_name, rating, comment } = req.body;
        const result = await pool.query(
            'INSERT INTO review (customer_name, rating, comment) VALUES ($1, $2, $3) RETURNING *',
            [customer_name, rating, comment]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating reviews' });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM review');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching reviews' });

    }
});

// Booking endpoints
app.post('/bookings',authenticateToken, async (req, res) => {
    try {
        const { name, phone_number, service, date_time } = req.body;
        const result = await pool.query(
            'INSERT INTO booking (name,phone_number,service,date_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone_number, service, date_time]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the booking' });
    }
})

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { fullname, email, phone_number, password } = req.body;
        
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({error: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const result = await pool.query(
            'INSERT INTO users (fullname, email, phone_number, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [fullname,email,phone_number,hashedPassword,'Customer']
        );

        const token = jwt.sign(
            { userId: result.rows[0].user_id, role: 'Customer' },
            process.env.JWT_TOKEN || 'IGXMO5GDcAUNPuUXh2fAt7X97c1SwgkF8jFNP96jOGo',
            {expiresIn: '1h'}
        );

        res.status(201).json({
            user: {
                user_id: result.rows[0].user_id,
                fullname: result.rows[0].fullname,
                email:result.rows[0].email,
                phone_number: result.rows[0].phone_number,
                role: 'Customer'
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'An error occured during registration process' })
    }

});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                const token = jwt.sign(
                    { userId: user.user_id, role: user.role },
                    process.env.JWT_TOKEN || 'IGXMO5GDcAUNPuUXh2fAt7X97c1SwgkF8jFNP96jOGo',
                    { expiresIn: '1h' }
                );

                res.json({
                    user: {
                        user_id: user.user_id,
                        fullname: user.fullname,
                        email: user.email,
                        phone_number: user.phone_number,
                        role: user.role
                    },
                    token
                })
            } else {
                res.status(401).json({ error: 'Invalid credentials' })
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occured during login' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

