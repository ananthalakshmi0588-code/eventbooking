import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/ManageEvents.css";

function ManageEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const res = await API.get("/events");

      setEvents(res.data.data);

    } catch (err) {
      console.log(err);
    }

  };

  const deleteEvent = async (id) => {

    if (!window.confirm("Delete this event?")) return;

    try {

      await API.delete(`/events/${id}`);

      alert("Event Deleted");

      fetchEvents();

    } catch (err) {

      alert("Delete Failed");

    }

  };

  return (

    <div className="manage-events">

      <div className="header">

        <h1>Manage Events</h1>

        <Link to="/admin/events/add" className="add-btn">
          + Add Event
        </Link>
     

      </div>

      <table>

        <thead>

          <tr>

            <th>Image</th>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Price</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {events.map((event) => (

            <tr key={event._id}>

              <td>

                <img
                  src={event.image}
                  alt={event.title}
                  width="90"
                />

              </td>

              <td>{event.title}</td>

              <td>{event.location}</td>

              <td>
                {new Date(event.date).toLocaleDateString()}
              </td>

              <td>₹{event.price}</td>

              <td>

                <Link
                  to={`/admin/events/edit/${event._id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ManageEvents;