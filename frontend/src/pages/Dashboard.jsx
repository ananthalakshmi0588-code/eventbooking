import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../Dashboard.css";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings");

setBookings(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.delete(`/bookings/${id}`);

      setBookings(bookings.filter((item) => item._id !== id));

      alert("Booking Cancelled");

    } catch (err) {
      alert("Unable to cancel booking");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const totalTickets = bookings.reduce(
    (sum, item) => sum + item.tickets,
    0
  );

  const totalAmount = bookings.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h1>Welcome, {user?.name} 👋</h1>
          <p>Your Event Booking Dashboard</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>{bookings.length}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <h2>{totalTickets}</h2>
          <p>Total Tickets</p>
        </div>

        <div className="stat-card">
          <h2>₹{totalAmount}</h2>
          <p>Total Spent</p>
        </div>

      </div>

      <h2 className="title">My Bookings</h2>

      <div className="booking-grid">

        {bookings.length === 0 ? (
          <h2>No Bookings Yet</h2>
        ) : (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>

              <img
                src={booking.event?.image}
                alt={booking.event?.title}
              />

              <div className="booking-body">

                <h3>{booking.event?.title}</h3>

                <p>
                  📍 {booking.event?.location}
                </p>

                <p>
                  🎫 Tickets :
                  <strong> {booking.tickets}</strong>
                </p>

                <p>
                  💰 Total :
                  <strong> ₹{booking.totalAmount}</strong>
                </p>

                <p>
                  📅 {new Date(booking.createdAt).toLocaleDateString()}
                </p>

                <span className="status">
                  Confirmed
                </span>

                <button
                  className="cancel-btn"
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;