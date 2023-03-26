// src/components/HorseList.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadToExcel from './ImportToExcel';
axios.defaults.baseURL = 'http://localhost:5001';

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
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  //Születési dátum szerinti szűrés

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
      const isInDateRange =
        (!dateRange.from ||
          new Date(horse.horse_birthdate) >= new Date(dateRange.from)) &&
        (!dateRange.to ||
          new Date(horse.horse_birthdate) <= new Date(dateRange.to));

      return (
        isInDateRange &&
        horse.horse_name.toLowerCase().includes(searchName.toLowerCase()) &&
        horse.chip_number.toString().includes(searchChip) &&
        horse.passport_number.toString().includes(searchPassport) &&
        (searchColor === '' || horse.color === searchColor) &&
        horse.bred.toLowerCase().includes(searchBreed.toLowerCase()) &&
        (searchGender === '' || horse.gender === searchGender) &&
        (searchWorkType === '' || horse.work_type === searchWorkType)
      );
    };

    const filtered = horses.filter(filterHorses);
    setFilteredHorses(filtered);
  }, [horses, searchName, searchChip, searchPassport, searchColor, searchBreed, searchGender, searchWorkType, dateRange]);

  function shouldHighlightHorse(horse) {
    const fourMonthsInMilliseconds = 4 * 30 * 24 * 60 * 60 * 1000;
    const tenMonthsInMilliseconds = 10 * 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const vaccinationDate = new Date(horse.vaccination_date);
    const timeSinceVaccination = currentDate.getTime() - vaccinationDate.getTime();

    if (horse.work_type === 'Verseny') {
      return timeSinceVaccination >= fourMonthsInMilliseconds;
    } else {
      return timeSinceVaccination >= tenMonthsInMilliseconds;
    }
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
      <h2>Összes ló darabszám: {filteredHorses.length}</h2>
      <div className='filters'>
        <input className='filter' type="text" value={searchName} onChange={e => setSearchName(e.target.value)} placeholder="Név szűrő" />
        <input className='filter' type="text" value={searchChip} onChange={e => setSearchChip(e.target.value)} placeholder="Chipszám szűrő" />
        <input className='filter' type="text" value={searchPassport} onChange={e => setSearchPassport(e.target.value)} placeholder="Útlevélszám szűrő" />

        <label htmlFor='from_date'>Születési dátumtól:</label>
        <input
          className='filter'
          type='date'
          id='from_date'
          value={dateRange.from}
          onChange={(e) =>
            setDateRange({ ...dateRange, from: e.target.value })
          }
        />
        <label htmlFor='to_date'>Születési dátumig:</label>
        <input
          className='filter'
          type='date'
          id='to_date'
          value={dateRange.to}
          onChange={(e) =>
            setDateRange({ ...dateRange, to: e.target.value })
          }
        />

        <select className='filter' value={searchColor} onChange={e => setSearchColor(e.target.value)}>
          <option value="">Összes szín</option>
          <option value="Pej">Pej</option>
          <option value="Sárga">Sárga</option>
          <option value="Fekete">Fekete</option>
          <option value="Szürke">Szürke</option>
          <option value="Nyári Fekete">Nyári Fekete</option>
        </select>

        <input type="text" className='filter' value={searchBreed} onChange={e=> setSearchBreed(e.target.value)} placeholder="Fajta szűrő"/>

        <select className='filter' value={searchGender} onChange={e => setSearchGender(e.target.value)}>
          <option value="">Összes nem</option>
          <option value="Mén">Mén</option>
          <option value="Kanca">Kanca</option>
          <option value="Herélt">Herélt</option>
        </select>

        <select className='filter' value={searchWorkType} onChange={e => setSearchWorkType(e.target.value)}>
          <option value="">Összes foglalkoztatás</option>
          <option value="Csikós hátas">Csikós hátas</option>
          <option value="Infó fogat">Infó fogat</option>
          <option value="Magyar Sport Tenyész kanca">Magyar Sport Tenyész kanca</option>
          <option value="Nóniusz Tenyész kanca">Nóniusz Tenyész kanca</option>
          <option value="Verseny">Verseny</option>
        </select>

        <select
          className='filter'
          value={sortCriteria}
          onChange={e => setSortCriteria(e.target.value)}
        >
          <option value="">Rendezési szempont</option>
          <option value="blood_test_date">Vérvétel dátuma</option>
          <option value="vaccination_date">Vakcina dátuma</option>
        </select>

        <select
          className="filter"
          value={sortDirection}
          onChange={e => setSortDirection(e.target.value)}
        >
          <option value="">Rendezési irány</option>
          <option value="asc">Növekvő</option>
          <option value="desc">Csökkenő</option>
        </select>

        <Link to={`/addhorse`}><button>Ló hozzáadása</button></Link>
        <DownloadToExcel horses={filteredHorses} />
      </div>
      <div className='container'>
        {filteredHorses.sort(sortHorses).map((horse) => (
          <div
            key={horse.id}
            className='horse'
            style={{
              backgroundColor: shouldHighlightHorse(horse) ? 'red' : 'transparent',
            }}
          >
            <p id='horseName'>Név: {horse.horse_name}</p>
            <p>Útlevélszáma: {horse.passport_number}</p>
            <p>Chipszáma: {horse.chip_number}</p>
            <p>Foglalkoztatás: {horse.work_type}</p>
            <p>Fajta: {horse.bred}</p>
            <p>Vérvétel dátuma: {formatDate(horse.blood_test_date)}</p>
            <p>Vakcina dátuma: {formatDate(horse.vaccination_date)}</p>
            <Link to={`/update/${horse.id}`}>
              <button>Módosítás</button>
            </Link>
            <Link to={`/showdetails/${horse.id}`}>
              <button>Ló részletei</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorseList;
