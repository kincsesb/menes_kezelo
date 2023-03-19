const { Client } = require('pg');
const faker = require('faker'); // Telepítsd a faker csomagot a 'npm install faker' paranccsal

const config = {
    user: 'kincsesbence',
    host: 'localhost',
    password: 'Kamilla21.',
    port: 5432,
    database: 'matai_menes_menes_kezelo',
};

const client = new Client(config);

const insertHorse = (horse) => {
    return new Promise((resolve, reject) => {
        const query = `
        INSERT INTO public.horses (
            horse_name, horse_birthdate, horse_father, horse_mother, 
            bred, color, work_type, passport_number, chip_number, 
            blood_test_date, vaccination_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        const values = [
            horse.horse_name,
            horse.horse_birthdate,
            horse.horse_father,
            horse.horse_mother,
            horse.bred,
            horse.color,
            horse.work_type,
            horse.passport_number,
            horse.chip_number,
            horse.blood_test_date,
            horse.vaccination_date,
        ];

        client.query(query, values, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const createFakeHorse = () => {
    return {
        horse_name: faker.name.firstName(),
        horse_birthdate: faker.date.past(10),
        horse_father: faker.name.firstName(),
        horse_mother: faker.name.firstName(),
        bred: faker.random.arrayElement(['Nóniusz', 'Magyar Sport']),
        color: faker.random.arrayElement(['Pej', 'Sárga','Nyári Fekete','Szürke','Fekete']),
        work_type: faker.random.arrayElement(['Verseny', 'Csikós Hátas', 'Info Fogat', 'Tenyész kanca','Választási Nóniusz csikíó']),
        passport_number: faker.random.number({ min: 100000, max: 999999 }),
        chip_number: faker.random.number({ min: 100000, max: 999999 }),
        blood_test_date: faker.date.past(2),
        vaccination_date: faker.date.past(1),
    };
};

client.connect(async (err) => {
    if (err) {
        console.error('Kapcsolódási hiba:', err.stack);
    } else {
        console.log('Sikeresen kapcsolódva a adatbázishoz.');

        for (let i = 0; i < 20; i++) {
            const fakeHorse = createFakeHorse();
            try {
                await insertHorse(fakeHorse);
                console.log(`#${i + 1} ló hozzáadva: ${fakeHorse.horse_name}`);
            } catch (err) {
                console.error(`Hiba történt a(z) ${fakeHorse.horse_name} ló hozzáadása közben:`, err);
            }
        }

        client.end();
    }
});
