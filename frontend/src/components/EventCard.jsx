import { Link } from "react-router-dom";
import "../EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />

      <div className="event-content">
        <h3>{event.title}</h3>

        <p>{event.location}</p>

        <p>{event.date}</p>

        <h2 className="event-price">₹{event.price}</h2>

        <Link to={`/booking/${event._id}`}>
          <button className="book-btn">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;