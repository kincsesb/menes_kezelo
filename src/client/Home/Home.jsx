import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const API_KEY = "5155d6bf2239795728e02edd75551e40";
  const API_ENDPOINT_CURRENT = "https://api.openweathermap.org/data/2.5/weather?q=Hortobagy&appid=" + API_KEY;
  const API_ENDPOINT_WEEKLY = "https://api.openweathermap.org/data/2.5/forecast?q=Hortobagy&cnt=7&appid=" + API_KEY;

  const [weatherData, setWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resultCurrent = await axios(API_ENDPOINT_CURRENT);
      const resultWeekly = await axios(API_ENDPOINT_WEEKLY);
      setWeatherData(resultCurrent.data);
      setWeeklyData(resultWeekly.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="home">
        {weatherData && (
          <div>
            <h2>Hortobágyi időjárás</h2>
            <div className="temp">
              <p>Ma: {weatherData.weather[0].description}</p>
              <p>Hőmérséklet: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            </div>
          </div>
        )}
        {weeklyData && (
          <div>
            <h2>Előrejelzés</h2>
            {weeklyData.list.map((data, index) => (
              <div key={index} className="temp">
                <p>{data.dt_txt}</p>
                <p>{data.weather[0].description}</p>
                <p>{Math.round(data.main.temp - 273.15)}°C</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
