import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedTable from "./FeedTable";

axios.defaults.baseURL = "http://localhost:5001";

//Not actual
// const workTypes = [
//     "Csikós hátas",
//     "Infó fogat",
//     "Magyar Sport Tenyész kanca",
//     "Nóniusz Tenyész kanca",
//     "Verseny"
// ];

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

    const [totalMeadowHay, setTotalMeadowHay] = useState(0)
    const [totalAlfalfaHay, setTotalAlfalfaHay] = useState(0)
    const [totalStraw, setTotalStraw] = useState(0)
    const [totalOats, setTotalOats] = useState(0)

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                const response = await axios.get("http://localhost:5001/horses");
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

    const handleTotalFeedChange = (setter) => (newTotalFeed) => {
        setter(newTotalFeed);
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
                onTotalFeedChange={handleTotalFeedChange(setTotalMeadowHay)}
                totalActualFeed={totalMeadowHay}
            />
            <div className="line-1"></div>
            <h3>Lucerna széna</h3>
            <FeedTable
                horseData={alfalfaHayData}
                onDailyNormChange={handleDailyNormChange(setAlfalfaHayData)}
                horses={horses}
                baleWeight={baleWeights.alfalfaHay}
                onTotalFeedChange={handleTotalFeedChange(setTotalAlfalfaHay)}
                totalActualFeed={totalAlfalfaHay}
            />
            <div className="line-1"></div>
            <h3>Alomszalma</h3>
            <FeedTable
                horseData={strawData}
                onDailyNormChange={handleDailyNormChange(setStrawData)}
                horses={horses}
                baleWeight={baleWeights.straw}
                onTotalFeedChange={handleTotalFeedChange(setTotalStraw)}
                totalActualFeed={totalStraw}
            />
            <div className="line-1"></div>
            <h3>Zab</h3>
            <FeedTable
                horseData={oatsData}
                onDailyNormChange={handleDailyNormChange(setOatsData)}
                horses={horses}
                baleWeight={baleWeights.oats}
                onTotalFeedChange={handleTotalFeedChange(setTotalOats)}
                totalActualFeed={totalOats}
            />
            <div className="line-1"></div>
        </div>
    );
}

export default ForageCalculator;
