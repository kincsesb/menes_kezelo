const { Client } = require('pg');
require('dotenv').config();

const config = {
    user: 'kincsesbence',
    host: 'db',
    password: 'Kamilla21.',
    port: 5432,
    database: 'matai_menes_menes_kezelo',
};

const menNames = [
    "Atlasz",
    "Bajnok",
    "Báró",
    "Bársony",
    "Bikadér",
    "Bársonyos",
    "Cigány",
    "Cigány",
    "Csajág",
    "Csákó",
    "Cassiano",
    "Calato",
    "Nótás",
    "Daliás",
    "Carpaccio",
    "Sandro"
];

const kancaNames = [
    "Für Elise",
    "Kamilla",
    "Pinka",
    "Norma",
    "Eperjes",
    "Keringő",
    "Enyelgő",
    "Szahara",
    "Con Cassina",
    "Fernando Balerina",
    "Fácán",
    "Jojoba",
    "Daru",
    "Friderika",
    "Evita"
];

const horseNames = [
    "Gazdag",
    "Eperjes",
    "Norma",
    "Enyelgő",
    "Paso Doble",
    "Jojoba",
    "Für Elise",
    "Kamilla",
    "Báró",
    "Várda",
    "Vezuv",
    "Csatlós",
    "Piedone",
    "Pandora",
    "Pinka",
    "Gazdag",
    "Nótás",
    "Kozák",
    "Lurkó",
    "Vezér",
    "Daliás",
    "Keringő",
    "Nótás",
    "Una Bella",
    "Esthajnal",
    "Evita",
    "Friderika"
];

const workTypeOptions = [
    'Szopós csikó Nóniusz',
    'Növendék csikó Nóniusz 1 éves',
    'Növendék csikó Nóniusz 2 éves',
    'Növendék csikó Nóniusz 3 éves vagy a feletti',
    'Tenyész kanca Nóniusz',
    'Tenyész mén Nóniusz',
    'STV  haszn.kiképzés Nóniusz',
    'Használati ló Pusztaötös',
    'Használati ló id. forg. -hátas',
    'Használati ló csikós hátas',
    'Szerződéses boxos bértartás',
    'Szerződéses ménesi bértartás',
    'Ügyvezetői lótartás',
    'Dolgozói lóbértartás',
    'Idegen helyen lévő',
    'Állami bérmén/egyéb idegen tul.állat',
    'Magyar sportló T.kanca',
    'Magyar sport csikó',
    'Magyar sport növendék ló MSP SKP is benne van',
];

const statusOptions = ['Telephelyen', 'Eladva', 'Elhullott'];

const genders = ['Kanca', 'Mén', 'Herélt'];

const colors = ['Fekete', 'Nyári fekete', 'Pej', 'Sárga', 'Szürke'];

const breeds = ['Magyar Sport ló', 'Nóniusz'];

const uniqueHorseNames = Array.from(new Set([...horseNames, ...menNames, ...kancaNames]));


function getRandomElementWithoutRemove(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getRandomGender() {
    return Math.random() < 0.5 ? 'Kanca' : 'Herélt';
}

function generateRandomHorse() {
    const workType = getRandomElementWithoutRemove(workTypeOptions);
    const bred = workType.toLowerCase().includes('nóniusz') 
    || workType.toLowerCase().includes('csikós') 
    || workType.toLowerCase().includes('fogat')
    || workType.toLowerCase().includes('pusztaötös') ? 'Nóniusz' : 'Magyar Sport ló';

    const gender = workType.toLowerCase().includes('kanca') ? 'Kanca' : 
               workType.toLowerCase().includes('mén') ? 'Mén' : getRandomGender();

    const horse = {
        horse_name: `${getRandomElementWithoutRemove(uniqueHorseNames)} - ${Math.floor(Math.random() * 20)}`,
        horse_birthdate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 10)),
        horse_father: `${getRandomElementWithoutRemove(menNames)} - ${Math.floor(Math.random() * 20)}`,
        horse_mother: `${getRandomElementWithoutRemove(kancaNames)} - ${Math.floor(Math.random() * 20)}`,
        gender: gender,
        bred: bred,
        color: getRandomElementWithoutRemove(colors),
        work_type: workType,
        passport_number: `${bred === 'Magyar Sport ló' ? 'HUHSH' : 'HUN'}${Math.floor(Math.random() * 1000000000)}`,
        chip_number: Math.floor(Math.random() * 1000000000),
        blood_test_date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)),
        vaccination_date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)),
        has_children: "Nem",
        is_government_subsidized: "Nem",
        status: "Telephelyen",
        note: "",
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
      vaccination_date,
      has_children,
      is_government_subsidized,
      status,
      note
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
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
        horse.has_children,
        horse.is_government_subsidized,
        horse.status,
        horse.note,
    ];

    try {
        await client.query(query, values);
        console.log(`A ló, ${horse.horse_name}, sikeresen hozzáadva a horses táblához.`);
    } catch (err) {
        console.error('Hiba a ló hozzáadása közben:', err);
    }
}

async function createHorses() {
    const client = new Client(config);
    client.connect();

    await client.query("DELETE FROM public.horses");

    for (let i = 0; i < 251; i++) {
        const horse = generateRandomHorse();
        await insertHorse(horse);
    }

    client.end();
}

module.exports = createHorses;