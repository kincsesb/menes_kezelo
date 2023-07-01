const createTable = async (client) => {
    try {
        const createTableQuery = `
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
        `;

        await client.query(createTableQuery);
        console.log('Horses table created successfully.');
    } catch (err) {
        console.error('Hiba történt a tábla létrehozásakor:', err);
    }
}

module.exports = createTable;
