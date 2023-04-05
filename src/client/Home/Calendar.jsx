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

function CalendarComponent() {
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

  useEffect(() => {
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

  const handleDeleteEvent = (event) => {
    axios.delete(`/api/events/${event.id}`)
      .then(() => {
        setEvents(events.filter(e => e.id !== event.id));
      })
      .catch(error => {
        console.log('Hiba történt az esemény törlése közben:', error);
      });
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
      <h2 className="home">Esemény naptár</h2>
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

export default CalendarComponent;
