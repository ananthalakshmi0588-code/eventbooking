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
      const [events, bookings, users] = await Promise.all([
        API.get("/events"),
        API.get("/bookings"),
        API.get("/users"),
      ]);

      const revenue = bookings.data.reduce(
        (sum, booking) => sum + booking.totalAmount,
        0
      );

      setStats({
        events: events.data.length,
        bookings: bookings.data.length,
        users: users.data.length,
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