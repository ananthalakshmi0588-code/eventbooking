import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import "../Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [event, setEvent] = useState(null);

  const [booking, setBooking] = useState({
    user: loggedUser?._id || "",
    tickets: 1,
    totalAmount: 0,
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await API.get(`/events/${id}`);

      setEvent(res.data.data);

      setBooking({
        user: loggedUser?._id || "",
        tickets: 1,
        totalAmount: res.data.data.price,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedBooking = {
      ...booking,
      [name]: value,
    };

    if (name === "tickets") {
      const qty = Number(value);

      updatedBooking.tickets = qty;
      updatedBooking.totalAmount = qty * event.price;
    }

    setBooking(updatedBooking);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Booking Data:", booking);

      await API.post("/bookings", {
        eventId: id,
        tickets: Number(booking.tickets),
        totalAmount: booking.totalAmount,
      });

      alert("🎉 Booking Successful!");
      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  if (!event) return <h2>Loading...</h2>;

  return (
    <div className="booking-page">
      <div className="booking-card">

        <img
          src={event.image}
          alt={event.title}
          className="booking-image"
        />

        <div className="booking-content">

          <h1>{event.title}</h1>

          <p className="price">
            ₹{event.price} <span>per ticket</span>
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Logged In User</label>

              <input
                type="text"
                value={loggedUser?.email || "Not Logged In"}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Number of Tickets</label>

              <input
                type="number"
                name="tickets"
                min="1"
                max="10"
                value={booking.tickets}
                onChange={handleChange}
              />
            </div>

            <div className="booking-summary">

              <div>
                <span>Price per Ticket</span>
                <strong>₹{event.price}</strong>
              </div>

              <div>
                <span>Tickets</span>
                <strong>{booking.tickets}</strong>
              </div>

              <div className="summary-total">
                <span>Total Amount</span>
                <strong>₹{booking.totalAmount}</strong>
              </div>

            </div>

            <button
              type="submit"
              className="confirm-btn"
            >
              Confirm Booking
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Booking;