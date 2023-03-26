import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5001';

function ShowDetails() {
    const { id } = useParams();
    const [horse, setHorse] = useState(null);
    const [note, setNote] = useState('');
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        const fetchHorse = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/horses/${id}`);
                setHorse(response.data);
            } catch (err) {
                console.error("Hiba a ló lekérése közben:", err);
            }
        };

        fetchHorse();
    }, [id, updateCount]);

    async function deleteNote() {
        try {
            await axios.delete(`/horses/${id}/notes`);
            setUpdateCount(updateCount + 1);
        } catch (error) {
            console.error('Hiba a megjegyzés törlése közben:', error);
        }
    }

    const updateNote = async () => {
        try {
            await axios.put(`http://localhost:5001/horses/${id}/notes`, { note });
            setNote('');
            setUpdateCount(updateCount + 1);
        } catch (err) {
            console.error("Hiba a megjegyzés frissítése közben:", err);
        }
    };

    const formatDate = (dateValue) => {
        return !isNaN(Date.parse(dateValue))
          ? new Date(dateValue).toLocaleDateString()
          : '';
      };

    if (!horse) {
        return <div>Betöltés...</div>;
    };

    return (
        <div className="horseDetails">
            <h2>{horse.horse_name} részletei</h2>
            <p>Szín: {horse.color}</p>
            <p>Apja: {horse.horse_father}</p>
            <p>Anyja: {horse.horse_mother}</p>
            <p>Neme: {horse.gender}</p>
            <p id='horseName'>Név: {horse.horse_name}</p>
            <p>Útlevélszáma: {horse.passport_number}</p>
            <p>Chipszáma: {horse.chip_number}</p>
            <p>Foglalkoztatás: {horse.work_type}</p>
            <p>Fajta: {horse.bred}</p>
            <p>Vérvétel dátuma: {formatDate(horse.blood_test_date)}</p>
            <p>Vakcina dátuma: {formatDate(horse.vaccination_date)}</p>
            <p>Lóhoz tartozó megjegyzések: {horse.note}</p>
            <button onClick={deleteNote}>Megjegyzés törlése</button>

            <div>
                <label htmlFor="note">Megjegyzés:</label>
                <textarea
                    id="note"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows="4"
                    cols="50"
                />
            </div>
            <button onClick={updateNote}>Megjegyzés hozzáadása</button>
        </div>
    );
}

export default ShowDetails;
