import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="events-page">

    <h1>Upcoming Events</h1>

    <div className="events-container">

        {events.map((event) => (
            <EventCard
                key={event._id}
                event={event}
            />
        ))}

    </div>

</div>
  );
}

export default Events;