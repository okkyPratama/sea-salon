import express from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';
import cors from 'cors';

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
app.post('/bookings', async (req,res) => {
    try {
        const {name,phone_number,service,date_time} = req.body;
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

