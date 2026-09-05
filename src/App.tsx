import {useEffect, useRef, useState} from 'react';  //useState: store events, useEffect: fetch events, useRef: ?
import { DeepOcean } from "recoat/three";
import type {Event} from './types';  
import EventCard from './components/EventCard';
import './App.css';
function App() {  //react component.
  const [events, setEvents] = useState<Event[]>([]);  //starts empty, but will eventually be filled with events from the HackIllinois API.
  const [selectedDay, setSelectedDay] = useState("Friday");  //initially set to friday, but can be changed
  const oceanRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!oceanRef.current) return;

      const background = DeepOcean({
        container: oceanRef.current,
      });

      background.start();

      return () => {
        background.destroy();
      };
    }, []);
  
  useEffect(() => {
    fetch("https://adonix.hackillinois.org/event/")  //calls GET /event on the HackIllinois API, which returns a JSON object with an array of events.
      .then((response) => response.json()) //When the server responds, take that response and parse its body as JSON
      .then((data) => {
        console.log(data);
        setEvents(data.events); 
      });
  }, []);
  const sortedEvents = [...events].sort(
    (a, b) => a.startTime - b.startTime //sorts events from earliest to latest
  );

  const filteredEvents = sortedEvents.filter((event) => {
    const day = new Date(event.startTime * 1000)
      .toLocaleDateString("en-US", { weekday: "long" });

    return day === selectedDay; // actual condition to filter events
  });

  return (
  <>
    <div
      ref={oceanRef}
      className="ocean-background"
    />

    <main>
      <h1>HackIllinois Schedule</h1>
      <p>Events loaded: {events.length}</p>

      <div>
        <button onClick={() => setSelectedDay("Friday")}>
          Friday
        </button>
        <button onClick={() => setSelectedDay("Saturday")}>
          Saturday
        </button>
        <button onClick={() => setSelectedDay("Sunday")}>
          Sunday
        </button>
      </div>

      {filteredEvents.map((event) => (
        <EventCard
          key={event.eventId}
          event={event}
        />
      ))}
    </main>
  </>
);
}

export default App;