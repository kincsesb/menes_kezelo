import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, startOfWeek, getDay, add } from 'date-fns';
import hu from 'date-fns/locale/hu';
import Modal from "react-modal";
Modal.setAppElement('#root');

axios.defaults.baseURL = 'http://localhost:5001';

const locales = {
  'hu': hu,
};

const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  add,
  locales,
});

function Home() {
  const API_KEY = "5155d6bf2239795728e02edd75551e40";
  const API_ENDPOINT_CURRENT = "https://api.openweathermap.org/data/2.5/weather?q=Hortobagy&appid=" + API_KEY + "&lang=hu";
  const API_ENDPOINT_WEEKLY = "https://api.openweathermap.org/data/2.5/forecast?q=Hortobagy&cnt=7&appid=" + API_KEY + "&lang=hu";

  const [weatherData, setWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSelectEvent = (event) => {
    if (window.confirm(`Biztosan törölni szeretnéd ezt az eseményt: ${event.title}?`)) {
      handleDeleteEvent(event);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resultCurrent = await axios(API_ENDPOINT_CURRENT);
      const resultWeekly = await axios(API_ENDPOINT_WEEKLY);
      setWeatherData(resultCurrent.data);
      setWeeklyData(resultWeekly.data);
    };
    fetchData();

    axios.get('/api/events')
      .then(response => {
        const apiEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
        }));
        setEvents(apiEvents);
      })
      .catch(error => {
        console.log('Hiba történt az események lekérése közben:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: title,
      start_date: new Date(start),
      end_date: new Date(end)
    }
    axios.post('/api/events', newEvent)
      .then(res => {
        console.log(res.data);
        setEvents(prevEvents => [
          ...prevEvents,
          {
            ...newEvent,
            id: res.data.id,
          },
        ]);
      })
      .catch(err => console.log(err));
    setModalIsOpen(false);
  }

  const handleDeleteEvent = (event) => {
    axios.delete(`/api/events/${event.id}`)
      .then(() => {
        setEvents(events.filter(e => e.id !== event.id));
      })
      .catch(error => {
        console.log('Hiba történt az esemény törlése közben:', error);
      });
  };

  const weatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    content: {
      display: 'grid',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
      maxHeight: '80%',
      overflowY: 'auto',
      zIndex: 1000,
      marginTop: '20px',
      backgroundColor: 'white',
      textAlign: 'center',
      alignItems: 'center',
      gap: '10px'
    },
  };

  const inputStyles = {
    margin: '8px',
  };


  return (
    <div>
      <div className="line-1"></div>
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
      <div className="line-1"></div>
      <div className="home">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={event => handleSelectEvent(event)}
          style={{ height: '100vh', width: '100%' }}
          culture='hu'
        />
        <button onClick={() => setModalIsOpen(true)}>Új esemény hozzáadása</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Event"
          style={customStyles}
          portalClassName="custom-modal-portal"
        >
          <h3>Új esemény hozzáadása</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={inputStyles}>Cím:</label>
              <input style={{ width: "400px", height: '50px', inputStyles }} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label style={inputStyles}>Kezdés:</label>
              <input style={inputStyles} type="date" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div>
              <label style={inputStyles}>Befejezés:</label>
              <input style={inputStyles} type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
            <button style={inputStyles} type="submit">Hozzáadás</button>
            <button style={{inputStyles, marginLeft:'20px'}} type="button" onClick={() => setModalIsOpen(false)}>Mégse</button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
