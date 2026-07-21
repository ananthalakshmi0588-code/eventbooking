import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await API.get(`/events/${id}`);
      setEvent(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!event) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="details-container">
      <img
        src={event.image}
        alt={event.title}
        className="details-image"
      />

      <div className="details-content">
        <h1>{event.title}</h1>

        <p className="location">📍 {event.location}</p>

        <p>📅 {new Date(event.date).toLocaleDateString()}</p>

        <p className="price">💰 ₹{event.price}</p>

        <h3>About Event</h3>

        <p>{event.description}</p>

        <Link to={`/booking/${event._id}`}>
          <button className="book-btn">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;