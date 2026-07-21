import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/AddEvent.css";

function AddEvent() {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    image: "",
    location: "",
    date: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/events", event);

      alert("🎉 Event Added Successfully!");

      navigate("/admin/events");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to add event");
    }
  };

  return (
    <div className="add-event-page">
      <div className="add-event-card">
        <h1>Add New Event</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={event.image}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={event.location}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Ticket Price"
            value={event.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            rows="5"
            placeholder="Event Description"
            value={event.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Event
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddEvent;