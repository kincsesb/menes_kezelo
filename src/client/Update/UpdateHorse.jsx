import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                >
                    <option value="">Válasszon foglalkoztatást</option>
                    <option value="Verseny">Verseny</option>
                    <option value="Csikós hátas">Csikós hátas</option>
                    <option value="Infó fogat">Infó fogat</option>
                    <option value="Nóniusz Tenyész kanca">Nóniusz Tenyész kanca</option>
                    <option value="Magyar Sport Tenyész kanca">Magyar Sport Tenyész kanca</option>
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