import {useEffect, useState} from 'react';  //useState: store events, useEffect: fetch events
import type {Event} from './types';  


function App() {  //react component.
  const [events, setEvents] = useState<Event[]>([]);  //starts empty, but will eventually be filled with events from the HackIllinois API.

  useEffect(() => {
    fetch("https://adonix.hackillinois.org/event/")  //calls GET /event/ on the HackIllinois API, which returns a JSON object with an array of events.
      .then((response) => response.json()) //When the server responds, take that response and parse its body as JSON
      .then((data) => {
        console.log(data);
        setEvents(data.events); 
      });
  }, []);

  return (
    <main>
      <h1> HackIllinois Schedule </h1>
      <p> Events loaded: {events.length} </p>
      {events.map((event) => (
        <div key={event.eventId}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </main>
  );
}

export default App;