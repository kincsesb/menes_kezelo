// AddHorse.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddHorse = () => {
    const navigate = useNavigate();
    const [horse, setHorse] = useState({
        horse_name: '',
        horse_birthdate: '',
        horse_father: '',
        horse_mother: '',
        gender: '',
        bred: '',
        color: '',
        work_type: '',
        passport_number: '',
        chip_number: '',
        blood_test_date: '',
        vaccination_date: '',
    });

    const handleChange = (e) => {
        setHorse({ ...horse, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/horses', horse);
            navigate('/horses');
        } catch (err) {
            console.error('Hiba a ló hozzáadása közben:', err);
        }
    };

    return (
        <div className='addHorseClass'>
            <h2>Új ló hozzáadása</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="horse_name">Név:</label>
                <input
                    type="text"
                    id="horse_name"
                    name="horse_name"
                    value={horse.horse_name}
                    onChange={handleChange}
                />
                <label htmlFor="horse_birthdate">Születési dátum:</label>
                <input
                    type="date"
                    id="horse_birthdate"
                    name="horse_birthdate"
                    value={horse.horse_horse_birthdate}
                    onChange={handleChange}
                />
                <label htmlFor="horse_father">Apja neve:</label>
                <input
                    type="text"
                    id="horse_father"
                    name="horse_father"
                    value={horse.horse_father}
                    onChange={handleChange}
                />
                <label htmlFor="horse_mother">Anyja neve:</label>
                <input
                    type="text"
                    id="horse_mother"
                    name="horse_mother"
                    value={horse.horse_mother}
                    onChange={handleChange}
                />
                <label htmlFor="gender">Neme:</label>
                <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={horse.gender}
                    onChange={handleChange}
                />
                <label htmlFor="bred">Fajta:</label>
                <input
                    type="text"
                    id="bred"
                    name="bred"
                    value={horse.bred}
                    onChange={handleChange}
                />
                <label htmlFor="color">Szín:</label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    value={horse.color}
                    onChange={handleChange}
                />
                <label htmlFor="work_type">Foglalkoztatás:</label>
                <input
                    type="text"
                    id="work_type"
                    name="work_type"
                    value={horse.work_type}
                    onChange={handleChange}
                />
                <label htmlFor="passport_number">Útlevélszám:</label>
                <input
                    type="number"
                    id="passport_number"
                    name="passport_number"
                    value={horse.passport_number}
                    onChange={handleChange}
                />
                <label htmlFor="chip_number">Chip szám:</label>
                <input
                    type="number"
                    id="chip_number"
                    name="chip_number"
                    value={horse.chip_number}
                    onChange={handleChange}
                />
                <label htmlFor="blood_test_date">Vérvétel dátuma:</label>
                <input
                    type="date"
                    id="blood_test_date"
                    name="blood_test_date"
                    value={horse.blood_test_date}
                    onChange={handleChange}
                />
                <label htmlFor="vaccination_date">Vakcina dátuma:</label>
                <input
                    type="date"
                    id="vaccination_date"
                    name="vaccination_date"
                    value={horse.vaccination_date}
                    onChange={handleChange}
                />
                <button type="submit">Hozzáadás</button>
            </form>
        </div>
    );
};

export default AddHorse;
