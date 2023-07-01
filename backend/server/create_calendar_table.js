const createTable = async (client) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Calendar (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL
        );
    `;

    await client.query(createTableQuery);
    console.log('Calendar table created successfully.');
}

module.exports = createTable;
