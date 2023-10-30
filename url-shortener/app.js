const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const shortid = require("shortid");

const app = express();

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db-short",
  password: "postgres",
  port: 5433
});

app.use(bodyParser.json());

app.post("/shorten-url", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "A URL é obrigatória" });
  }

  const query = {
    text: "SELECT * FROM urls WHERE original_url = $1",
    values: [url]
  };

  const result = await pool.query(query);

  if (result.rows.length > 0) {
    const existingUrl = result.rows[0];
    return res.json({ url: existingUrl.short_url });
  }

  const shortUrl = shortid.generate();

  const insertQuery = {
    text: "INSERT INTO urls(original_url, short_url) VALUES($1, $2) RETURNING *",
    values: [url, shortUrl]
  };

  const insertResult = await pool.query(insertQuery);
  const newUrl = insertResult.rows[0];

  res.json({ url: newUrl.short_url });
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  const query = {
    text: "SELECT * FROM urls WHERE short_url = $1",
    values: [shortUrl]
  };

  const result = await pool.query(query);

  if (result.rows.length > 0) {
    const url = result.rows[0];
    res.redirect(url.original_url);
  } else {
    res.status(404).send("URL não encontrada");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
