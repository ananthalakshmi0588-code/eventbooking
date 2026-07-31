import { useEffect, useState } from "react";
import API from "../services/api";

function ManageBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const res = await API.get("/bookings");

      setBookings(res.data.data ||res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">

      <h1>Manage Bookings</h1>

      <table>

        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Event</th>
            <th>Tickets</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          {bookings.map((booking) => (

            <tr key={booking._id}>

              <td>{booking.user?.name}</td>

              <td>{booking.user?.email}</td>

              <td>{booking.event?.title}</td>

              <td>{booking.tickets}</td>

              <td>₹{booking.totalAmount}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageBookings;