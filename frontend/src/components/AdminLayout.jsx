import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function AdminLayout() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));

  if (!admin || admin.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin");
  };

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

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span>Welcome, <strong>{admin?.name}</strong></span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;