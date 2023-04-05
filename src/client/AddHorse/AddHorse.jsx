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

    const breedOptions = [
        { value: 'Magyar Sport ló', label: 'Magyar Sport ló' },
        { value: 'Nóniusz', label: 'Nóniusz' },
    ];
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
    const handleBreedChange = (e) => {
        setHorse({ ...horse, bred: e.target.value });
    };

    const handleBreedSelect = (e) => {
        setHorse({ ...horse, bred: e.target.value });
    };

    const handleWorkType = (e) => {
        setHorse({ ...horse, work_type: e.target.value });
    };

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
                <select
                    id="bred"
                    name="bred"
                    value={horse.bred}
                    onChange={handleBreedSelect}
                >
                    <option value="">--Válassz fajtát--</option>
                    {breedOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    id="bred_custom"
                    name="bred_custom"
                    placeholder="Új fajta hozzáadása"
                    onChange={handleBreedChange}
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
                <select
                    id="work_type"
                    name="work_type"
                    value={horse.work_type}
                    onChange={handleWorkType}
                >
                    <option value="">--Válassz foglalkoztatást--</option>
                    {workTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* <input
                    type="text"
                    id="work_type"
                    name="work_type"
                    value={horse.work_type}
                    onChange={handleChange}
                /> */}
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
