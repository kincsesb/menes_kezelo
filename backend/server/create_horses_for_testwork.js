const { Client } = require('pg');

const config = {
    user: 'kincsesbence',
    host: 'db',
    password: 'Kamilla21.',
    port: 5432,
    database: 'matai_menes_menes_kezelo',
};

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const menNames = [
    "Atlasz-8",
    "Bajnok-11",
    "Báró-39",
    "Bársony-4",
    "Bikadér-3",
    "Bársonyos-3",
    "Cigány-3",
    "Cigány-40",
    "Csajág-9",
    "Csákó-34",
];

const kancaNames = [
    "Fáni-15",
    "Fagyöngy-8",
    "Fehér-28",
    "Fecske-15",
    "Fény-7",
    "Fodor-5",
    "Fogoly-5",
    "Foltos-3",
    "Foltos-22",
    "Füge-3",
];

const horseNames = [
    "Gazdag-4",
    "Eperjes-9",
    "Norma-13",
    "Enyelgő-14",
    "Paso Doble-18",
    "Jojoba-22",
    "Für Elise-25",
    "Kamilla-28",
    "Báró-34",
    "Várda-38",
    "Vezuv-43",
    "Csatlós-47",
    "Piedone-51",
    "Pandora-56",
    "Pinka-59",
    "Gazdag-63",
    "Nótás-67",
    "Kozák-72",
    "Lurkó-75",
    "Vezlr-79",
];

const workTypes = [
    "Csikós hátas",
    "Infó fogat",
    "Magyar Sport Tenyész kanca",
    "Nóniusz Tenyész kanca",
    "Verseny"
];

const genders = [
    "Mén",
    "Kanca"
];

const breeds = [
    "Magyar Sport ló",
    "Nóniusz"
];

const colors = [
    "Pej",
    "Sárga",
    "Fekete",
    "Nyári Fekete",
    "Szürke"
];

function generateRandomHorse() {
    const horse = {
        horse_name: getRandomElement(horseNames),
        horse_birthdate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)),
        horse_father: getRandomElement(menNames),
        horse_mother: getRandomElement(kancaNames),
        gender: getRandomElement(genders),
        bred: getRandomElement(breeds),
        color: getRandomElement(colors),
        work_type: getRandomElement(workTypes),
        passport_number: Math.floor(Math.random() * 1000000),
        chip_number: Math.floor(Math.random() * 1000000),
        blood_test_date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)),
        vaccination_date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)),
    };

    return horse;
}

const client = new Client(config);
client.connect();

async function insertHorse(horse) {
    const query = `
    INSERT INTO public.horses (
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
      vaccination_date
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
  `;

    const values = [
        horse.horse_name,
        horse.horse_birthdate,
        horse.horse_father,
        horse.horse_mother,
        horse.gender,
        horse.bred,
        horse.color,
        horse.work_type,
        horse.passport_number,
        horse.chip_number,
        horse.blood_test_date,
        horse.vaccination_date,
    ];

    try {
        await client.query(query, values);
        console.log(`A ló, ${horse.horse_name}, sikeresen hozzáadva a horses táblához.`);
    } catch (err) {
        console.error('Hiba a ló hozzáadása közben:', err);
    }
}

(async () => {
    for (let i = 0; i < 20; i++) {
        const horse = generateRandomHorse();
        await insertHorse(horse);
    }

    client.end();
})();
