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

app.get('/test', async (req, res) => {
    try {
        const client  = await pool.connect();
        const result = await client.query('SELECT * FROM review');
        const results = { 'results': (result) ? result.rows : null};
        res.json(results);
        client.release();
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Error" + err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

