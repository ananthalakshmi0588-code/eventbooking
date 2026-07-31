import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Admin.css";

function AdminDashboard() {

  const [stats, setStats] = useState({
    events: 0,
    bookings: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [eventsRes, bookingsRes, usersRes] = await Promise.all([
        API.get("/events"),
        API.get("/bookings"),
        API.get("/users"),
      ]);

      const eventsList = eventsRes.data.data || eventsRes.data || [];
      const bookingsList = bookingsRes.data.data || bookingsRes.data || [];
      const usersList = usersRes.data.data || usersRes.data || [];

      const revenue = bookingsList.reduce(
        (sum, booking) => sum + (booking.totalAmount || 0),
        0
      );

      setStats({
        events: eventsList.length,
        bookings: bookingsList.length,
        users: usersList.length,
        revenue,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <>
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Events</h3>
          <p>{stats.events}</p>
        </div>

        <div className="card">
          <h3>Total Bookings</h3>
          <p>{stats.bookings}</p>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <p>₹{stats.revenue}</p>
        </div>

      </div>

    </>
  );
}

export default AdminDashboard;