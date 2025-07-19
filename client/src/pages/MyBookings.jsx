import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const [hotelRes, cabRes] = await Promise.all([
          fetch(`http://localhost:5000/api/hotel-bookings/user/${user._id}`),
          fetch(`http://localhost:5000/api/cab-bookings/user/${user._id}`),
        ]);

        const hotelData = await hotelRes.json();
        const cabData = await cabRes.json();

        const hotelWithType = hotelData.map((b) => ({ ...b, type: "hotel" }));
        const cabWithType = cabData.map((b) => ({ ...b, type: "cab" }));
        setBookings([...hotelWithType, ...cabWithType]);
      } catch (error) {
        console.error(error);
        alert("Failed to load the bookings.");
      }
    };
    fetchBookings();
  }, []);

  if (!Array.isArray(bookings)) {
    return <p>Failed to load bookings.</p>;
  }

  return (
    <div>
      {/* <h2>My Bookings</h2> */}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <h3>{booking.type === "hotel" ? booking.hotelId?.name : booking.cabId?.name} </h3>

              {booking.type === "hotel" ? (
                <>
                  <p>Check-in: {booking.checkInDate?.slice(0, 10)}</p>
                  <p>Check-out: {booking.checkOutDate?.slice(0, 10)}</p>
                  <p>Guests: {booking.guests}</p>
                </>
              ) : (
                <>
                  <p>Pickup Location:{booking.pickupLocation}</p>
                  <p>Drop Location:{booking.dropLocation}</p>
                  <p>Pickup Date: {booking.pickupDate?.slice(0, 10)}</p>
                </>
              )}

              <p>Note: {booking.note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBookings;
