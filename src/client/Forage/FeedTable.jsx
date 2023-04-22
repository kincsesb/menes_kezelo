import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

//Inkább bála mint össz tömeg megadása.

function FeedTable({ horseData, onDailyNormChange, onTotalFeedChange, totalActualFeed, baleWeight, horses }) {
    const [calculatedData, setCalculatedData] = useState(horseData);

    
    useEffect(() => {
        const updatedHorseData = horseData.map((horseGroup) => {
            const count = horses.filter((horse) => horse.work_type === horseGroup.work_type).length;
            const total_feed = count * horseGroup.daily_norm * 30;
            
            return { ...horseGroup, count, total_feed };
        });
        
        setCalculatedData(updatedHorseData);
    }, [horses, horseData]);
    
    const calculatePercentage = (groupTotalFeed) => {
        return totalFeed !== 0 ? (groupTotalFeed / totalFeed) * 100 : 0;
    };
    
    const calculateActualFeed = (percentage) => {
        return (totalActualFeed * percentage) / 100;
    };
    
    const calculateBales = (feed) => {
        return feed / baleWeight;
    };

    const totalHorses = calculatedData.reduce((acc, group) => acc + group.count, 0);
    const totalFeed = calculatedData.reduce((acc, group) => acc + group.total_feed, 0);

    return (
        <table>
            <thead>
                <tr>
                    <th>Ló korcsoport</th>
                    <th>Létszám</th>
                    <th>Napi Norma (kg)</th>
                    <th>Normaszerinti takarmányfogyás (kg)</th>
                    <th>Normaszerinti fogyás (%)</th>
                    <th>Tényleges fogyás (kg)</th>
                    <th>Tényleges fogyás (bála)</th>
                </tr>
            </thead>
            <tbody>
                {calculatedData.map((row, index) => {
                    const percentage = calculatePercentage(row.total_feed);
                    const actualFeed = calculateActualFeed(percentage);
                    const bales = calculateBales(actualFeed);

                    return (
                        <tr key={index}>
                            <td>{row.work_type}</td>
                            <td>{row.count}</td>
                            <td>
                                <input
                                    type="number"
                                    value={row.daily_norm}
                                    onChange={(e) => onDailyNormChange(index, e.target.value)}
                                />
                            </td>
                            <td>{row.total_feed}</td>
                            <td>{percentage.toFixed(2)}%</td>
                            <td>{actualFeed.toFixed(2)}</td>
                            <td>{bales.toFixed(2)}</td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td>Összesen</td>
                    <td>{totalHorses}</td>
                    <td></td>
                    <td>{totalFeed}</td>
                    <td></td>
                    <td>
                        <input
                            type="number"
                            value={totalActualFeed}
                            onChange={(e) => onTotalFeedChange(e.target.value)}
                        />
                    </td>
                    <td>{(totalActualFeed / baleWeight).toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
    );
}

export default FeedTable;
