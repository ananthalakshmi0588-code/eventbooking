import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          EVENTORA
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>

          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" style={{ color: "#ff9800" }}>
                  Admin Panel
                </Link>
              )}
              <span style={{ color: "#2563eb", fontWeight: "600" }}>
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;