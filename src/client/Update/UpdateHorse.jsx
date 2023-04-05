import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

const UpdateHorse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [horse, setHorse] = useState({});
    const [workType, setWorkType] = useState('');
    const [vaccinationDate, setVaccinationDate] = useState('');
    const [bloodTestDate, setBloodTestDate] = useState('');

    useEffect(() => {
        const fetchHorse = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/horses/${id}`);
                setHorse(response.data);
                setWorkType(response.data.work_type);
                setVaccinationDate(response.data.vaccination_date);
                setBloodTestDate(response.data.blood_test_date);
            } catch (err) {
                console.error('Hiba a ló lekérése közben:', err);
            }
        };

        fetchHorse();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedHorse = {
            ...horse,
            work_type: workType,
            vaccination_date: vaccinationDate,
            blood_test_date: bloodTestDate,
        };

        try {
            await axios.put(`http://localhost:5001/horses/${id}`, updatedHorse);
            navigate('/horses');
        } catch (err) {
            console.error('Hiba a ló frissítése közben:', err);
        }
    };

    const formatDate = (dateValue) => {
        return !isNaN(Date.parse(dateValue))
            ? new Date(dateValue).toLocaleDateString()
            : '';
    };

    return (
        <div className='horse'>
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="work_type">Foglalkoztatás:</label>
                <select
                    id="work_type"
                    name="work_type"
                    value={horse.work_type}
                    onChange={e => setWorkType(e.target.value)}
                >
                    <option value="">--Válassz foglalkoztatást--</option>
                    {workTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <label htmlFor="blood_test_date">Vérvétel dátuma:</label>
                <input
                    type="date"
                    id="blood_test_date"
                    value={bloodTestDate.split('T')[0]}
                    onChange={(e) => setBloodTestDate(e.target.value)}
                />

                <label htmlFor="vaccination_date">Vakcina dátuma:</label>
                <input
                    type="date"
                    id="vaccination_date"
                    value={vaccinationDate.split('T')[0]}
                    onChange={(e) => setVaccinationDate(e.target.value)}
                />

                <button type="submit">Frissítés</button>
            </form>
        </div>
    );
};

export default UpdateHorse;