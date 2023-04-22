import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5001';

function ShowDetails() {
    const { id } = useParams();
    const [horse, setHorse] = useState(null);
    const [note, setNote] = useState('');
    const [updateCount, setUpdateCount] = useState(0);
    const [horses,setHorses] = useState([])


    useEffect(() => {
        const fetchHorse = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/horses/${id}`);
                const horsesresponse = await axios.get(`http://localhost:5001/horses`);
                setHorses(horsesresponse)
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
        <div>
            <div className="horseDetails">
                <div className="leftColumn">
                    <img src={`../images/profile_images/${horse.horse_name}_profile_pics.jpg`} alt="" className="profile_pics" />
                    <h1>{horse.horse_name} részletei</h1>
                    <div className="informations">
                        <div>
                            <p>Szín: {horse.color}</p>
                            <p>Apja: {horse.horse_father}</p>
                            <p>Anyja: {horse.horse_mother}</p>
                            <p>Neme: {horse.gender}</p>
                        </div>
                        <div>
                            <p>Útlevélszáma: {horse.passport_number}</p>
                            <p>Chipszáma: {horse.chip_number}</p>
                        </div>
                        <div>
                            <p>Foglalkoztatás: {horse.work_type}</p>
                            <p>Fajta: {horse.bred}</p>
                            <p>Állami támogatású: {horse.is_government_subsidized}</p>
                            <p>Státusza: {horse.status}</p>
                            {horse.gender === "Kanca" && (
                                <p>Van csikója: {horse.has_children}</p>
                            )}
                        </div>
                        <div>
                            <p>Vérvétel dátuma: {formatDate(horse.blood_test_date)}</p>
                            <p>Vakcina dátuma: {formatDate(horse.vaccination_date)}</p>
                        </div>

                        <p>Lóhoz tartozó megjegyzések: {horse.note}</p>

                    </div>
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
                    <button onClick={deleteNote}>Megjegyzés törlése</button>
                    <button onClick={updateNote}>Megjegyzés hozzáadása</button>
                </div>
                <div className="rightColumn">
                    <img src={`../images/other_images/${horse.horse_name}_01.jpg`} alt="" className="horse_passport_pics" />
                    <img src={`../images/other_images/${horse.horse_name}_02.jpg`} alt="" className="horse_passport_pics" />
                </div>
            </div>
            <Link to={horse.id - 1 < 1 ? `/showdetails/${horse.id}` : `/showdetails/${horse.id - 1}`}>
                <button>Előző</button>
            </Link>
            <Link to={horse.id + 1 > horses.data.length ? `/showdetails/${horse.id}` : `/showdetails/${horse.id + 1}`}>
                <button>Következő</button>
            </Link>
        </div >
    );
}

export default ShowDetails;
