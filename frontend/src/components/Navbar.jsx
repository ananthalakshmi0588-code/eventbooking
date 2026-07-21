import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#222",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ color: "white" }}>Event Booking</h2>

      <div>
        <Link to="/" style={{ color: "white", marginRight: "20px" }}>
          Home
        </Link>

        <Link to="/events" style={{ color: "white", marginRight: "20px" }}>
          Events
        </Link>

        <Link to="/login" style={{ color: "white", marginRight: "20px" }}>
          Login
        </Link>

        <Link to="/register" style={{ color: "white" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;