const express = require('express');
const { Client } = require('pg');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

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

app.put('/horses/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { work_type, vaccination_date, blood_test_date } = req.body;
  
      const updateQuery = `
        UPDATE horses
        SET work_type = $1, vaccination_date = $2, blood_test_date = $3
        WHERE id = $4
      `;
  
      await client.query(updateQuery, [work_type, vaccination_date, blood_test_date, id]);
  
      res.status(200).json({ message: `Ló adatai frissítve az ID: ${id} alapján.` });
    } catch (error) {
      console.error('Hiba történt a ló adatainak frissítése közben:', error);
      res.status(500).json({ error: 'Hiba történt a ló adatainak frissítése közben.' });
    }
  });
  

  //BLOB
  //LONG TEXT
  //A megjegyzés rovathoz
  
  app.get('/horses/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Lekérdezés azonosítója: ${id}`); // Hozzáadott console.log

      const selectQuery = `
        SELECT * FROM horses WHERE id = $1
      `;
  
      const result = await client.query(selectQuery, [id]);
  
      if (result.rowCount > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: `Nem található ló az ID: ${id} alapján.` });
      }
    } catch (error) {
      console.error('Hiba történt a ló lekérdezése közben:', error);
      res.status(500).json({ error: 'Hiba történt a ló lekérdezése közben.' });
    }
  });
  
  app.post('/horses', async (req, res) => {
    try {
        const {
            horse_name,
            horse_birthdate,
            horse_father,
            horse_mother,
            gender,
            bred,
            color,
            work_type,
            passport_number,
            chip_number,
            blood_test_date,
            vaccination_date,
        } = req.body;

        const insertQuery = `
            INSERT INTO horses (
                horse_name, horse_birthdate, horse_father, horse_mother, gender, bred, color, work_type, passport_number, chip_number, blood_test_date, vaccination_date
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;

        await client.query(insertQuery, [
            horse_name,
            horse_birthdate,
            horse_father,
            horse_mother,
            gender,
            bred,
            color,
            work_type,
            passport_number,
            chip_number,
            blood_test_date,
            vaccination_date,
        ]);

        res.status(201).json({ message: 'Ló sikeresen hozzáadva.' });
    } catch (error) {
        console.error('Hiba történt a ló hozzáadása közben:', error);
        res.status(500).json({ error: 'Hiba történt a ló hozzáadása közben.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });