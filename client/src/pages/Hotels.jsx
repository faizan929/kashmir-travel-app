


import {useEffect, useState} from 'react';
import HotelBookingForm from '../components/HotelBookingForm';

function Hotels() {

    const [hotels, setHotels] = useState([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/hotels")
            .then(res => res.json()) 
            .then(data => setHotels(data))
            .catch(err => {
                console.error(err);
                alert("Failed to fetch hotels");
        });
    }, []);

    const handleBookNow = (hotelId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in to book");
            return; 
        }
        setSelectedHotelId(hotelId);
        setShowBookingForm(true);
    }
    return( 
        <div className="hotel-page">
            <h2>Available Hotels</h2>
            <ul>
                {hotels.map((hotel)=>(
                    <li key = {hotel._id}>
                        <h3>{hotel.name}</h3>
                        <p>{hotel.location}</p>
                        <p>₹{hotel.price}</p>
                        <p>⭐{hotel.rating}</p>
                        <button onClick = {() => handleBookNow(hotel._id)}>Book Now</button>
                    </li>
                ))}
            </ul>

            <HotelBookingForm 
                showForm = {showBookingForm}
                hotelId = {selectedHotelId}
                onClose = {() => setShowBookingForm(false) } 
                onBookingSuccess = {() => {
                        setShowBookingForm(false);
                    }}

            />
        </div>
    );
}

// function bookHotel(hotelId) {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user._id){
//         alert("Please log in to book");
//         return
//     }

//     fetch("http://localhost:5000/api/bookings", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             userId: user._id,
//             itemId: hotelId,
//             itemType: "hotel",
//         }),
    
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         alert("Booking successful");
//         console.log(data);
//     })
//     .catch(async (err) => {
//         const resText = await err.text?.();
//         console.error("Full error ", resText || err);
//         alert("Booking failed")
//     })
// }

export default Hotels;
