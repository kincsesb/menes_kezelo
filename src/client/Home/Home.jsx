import React from "react";
import CalendarComponent from './Calendar';
import WeatherComponent from './Weather';

function Home() {
  return (
    <div>
      <div className="line-1"></div>
      <WeatherComponent />
      <div className="line-1"></div>
      <CalendarComponent />
    </div>
  );
}

export default Home;
