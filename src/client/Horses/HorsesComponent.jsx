// src/components/HorseList.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HorseList = () => {
  const [horses, setHorses] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filteredHorses, setFilteredHorses] = useState([]);
  const [searchChip, setSearchChip] = useState('');
  const [searchPassport, setSearchPassport] = useState('');
  const [searchColor, setSearchColor] = useState('');
  const [searchBreed, setSearchBreed] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [searchWorkType, setSearchWorkType] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/horses');
        setHorses(response.data);
      } catch (err) {
        console.error('Hiba a lovak lekérése közben:', err);
      }
    };

    fetchHorses();
  }, []);

  useEffect(() => {
    const filterHorses = (horse) => {
      return (
        horse.horse_name.toLowerCase().includes(searchName.toLowerCase()) &&
        horse.chip_number.toString().includes(searchChip) &&
        horse.passport_number.toString().includes(searchPassport) &&
        (searchColor === '' || horse.color === searchColor) &&
        (searchBreed === '' || horse.bred === searchBreed) &&
        (searchGender === '' || horse.gender === searchGender) &&
        (searchWorkType === '' || horse.work_type === searchWorkType)
      );
    };

    const filtered = horses.filter(filterHorses);
    setFilteredHorses(filtered);
  }, [horses, searchName, searchChip, searchPassport, searchColor, searchBreed, searchGender, searchWorkType]);

  function shouldHighlightHorse(horse) {
    const sixMonthsInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;
    const twoMonthsInMilliseconds = 2 * 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const vaccinationDate = new Date(horse.vaccination_date);
    const timeSinceVaccination = currentDate.getTime() - vaccinationDate.getTime();
    const timeToVaccinationExpiry = vaccinationDate.getTime() + sixMonthsInMilliseconds - currentDate.getTime();



    return (
      horse.work_type === 'Verseny' &&
      ((timeSinceVaccination >= sixMonthsInMilliseconds) ||
      (timeToVaccinationExpiry >= 0 && timeToVaccinationExpiry < twoMonthsInMilliseconds))
    );
  }

  function sortHorses(a, b) {
    if (sortCriteria === '') {
      return 0;
    }

    const compare = (sortDirection === 'asc') ? 1 : -1;
    const aDate = a[sortCriteria];
    const bDate = b[sortCriteria];

    if (aDate < bDate) {
      return -1 * compare;
    } else if (aDate > bDate) {
      return 1 * compare;
    } else {
      return 0;
    }
  }

  const formatDate = (dateValue) => {
    return !isNaN(Date.parse(dateValue))
        ? new Date(dateValue).toLocaleDateString()
        : '';
};

  return (
    <div>
      <h1>Lovak listája</h1>
      <h2>Összes ló darabszám: {horses.length}</h2>
      <input type="text" value={searchName} onChange={e => setSearchName(e.target.value)} placeholder="Név szűrő" />
      <input type="text" value={searchChip} onChange={e => setSearchChip(e.target.value)} placeholder="Chipszám szűrő" />
      <input type="text" value={searchPassport} onChange={e => setSearchPassport(e.target.value)} placeholder="Útlevélszám szűrő" />

      <select value={searchColor} onChange={e => setSearchColor(e.target.value)}>
        <option value="">Összes szín</option>
        <option value="Pej">Pej</option>
        <option value="Sárga">Sárga</option>
        <option value="Fekete">Fekete</option>
        <option value="Szürke">Szürke</option>
        <option value="Nyári Fekete">Nyári Fekete</option>
      </select>

      <select value={searchBreed} onChange={e => setSearchBreed(e.target.value)}>
        <option value="">Összes fajta</option>
        <option value="Magyar Sport ló">Magyar Sport ló</option>
        <option value="Nóniusz">Nóniusz</option>
      </select>

      <select value={searchGender} onChange={e => setSearchGender(e.target.value)}>
        <option value="">Összes nem</option>
        <option value="Mén">Mén</option>
        <option value="Kanca">Kanca</option>
      </select>

      <select value={searchWorkType} onChange={e => setSearchWorkType(e.target.value)}>
        <option value="">Összes foglalkoztatás</option>
        <option value="Csikós hátas">Csikós hátas</option>
        <option value="Infó fogat">Infó fogat</option>
        <option value="Magyar Sport Tenyész kanca">Magyar Sport Tenyész kanca</option>
        <option value="Nóniusz Tenyész kanca">Nóniusz Tenyész kanca</option>
        <option value="Verseny">Verseny</option>
      </select>

      <select
        value={sortCriteria}
        onChange={e => setSortCriteria(e.target.value)}
      >
        <option value="">Rendezési szempont</option>
        <option value="blood_test_date">Vérvétel dátuma</option>
        <option value="vaccination_date">Vakcina dátuma</option>
      </select>

      <select
        value={sortDirection}
        onChange={e => setSortDirection(e.target.value)}
      >
        <option value="">Rendezési irány</option>
        <option value="asc">Növekvő</option>
        <option value="desc">Csökkenő</option>
      </select>

      <div className='container'>
        {filteredHorses.sort(sortHorses).map((horse) => (
          <div
            key={horse.id}
            className='horse'
            style={{
              backgroundColor: shouldHighlightHorse(horse) ? 'red' : 'transparent',
            }}
          >
            <p>Név: {horse.horse_name}</p>
            <p>Születési Dátum: {formatDate(horse.horse_birthdate)}</p>
            <p>Apja: {horse.horse_father}</p>
            <p>Anyja: {horse.horse_mother}</p>
            <p>Neme: {horse.gender}</p>
            <p>Fajta: {horse.bred}</p>
            <p>Szín: {horse.color}</p>
            <p>Foglalkoztatás: {horse.work_type}</p>
            <p>Útlevélszáma: {horse.passport_number}</p>
            <p>Chipszáma: {horse.chip_number}</p>
            <p>Vérvétel dátuma: {formatDate(horse.blood_test_date)}</p>
            <p>Vakcina dátuma: {formatDate(horse.vaccination_date)}</p>
            <Link to={`/update/${horse.id}`}><button>Módosítás</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorseList;
