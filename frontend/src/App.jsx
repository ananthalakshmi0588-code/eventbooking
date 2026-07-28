import "./App.css";
import "./EventCard.css";
import "./Events.css";
import "./Footer.css";
import "./Gallery.css";
import "./Home.css";
import "./index.css";
import "./Navbar.css";
import "./Login.css";
import "./Register.css";
import "./Booking.css";
import "./Dashboard.css";
import "./styles/Admin.css";
import "./styles/ManageEvents.css";
import "./styles/ManageUsers.css";
import "./styles/ManageBookings.css";
import "./styles/AddEvent.css";

import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";

// User Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingForm from "./components/BookingForm";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageEvents from "./pages/ManageEvents";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import ManageBookings from "./pages/ManageBookings";
import ManageUsers from "./pages/ManageUsers";

function AppContent() {

  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>

      {/* User Navbar */}
      {!isAdminPage && <Navbar />}

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route path="/event/:id" element={<EventDetails />} />

        <Route path="/booking/:id" element={<Booking />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/bookingform" element={<BookingForm />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ================= ADMIN LOGIN ================= */}

        <Route path="/admin" element={<AdminLogin />} />


        {/* ================= ADMIN PANEL ================= */}

        <Route element={<AdminLayout />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/events"
            element={<ManageEvents />}
          />

          <Route
            path="/admin/events/add"
            element={<AddEvent />}
          />

          <Route
            path="/admin/events/edit/:id"
            element={<EditEvent />}
          />

          <Route
            path="/admin/bookings"
            element={<ManageBookings />}
          />

          <Route
            path="/admin/users"
            element={<ManageUsers />}
          />

        </Route>

      </Routes>

      {/* User Footer */}
      {!isAdminPage && <Footer />}

    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;

