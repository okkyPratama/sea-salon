import express, { Response } from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthenticatedRequest } from "./middleware/auth";

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

// Reservation endpoints
app.post('/reservations', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, phone_number, service, date_time, branch_id } = req.body;
        
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const user_id = req.user.userId;

        const branchResult = await pool.query('SELECT opening_time, closing_time FROM branch WHERE id = $1', [branch_id]);
        if (branchResult.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid branch' });
        }
        const { opening_time, closing_time } = branchResult.rows[0];
        const reservationTime = new Date(date_time);
        const reservationTimeOnly = reservationTime.toTimeString().split(' ')[0];
        if (reservationTimeOnly < opening_time || reservationTimeOnly > closing_time) {
            return res.status(400).json({ error: 'Reservation time is outside branch opening hours' });
        }

        const serviceResult = await pool.query('SELECT * FROM branch_services WHERE branch_id = $1 AND service_id = (SELECT id FROM services WHERE name = $2)', [branch_id, service]);
        if (serviceResult.rows.length === 0) {
            return res.status(400).json({ error: 'Selected service is not offered at this branch' });
        }

        const result = await pool.query(
            'INSERT INTO reservations (user_id, name, phone_number, service, date_time, branch_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, name, phone_number, service, date_time, branch_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the reservation' });
    }
});

app.get('/reservations', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        const user_id = req.user.userId;
        const result = await pool.query(
            'SELECT r.*, b.branch_name FROM reservations r JOIN branch b ON r.branch_id = b.id WHERE r.user_id = $1 ORDER BY r.date_time DESC',
            [user_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching reservations' });
    }
});

// Services endpoint
app.get('/services',async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching services' });

    }
})

app.post('/services', authenticateToken, async (req, res) => {
    try {
        const { name, duration_per_session } = req.body;
        const result = await pool.query(
            'INSERT INTO services (name, duration_per_session) VALUES ($1, $2) RETURNING *',
            [name, duration_per_session]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the service' });
    }
});

// Branch endpoint
app.get('/branches', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM branch');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching services' });

    }
})

app.post('/branches', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
   
        const { branch_name, branch_location, opening_time, closing_time } = req.body;
        const result = await pool.query(
            'INSERT INTO branch (branch_name, branch_location, opening_time, closing_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [branch_name, branch_location, opening_time, closing_time]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the branch' });
    }
});

// branch-services endpoint
app.post('/branch-services', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {

        const { branch_id, service_name, duration_per_session } = req.body;

        const serviceResult = await pool.query(
            'INSERT INTO services (name, duration_per_session) VALUES ($1, $2) RETURNING id',
            [service_name, duration_per_session]
        );
        const service_id = serviceResult.rows[0].id;

        const result = await pool.query(
            'INSERT INTO branch_services (branch_id, service_id, duration_per_session) VALUES ($1, $2, $3) RETURNING *',
            [branch_id, service_id, duration_per_session]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding service to branch' });
    }
});

app.get('/branches-services', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT b.id, b.branch_name, b.opening_time, b.closing_time, 
                   json_agg(json_build_object('id', s.id, 'name', s.name, 'duration', bs.duration_per_session)) as services
            FROM branch b
            LEFT JOIN branch_services bs ON b.id = bs.branch_id
            LEFT JOIN services s ON bs.service_id = s.id
            GROUP BY b.id
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching branches and services' });
    }
});

app.get('/branch-services/:branchId', async (req, res) => {
    try {
        const { branchId } = req.params;
        const result = await pool.query(
            'SELECT s.id, s.name, bs.duration_per_session FROM services s JOIN branch_services bs ON s.id = bs.service_id WHERE bs.branch_id = $1',
            [branchId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching branch services' });
    }
});

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

