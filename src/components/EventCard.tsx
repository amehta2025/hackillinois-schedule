import type { Event } from "../types";

type EventCardProps = { //expects a single prop called event of type Event
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  const start = new Date(event.startTime * 1000); //converts from seconds to ms
  const end = new Date(event.endTime * 1000);

  return (
    <div>
      <h2>{event.name}</h2>
      <p>
        {start.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
        {" - "}
        {end.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <p>{event.locations[0]?.description}</p> 
    </div>
  );
}

//converts time, displays first location's description

export default EventCard;

