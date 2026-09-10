import { useEffect, useRef, useState } from "react";
import { DeepOcean } from "recoat/three";
import type { Event } from "./types";
import EventCard from "./components/EventCard";
import "./App.css";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState("Friday");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const oceanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!oceanRef.current) return;

    // recoat needs the actual div to put the background in
    const background = DeepOcean({
      container: oceanRef.current,
    });

    background.start();

    return () => {
      background.destroy();
    };
  }, []);

  useEffect(() => {
    fetch("https://adonix.hackillinois.org/event/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvents(data.events);
      });
  }, []);

  const sortedEvents = [...events].sort(
    (a, b) => a.startTime - b.startTime
  );

  const filteredEvents = sortedEvents.filter((event) => {
    // API time is in seconds, JS Date expects milliseconds
    const day = new Date(event.startTime * 1000).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

    return day === selectedDay;
  });

  return (
    <>
      <div ref={oceanRef} className="ocean-background" />

      <main>
        <header className="top-bar">
          <div className="brand">
            <h1>HACKILLINOIS</h1>
            <p>Schedule</p>
          </div>

          <nav className="site-nav">
            <span>Home</span>
            <span className="active">Schedule</span>
            <span>Mentors</span>
            <span>Prizes</span>
          </nav>

          <div className="day-tabs">
            <button
              className={selectedDay === "Friday" ? "active" : ""}
              onClick={() => setSelectedDay("Friday")}
            >
              Friday
            </button>

            <button
              className={selectedDay === "Saturday" ? "active" : ""}
              onClick={() => setSelectedDay("Saturday")}
            >
              Saturday
            </button>

            <button
              className={selectedDay === "Sunday" ? "active" : ""}
              onClick={() => setSelectedDay("Sunday")}
            >
              Sunday
            </button>
          </div>
        </header>

        <div className="schedule-layout">
          <section className="event-sidebar">
            <div className="schedule-header">
              <div>
                <h2>Schedule</h2>
                <p>Explore events, workshops, and more.</p>
              </div>

              <span className="event-count">
                {filteredEvents.length} events
              </span>
            </div>

            <div className="event-list">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.eventId}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </section>

          <section className="event-details">
            {selectedEvent ? (
              <div className="details-content">
                <span className="event-badge">
                  {selectedEvent.eventType}
                </span>

                <h2>{selectedEvent.name}</h2>

                <div className="event-meta">
                  <div>
                    {new Date(
                      selectedEvent.startTime * 1000
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}

                    {" - "}

                    {new Date(
                      selectedEvent.endTime * 1000
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>

                  <div>
                    {selectedEvent.locations[0]?.description ||
                      "Location unavailable"}
                  </div>
                </div>

                <div className="details-divider"></div>

                <div className="about-section">
                  <h3>About</h3>

                  <p>
                    {selectedEvent.description ||
                      "No description is available for this event."}
                  </p>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <span>Event Type</span>
                    <strong>{selectedEvent.eventType}</strong>
                  </div>

                  <div className="info-card">
                    <span>Location</span>
                    <strong>
                      {selectedEvent.locations[0]?.description ||
                        "Unavailable"}
                    </strong>
                  </div>

                  <div className="info-card">
                    <span>Start Time</span>
                    <strong>
                      {new Date(
                        selectedEvent.startTime * 1000
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </strong>
                  </div>

                  <div className="info-card">
                    <span>End Time</span>
                    <strong>
                      {new Date(
                        selectedEvent.endTime * 1000
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-details">
                <h2>Select an event</h2>
                <p>Choose an event from the schedule to see its details.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;