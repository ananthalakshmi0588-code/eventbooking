import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/AddEvent.css";

function EditEvent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    date: "",
    price: "",
  });

  useEffect(() => {

    loadEvent();

  }, []);

  const loadEvent = async () => {

    const res = await API.get(`/events/${id}`);

    const data = res.data.data;

    setEvent({
      title: data.title,
      description: data.description,
      image: data.image,
      location: data.location,
      date: data.date.substring(0,10),
      price: data.price,
    });

  };

  const handleChange = (e) => {

    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });

  };

  const updateEvent = async (e) => {

    e.preventDefault();

    await API.put(`/events/${id}`, event);

    alert("Event Updated Successfully");

    navigate("/admin/events");

  };

  return (
    <div className="add-event-page">

      <div className="add-event-card">

        <h1>Edit Event</h1>

        <form onSubmit={updateEvent}>

          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <input
            name="image"
            value={event.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <input
            name="location"
            value={event.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            value={event.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <textarea
            name="description"
            rows="5"
            value={event.description}
            onChange={handleChange}
          />

          <button>
            Update Event
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditEvent;