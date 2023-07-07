// src/components/HorseList.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadToExcel from './ImportToExcel';
axios.defaults.baseURL = 'http://localhost';

const workTypeOptions = [
  { value: 'Szopós csikó Nóniusz', label: 'Szopós csikó Nóniusz' },
  { value: 'Növendék csikó Nóniusz 1 éves', label: 'Növendék csikó Nóniusz 1 éves' },
  { value: 'Növendék csikó Nóniusz 2 éves', label: 'Növendék csikó Nóniusz 2 éves' },
  { value: 'Növendék csikó Nóniusz 3 éves vagy a feletti', label: 'Növendék csikó Nóniusz 3 éves vagy a feletti' },
  { value: 'Tenyész kanca Nóniusz', label: 'Tenyész kanca Nóniusz' },
  { value: 'Tenyész mén Nóniusz', label: 'Tenyész mén Nóniusz' },
  { value: 'STV  haszn.kiképzés Nóniusz', label: 'STV  haszn.kiképzés Nóniusz' },
  { value: 'Használati ló Pusztaötös', label: 'Használati ló Pusztaötös' },
  { value: 'Használati ló id. forg. -hátas', label: 'Használati ló id. forg. -hátas' },
  { value: 'Használati ló csikós hátas', label: 'Használati ló csikós hátas' },
  { value: 'Szerződéses boxos bértartás', label: 'Szerződéses boxos bértartás' },
  { value: 'Szerződéses ménesi bértartás', label: 'Szerződéses ménesi bértartás' },
  { value: 'Ügyvezetői lótartás', label: 'Ügyvezetői lótartás' },
  { value: 'Dolgozói lóbértartás', label: 'Dolgozói lóbértartás' },
  { value: 'Idegen helyen lévő', label: 'Idegen helyen lévő' },
  { value: 'Állami bérmén/egyéb idegen tul.állat', label: 'Állami bérmén/egyéb idegen tul.állat' },
  { value: 'Magyar sportló T.kanca', label: 'Magyar sportló T.kanca' },
  { value: 'Magyar sport csikó', label: 'Magyar sport csikó' },
  { value: 'Magyar sport növendék ló MSP SKP is benne van', label: "Magyar sport növendék ló MSP SKP is benne van" },
];

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

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const response = await axios.get('/horses');
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
    const fiveMonthsInMilliseconds = 5 * 30 * 24 * 60 * 60 * 1000;
    const tenMonthsInMilliseconds = 10 * 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const vaccinationDate = new Date(horse.vaccination_date);
    const bloodTestDate = new Date(horse.blood_test_date);
    const timeSinceVaccination = currentDate.getTime() - vaccinationDate.getTime();
    const timeSinceBloodTest = currentDate.getTime() - bloodTestDate.getTime();
    //Not actual
    if (horse.work_type === 'Magyar sport növendék ló MSP SKP is benne van') {
      return timeSinceVaccination >= fiveMonthsInMilliseconds;
    } else {
      return timeSinceVaccination >= tenMonthsInMilliseconds || timeSinceBloodTest >= tenMonthsInMilliseconds;
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
      <div class="line-1"></div>
      <div className='centered'>
        <h1>Lovak listája</h1>
        <h2>Összes ló darabszám:</h2>
        <h2 id="number_of_horse">{filteredHorses.length}</h2>
      </div>
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

        <input type="text" className='filter' value={searchBreed} onChange={e => setSearchBreed(e.target.value)} placeholder="Fajta szűrő" />

        <select className='filter' value={searchGender} onChange={e => setSearchGender(e.target.value)}>
          <option value="">Összes nem</option>
          <option value="Mén">Mén</option>
          <option value="Kanca">Kanca</option>
          <option value="Herélt">Herélt</option>
        </select>

        <select className='filter' value={searchWorkType} onChange={e => setSearchWorkType(e.target.value)}>
          <option value="">Összes foglalkoztatás</option>
          {workTypeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
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

      </div>
      <div className='centered'>
        <Link to={`/addhorse`}><button className="margin-right">Ló hozzáadása</button></Link>
        <DownloadToExcel horses={filteredHorses} />
      </div>
      <div class="line-1"></div>
      <div className='container'>
        {filteredHorses.sort(sortHorses).map((horse) => (
          <div
            key={horse.id}
            className='horse'
            style={{
              backgroundColor: shouldHighlightHorse(horse) ? 'red' : 'white',
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
