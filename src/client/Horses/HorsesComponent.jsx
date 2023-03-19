// src/components/HorseList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HorseList = () => {
  const [horses, setHorses] = useState([]);

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

  function shouldHighlightHorse(horse) {
    const sixMonthsInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const vaccinationDate = new Date(horse.vaccination_date);
    const timeDifference = currentDate - vaccinationDate;

    return horse.work_type === 'Verseny' && timeDifference >= 0 && timeDifference < sixMonthsInMilliseconds;
  }


  return (
    <div>
      <h1>Lovak listája</h1>
      <div className='container'>
        {horses.map((horse) => (
          <div
            key={horse.id}
            className='horse'
            style={{
              backgroundColor: shouldHighlightHorse(horse) ? 'red' : 'transparent',
            }}
          >
            <p>Név: {horse.horse_name}</p>
            <p>Születési Dátum: {new Date(horse.horse_birthdate).toISOString().split('T')[0]}</p>
            <p>Apja: {horse.horse_father}</p>
            <p>Anyja: {horse.horse_mother}</p>
            <p>Neme: {horse.gender}</p>
            <p>Fajta: {horse.bred}</p>
            <p>Szín: {horse.color}</p>
            <p>Foglalkoztatás: {horse.work_type}</p>
            <p>Útlevélszáma: {horse.passport_number}</p>
            <p>Chipszáma: {horse.chip_number}</p>
            <p>Vérvétel dátuma: {new Date(horse.blood_test_date).toISOString().split('T')[0]}</p>
            <p>Vakcina dátuma: {new Date(horse.vaccination_date).toISOString().split('T')[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorseList;
