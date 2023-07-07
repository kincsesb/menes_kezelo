import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedTable from "./FeedTable";

const workTypes = [
    'Szopós csikó Nóniusz',
    'Növendék csikó Nóniusz 1 éves',
    'Növendék csikó Nóniusz 2 éves',
    'Növendék csikó Nóniusz 3 éves vagy a feletti',
    'Tenyész kanca Nóniusz',
    'Tenyész mén Nóniusz',
    'STV  haszn.kiképzés Nóniusz',
    'Használati ló Pusztaötös',
    'Használati ló id. forg. -hátas',
    'Használati ló csikós hátas',
    'Szerződéses boxos bértartás',
    'Szerződéses ménesi bértartás',
    'Ügyvezetői lótartás',
    'Dolgozói lóbértartás',
    'Idegen helyen lévő',
    'Állami bérmén/egyéb idegen tul.állat',
    'Magyar sportló T.kanca',
    'Magyar sport csikó',
    'Magyar sport növendék ló MSP SKP is benne van',
];

const baleWeights = {
    meadowHay: 319.6,
    alfalfaHay: 283.5,
    straw: 319.6,
    oats: 1,
};

function ForageCalculator() {
    const [horses, setHorses] = useState([]);

    const initialHorseData = (daily_norm) => workTypes.map((work_type) => ({
        work_type,
        daily_norm,
    }));

    const [meadowHayData, setMeadowHayData] = useState(initialHorseData(5));
    const [alfalfaHayData, setAlfalfaHayData] = useState(initialHorseData(7));
    const [strawData, setStrawData] = useState(initialHorseData(5));
    const [oatsData, setOatsData] = useState(initialHorseData(7));

    const [totalMeadowHayBales, setTotalMeadowHayBales] = useState(0);
    const [totalAlfalfaHayBales, setTotalAlfalfaHayBales] = useState(0);
    const [totalStrawBales, setTotalStrawBales] = useState(0);
    const [totalOatsBales, setTotalOatsBales] = useState(0);

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                const response = await axios.get("/horses");
                setHorses(response.data);
            } catch (err) {
                console.error("Hiba a lovak lekérése közben:", err);
            }
        };

        fetchHorses();
    }, []);

    const handleDailyNormChange = (setter) => (index, newDailyNorm) => {
        setter((prevData) => {
            const updatedHorseData = [...prevData];
            updatedHorseData[index].daily_norm = parseFloat(newDailyNorm) || "";
            return updatedHorseData;
        });
    };

    const handleTotalFeedBalesChange = (setter) => (newTotalFeedBales) => {
        setter(newTotalFeedBales);
    };

    return (
        <div>
            <div className="line-1"></div>
            <h1>Takarmány fogyás kalkulátor</h1>
            <div className="line-1"></div>
            <h3>Réti széna</h3>
            <FeedTable
                horseData={meadowHayData}
                onDailyNormChange={handleDailyNormChange(setMeadowHayData)}
                horses={horses}
                baleWeight={baleWeights.meadowHay}
                totalActualFeedBales={totalMeadowHayBales}
                onTotalFeedBalesChange={handleTotalFeedBalesChange(setTotalMeadowHayBales)}
            />
            <div className="line-1"></div>
            <h3>Lucerna széna</h3>
            <FeedTable
                horseData={alfalfaHayData}
                onDailyNormChange={handleDailyNormChange(setAlfalfaHayData)}
                horses={horses}
                baleWeight={baleWeights.alfalfaHay}
                totalActualFeedBales={totalAlfalfaHayBales}
                onTotalFeedBalesChange={handleTotalFeedBalesChange(setTotalAlfalfaHayBales)}
            />
            <div className="line-1"></div>
            <h3>Alomszalma</h3>
            <FeedTable
                horseData={strawData}
                onDailyNormChange={handleDailyNormChange(setStrawData)}
                horses={horses}
                baleWeight={baleWeights.straw}
                totalActualFeedBales={totalStrawBales}
                onTotalFeedBalesChange={handleTotalFeedBalesChange(setTotalStrawBales)}
            />
            <div className="line-1"></div>
            <h3>Zab</h3>
            <FeedTable
                horseData={oatsData}
                onDailyNormChange={handleDailyNormChange(setOatsData)}
                horses={horses}
                baleWeight={baleWeights.oats}
                totalActualFeedBales={totalOatsBales}
                onTotalFeedBalesChange={handleTotalFeedBalesChange(setTotalOatsBales)}
            />
            <div className="line-1"></div>
        </div>
    );
}

export default ForageCalculator;
