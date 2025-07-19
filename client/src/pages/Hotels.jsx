


import {useEffect, useState} from 'react';
import HotelBookingForm from '../components/HotelBookingForm';

function Hotels() {

    const [hotels, setHotels] = useState([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    

    const [formData, setFormData] = useState({
        checkInDate: "",
        checkOutDate: "",
        guests:"",
        note: ""
         
    })

    useEffect(() => {
        fetch("http://localhost:5000/api/hotels")
            .then(res => res.json()) 
            .then(data => setHotels(data))
            .catch(err => {
                console.error(err);
                alert("Failed to fetch hotels");
        });
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value 
        }));
    };

    const handleBookNow = (hotelId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in to book");
            return; 
        }
        setSelectedHotelId(hotelId);
        setShowBookingForm(true);
    };
    
    const handleSubmit = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in to book");
            return;   
        }

        try {
            const res = await fetch("http://localhost:5000/api/hotel-bookings",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    userId: user._id,
                    hotelId: selectedHotelId,
                    ...formData,
                    

                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Booking Successfull");
                setShowBookingForm(false);
                setFormData({
                    checkInDate: "",
                    checkOutDate: "",
                    guests: "",
                    note: ""
                })
            }else{
                alert(data.message || "Booking failed ")
            }
        }catch(error){
            console.error(error);
            alert("Booking failed")
         }
    };
    
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
                onClose = {() => setShowBookingForm(false) } 
                formData = {formData}
                onChange = {handleChange}
                onSubmit = {handleSubmit}
              

            />
        </div>
    );
}

export default Hotels;