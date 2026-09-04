import {useEffect, useState} from 'react';  //useState: store events, useEffect: fetch events

function App() {  //this is a react component.
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://adonix.hackillinois.org/event/")  //calls GET /event/ on the HackIllinois API, which returns a JSON object with an array of events.
      .then((response) => response.json()) //When the server responds, take that response and parse its body as JSON
      .then((data) => {
        console.log(data);
        setEvents(data.events); //take the events array HackIllinois gave us and make that our component's events state.
      });
  }, []);

  return (
    <main>
      <h1> HackIllinois Schedule </h1>
      <p> Events loaded: {events.length} </p>
    </main>
  );
}

export default App;