import { Link, Outlet } from "react-router-dom";
import "../styles/Admin.css";

function AdminLayout() {

  const admin = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="admin-container">

      <aside className="sidebar">

        <h2>EVENTORA</h2>

        <ul>

          <li><Link to="/admin/dashboard">🏠 Dashboard</Link></li>

          <li><Link to="/admin/events">🎉 Events</Link></li>

          <li><Link to="/admin/events/add">➕ Add Event</Link></li>

          <li><Link to="/admin/bookings">🎟 Bookings</Link></li>

          <li><Link to="/admin/users">👤 Users</Link></li>

        </ul>

      </aside>

      <main className="dashboard-content">

        <div className="topbar">

          <h2>Admin Panel</h2>

          <div>

            Welcome,

            <strong>{admin?.name}</strong>

          </div>

        </div>

        <Outlet />

      </main>

    </div>

  );
}

export default AdminLayout;