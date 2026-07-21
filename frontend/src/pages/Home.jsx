import { Link } from "react-router-dom";
import "../Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Eventora </h1>

          <p>
            Discover and book amazing concerts, conferences, workshops,
            festivals and many more exciting events.
          </p>

          <div className="hero-buttons">
            <Link to="/events">Explore Events</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🎵 Live Events</h3>
            <p>Book concerts and music festivals easily.</p>
          </div>


          <div className="feature-card">
            <h3>💻 Conferences</h3>
            <p>Attend technology and business conferences.</p>
          </div>

          <div className="feature-card">
            <h3>🎭 Workshops</h3>
            <p>Learn new skills from industry experts.</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          <div className="stat-card">
            <h2>500+</h2>
            <p>Events</p>
          </div>

          <div className="stat-card">
            <h2>10K+</h2>
            <p>Bookings</p>
          </div>

          <div className="stat-card">
            <h2>100+</h2>
            <p>Organizers</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;