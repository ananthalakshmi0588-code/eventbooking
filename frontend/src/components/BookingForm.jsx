import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../Booking.css";

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

      setFormData((prev) => ({
        ...prev,
        totalAmount: res.data.data.price,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = {
      ...formData,
      [name]: value,
    };

    if (name === "tickets" && event) {
      updated.totalAmount = Number(value) * event.price;
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", {
        eventId: id,
        ...formData,
        tickets: Number(formData.tickets),
      });

      alert("🎉 Booking Successful!");

      navigate("/dashboard");

    } catch (err) {
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
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Tickets</label>

              <input
                type="number"
                name="tickets"
                min="1"
                max="10"
                value={formData.tickets}
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
                <strong>{formData.tickets}</strong>
              </div>

              <div className="summary-total">
                <span>Total Amount</span>
                <strong>₹{formData.totalAmount}</strong>
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

export default BookingForm;