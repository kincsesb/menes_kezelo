const express = require('express');
const { Client } = require('pg');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

const config = {
  user: 'kincsesbence',
  host: 'localhost',
  password: 'Kamilla21.',
  port: 5432,
  database: 'matai_menes_menes_kezelo',
};

const client = new Client(config);
client.connect();

app.get('/horses', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM public.horses');
    res.json(result.rows);
  } catch (err) {
    console.error('Hiba az adatok lekérése közben:', err);
    res.status(500).send('Hiba az adatok lekérése közben.');
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });