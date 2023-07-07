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
    const [horseName, setHorseName] = useState('');
    const [horseBirthdate, setHorseBirthdate] = useState('');
    const [horseFather, setHorseFather] = useState('');
    const [horseMother, setHorseMother] = useState('');
    const [gender, setGender] = useState('');
    const [bred, setBred] = useState('');
    const [color, setColor] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [chipNumber, setChipNumber] = useState('');
    const [workType, setWorkType] = useState('');
    const [vaccinationDate, setVaccinationDate] = useState('');
    const [bloodTestDate, setBloodTestDate] = useState('');
    const [status, setStatus] = useState('');
    const [isGovernmentSubsidized, setIsGovernmentSubsidized] = useState('');
    const [hasChildren, setHasChildren] = useState('');

    useEffect(() => {
        const fetchHorse = async () => {
            try {
                const response = await axios.get(`/horses/${id}`);
                const horseData = response.data;
                setHorse(horseData);
                setHorseName(horseData.horse_name);
                setHorseBirthdate(horseData.horse_birthdate);
                setHorseFather(horseData.horse_father);
                setHorseMother(horseData.horse_mother);
                setGender(horseData.gender);
                setBred(horseData.bred);
                setColor(horseData.color);
                setPassportNumber(horseData.passport_number);
                setChipNumber(horseData.chip_number);
                setWorkType(horseData.work_type);
                setVaccinationDate(horseData.vaccination_date);
                setBloodTestDate(horseData.blood_test_date);
                setStatus(horseData.status);
                setIsGovernmentSubsidized(horseData.is_government_subsidized);
                setHasChildren(horseData.has_children);
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
            horse_name: horseName,
            horse_birthdate: horseBirthdate,
            horse_father: horseFather,
            horse_mother: horseMother,
            gender: gender,
            bred: bred,
            color: color,
            work_type: workType,
            passport_number: passportNumber,
            chip_number: chipNumber,
            blood_test_date: bloodTestDate,
            vaccination_date: vaccinationDate,
            has_children: hasChildren,
            is_government_subsidized: isGovernmentSubsidized,
            status: status
        };
        try {
            await axios.put(`/horses/${id}`, updatedHorse);
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
        <div className='addHorseClass'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="horse_name">Név:</label>
                <input
                    type="text"
                    id="horse_name"
                    value={horseName}
                    onChange={(e) => setHorseName(e.target.value)}
                />

                <label htmlFor="horse_birthdate">Születési Dátum:</label>
                <input
                    type="date"
                    id="horse_birthdate"
                    value={horseBirthdate.split('T')[0]}
                    onChange={(e) => setHorseBirthdate(e.target.value)}
                />

                <label htmlFor="horse_father">Apja:</label>
                <input
                    type="text"
                    id="horse_father"
                    value={horseFather}
                    onChange={(e) => setHorseFather(e.target.value)}
                />

                <label htmlFor="horse_mother">Anyja:</label>
                <input
                    type="text"
                    id="horse_mother"
                    value={horseMother}
                    onChange={(e) => setHorseMother(e.target.value)}
                />

                <label htmlFor="gender">Neme:</label>
                <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">--Válassz nemet--</option>
                    <option value="Mén">Mén</option>
                    <option value="Kanca">Kanca</option>
                    <option value="Herélt">Herélt</option>
                </select>

                <label htmlFor="bred">Fajta:</label>
                <input
                    type="text"
                    id="bred"
                    value={bred}
                    onChange={(e) => setBred(e.target.value)}
                />

                <label htmlFor="color">Szín:</label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />

                <label htmlFor="passport_number">Útlevélszáma:</label>
                <input
                    type="text"
                    id="passport_number"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                />

                <label htmlFor="chip_number">Chipszáma:</label>
                <input
                    type="text"
                    id="chip_number"
                    value={chipNumber}
                    onChange={(e) => setChipNumber(e.target.value)}
                />
                <p>Vérvétel dátuma: {formatDate(horse.blood_test_date)}</p>
                <p>Vakcina dátuma: {formatDate(horse.vaccination_date)}</p>
                <label htmlFor="work_type">Foglalkoztatás:</label>
                <select
                    id="work_type"
                    name="work_type"
                    value={workType}
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

                <label htmlFor="status">Státusz:</label>
                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">--Válassz státuszt--</option>
                    <option value="Telephelyen">Telephelyen</option>
                    <option value="Eladva">Eladva</option>
                    <option value="Elhullott">Elhullott</option>
                </select>

                <label htmlFor="is_government_subsidized">Állami támogatású-e:</label>
                <select
                    id="is_government_subsidized"
                    name="is_government_subsidized"
                    value={isGovernmentSubsidized}
                    onChange={(e) => setIsGovernmentSubsidized(e.target.value)}
                >
                    <option value="">--Válassz opciót--</option>
                    <option value="Igen">Igen</option>
                    <option value="Nem">Nem</option>
                </select>

                {horse.gender === "Kanca" && (
                    <>
                        <label htmlFor="has_children">Van utódja:</label>
                        <select
                            id="has_children"
                            name="has_children"
                            value={hasChildren}
                            onChange={(e) => setHasChildren(e.target.value)}
                        >
                            <option value="">--Válassz opciót--</option>
                            <option value="Igen">Igen</option>
                            <option value="Nem">Nem</option>
                        </select>
                    </>
                )}
                <button type="submit">Frissítés</button>
            </form>
        </div>
    );
};

export default UpdateHorse;