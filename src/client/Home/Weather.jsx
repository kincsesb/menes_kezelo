import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherComponent() {
  const API_KEY = "5155d6bf2239795728e02edd75551e40";
  const API_ENDPOINT_CURRENT = "https://api.openweathermap.org/data/2.5/weather?q=Hortobagy&appid=" + API_KEY + "&lang=hu";
  const API_ENDPOINT_WEEKLY = "https://api.openweathermap.org/data/2.5/forecast?q=Hortobagy&cnt=7&appid=" + API_KEY + "&lang=hu";

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

  const weatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className="home">
      {weatherData && (
        <div>
          <h2>Mai időjárás</h2>
          <div className="temp">
            <img src={weatherIconUrl(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} />
            <p>Hőmérséklet: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>Leírás: {weatherData.weather[0].description}</p>
            <p>Szél: {weatherData.wind.speed}</p>
          </div>
        </div>
      )}
      {weeklyData && (
        <div>
          <h2>Előrejelzés</h2>
          {weeklyData.list.map((data, index) => (
            <div key={index} className="temp">
              <img src={weatherIconUrl(data.weather[0].icon)} alt={data.weather[0].description} />
              <p>{data.dt_txt}</p>
              <p>Leírás: {data.weather[0].description}</p>
              <p>Hőmérséklet: {Math.round(data.main.temp - 273.15)}°C</p>
              <p>Szél: {data.wind.speed}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;
