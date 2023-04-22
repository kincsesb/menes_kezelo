const { Client } = require('pg');

const config = {
    user: 'kincsesbence',
    host: 'localhost',
    password: 'Kamilla21.',
    port: 5432,
    database: 'matai_menes_menes_kezelo',
};

const client = new Client(config);

client.connect((err) => {
    if (err) {
        console.error('Kapcsolódási hiba:', err.stack);
    } else {
        console.log('Sikeresen kapcsolódva a adatbázishoz.');

        client.query(`
        CREATE TABLE IF NOT EXISTS public.horses (
        id SERIAL PRIMARY KEY NOT NULL,
        horse_name VARCHAR NOT NULL,
        horse_birthdate DATE NOT NULL,
        horse_father VARCHAR NOT NULL,
        horse_mother VARCHAR NOT NULL,
        gender VARCHAR NOT NULL,
        bred VARCHAR NOT NULL,
        color VARCHAR NOT NULL,
        work_type VARCHAR NOT NULL,
        passport_number VARCHAR NOT NULL,
        chip_number VARCHAR NOT NULL,
        blood_test_date DATE NOT NULL,
        vaccination_date DATE NOT NULL,
        has_children VARCHAR,
        is_government_subsidized VARCHAR,
        status VARCHAR NOT NULL,
        note TEXT
        );
    `, (err, res) => {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log('A horses tábla létrehozva!');

            client.end();
        });
    }
});
