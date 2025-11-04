import express from "express";
import cors from "cors";
import mysql from 'mysql2/promise';

import 'dotenv/config'

const app = express();

app.use(express.json());

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

app.post("/api/ativos", async (req, res) => {
  const { nome, valor_compra, quantidade } = req.body


    try {
      const sql =
        'INSERT INTO `ativos`(`nome`, `valor_compra`, `quantidade`) VALUES (?, ?, ?)';
      const values = [nome, valor_compra, quantidade];

      const [result, fields] = await connection.query(sql, values);

      res.json(result);
    } catch (err) {
      console.log(err);
    }
});

app.delete("/api/ativos/:id", async (req, res) => {
  const {id} = req.params

  try {
    const sql = 'DELETE FROM `ativos` WHERE `id` = ? LIMIT 1';
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);

    console.log(result);
    console.log(fields);

    res.json({status: "Deletado com sucesso", id: id})
  } catch (err) {
    res.status(500).json({msg: "Não foi possível deletar a linha"})
  }
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
