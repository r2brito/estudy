const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();

app.use(bodyParser.json());

const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db-pois",
  password: "postgres",
  port: 5433
});

app.post("/", async (req, res) => {
  const { name, x, y } = req.body;

  const query = "INSERT INTO pois (name, x, y) VALUES ($1, $2, $3) RETURNING *";
  const values = [name, x, y];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o POI");
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pois");
    res.json(result.rows);
  } catch (error) {
    console.log("error");
    res.status(500).send("Erro ao buscar POIs.");
  }
});

app.get("/pois/proximity", async (req, res) => {
  const { x, y, dmax } = req.query;

  const query =
    "SELECT * FROM pois WHERE sqrt(pow(x - $1, 2) + pow(y - $2, 2)) <= $3";
  const values = [x, y, dmax];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar POIs por proximidade");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
