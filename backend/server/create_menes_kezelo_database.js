const { Client } = require('pg');
const pgtools = require('pgtools');

const config = {
    user: 'kincsesbence',
    host: 'db',
    password: 'Kamilla21.',
    port: 5432,
};

const dbName = 'matai_menes_menes_kezelo';

pgtools.createdb(config, dbName, function (err, res) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(`Adatbázis sikeresen létrehozva: ${dbName}`);
});
