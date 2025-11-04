import express from "express";
import cors from "cors";
import mysql from 'mysql2/promise';

import 'dotenv/config'

const app = express();

app.use(cors());

// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/api/ativos", async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT * FROM `ativos`'
    );
    return res.json(results);
  } catch (err) {
    console.log(err);
    return res.status(404).json({status: 404, msg: "Investimentos não encontrados"})
  }
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
