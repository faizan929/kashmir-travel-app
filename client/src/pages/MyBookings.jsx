

import {useEffect, useState} from 'react';

function MyBookings() {
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        fetch(`http://localhost:5000/api/bookings/user/${user._id}`)
            .then((res) => res.json())
            .then((data) => setBookings(data))
            .catch((err) => {
                console.error(err);
                alert("Failed to load bookings.")
            });
    
    }, []);


     if (!Array.isArray(bookings)) {
                        return <p>Failed to load bookings.</p>
                    }

    return (
        <div>
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ): (

                <ul>
                   
                    {bookings.map((booking) => (
                        <li key = {booking._id}>
                            <h3>{booking.itemId?.name || "Unknown Hotel"} </h3>
                            <p>Check-in: {booking.checkInDate?.slice(0, 10)}</p>
                            <p>Check-out: {booking.checkOutDate?.slice(0,10)}</p>
                            <p>Guests: {booking.guests}</p>
                            <p>Note: {booking.note}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}

export default MyBookings