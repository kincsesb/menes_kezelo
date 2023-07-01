const express = require('express');
const { Client } = require('pg');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

const createTable = require('./create_calendar_table');

const createHorseTable = require('./create_horse_table_for_mkdb');

app.use(cors());
app.use(express.json());

const config = {
  user: 'kincsesbence',
  host: 'db',
  password: 'Kamilla21.',
  port: 5432,
  database: 'matai_menes_menes_kezelo',
};

const client = new Client(config);

const connectWithRetry = async () => {
  for(let i=0; i<3; i++) {
    try {
      await client.connect();
      console.log('Database connection successful');

      await createTable(client);
      await createHorseTable(client);

      break;
    } catch(err) {
      console.log('Database connection unsuccessful, retry after 1 second');
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}

connectWithRetry();


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
  console.log("Put received")
  try {
    const { id } = req.params;
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
      has_children,
      is_government_subsidized,
      status
    } = req.body;

    const updateQuery = `
      UPDATE horses
      SET horse_name = $1, horse_birthdate = $2, horse_father = $3, horse_mother = $4, gender = $5, bred = $6, color = $7, work_type = $8, passport_number = $9, chip_number = $10, blood_test_date = $11, vaccination_date = $12, has_children = $13, is_government_subsidized = $14, status = $15
      WHERE id = $16
    `;

    await client.query(updateQuery, [
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
      has_children,
      is_government_subsidized,
      status,
      id
    ]);

    res.status(200).json({ message: `Ló adatai frissítve az ID: ${id} alapján.` });
  } catch (error) {
    console.error('Hiba történt a ló adatainak frissítése közben:', error);
    res.status(500).json({ error: 'Hiba történt a ló adatainak frissítése közben.' });
  }
});


app.put('/horses/:id/notes', async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const updateQuery = `
      UPDATE horses
      SET note = $1
      WHERE id = $2
    `;

    await client.query(updateQuery, [note, id]);

    res.status(200).json({ message: `Ló megjegyzése frissítve az ID: ${id} alapján.` });
  } catch (error) {
    console.error('Hiba történt a ló megjegyzésének frissítése közben:', error);
    res.status(500).json({ error: 'Hiba történt a ló megjegyzésének frissítése közben.' });
  }
});


app.get('/horses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Lekérdezés azonosítója: ${id}`);

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
      has_children,
      is_government_subsidized,
      status
    } = req.body;

    const insertQuery = `
        INSERT INTO horses (
          horse_name, horse_birthdate, horse_father, horse_mother, gender, bred, color, work_type, passport_number, chip_number, blood_test_date, vaccination_date, has_children, is_government_subsidized, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
      has_children,
      is_government_subsidized,
      status
    ]);

    res.status(201).json({ message: 'Ló sikeresen hozzáadva.' });
  } catch (error) {
    console.error('Hiba történt a ló hozzáadása közben:', error);
    res.status(500).json({ error: 'Hiba történt a ló hozzáadása közben.' });
  }
});


app.delete('/horses/:id/notes', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteQuery = `
      UPDATE horses
      SET note = ''
      WHERE id = $1
    `;

    await client.query(deleteQuery, [id]);

    res.status(200).json({ message: `Ló megjegyzése törölve az ID: ${id} alapján.` });
  } catch (error) {
    console.error('Hiba történt a ló megjegyzésének törlése közben:', error);
    res.status(500).json({ error: 'Hiba történt a ló megjegyzésének törlése közben.' });
  }
});

app.get('/api/events', (req, res) => {
  client.query('SELECT * FROM calendar', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.post('/api/events', (req, res) => {
  const { title, start_date, end_date } = req.body;
  client.query('INSERT INTO calendar (title, start_date, end_date) VALUES ($1, $2, $3) RETURNING id', [title, start_date, end_date], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send(`Event added with ID: ${results.rows[0].id}`);
  });
});

app.put('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, start_date, end_date } = req.body;

  client.query(
    'UPDATE calendar SET title = $1, start_date = $2, end_date = $3 WHERE id = $4',
    [title, start_date, end_date, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Event modified with ID: ${id}`);
    }
  );
});

app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);

  client.query('DELETE FROM calendar WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Event deleted with ID: ${id}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});