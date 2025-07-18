

import React, { useState } from "react";

import "./HotelBookingForm.css";

function HotelBookingForm( {showForm, onClose, hotelId, onBookingSuccess} ) {
    const [checkInDate, setCheckInDate] = useState("");  //// ??
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [note , setNote] = useState("");


    if (!showForm) return null;


    const handleBooking = async () => {
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
                    hotelId,
                    checkInDate,
                    checkOutDate,
                    guests,
                    note,

                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Booking Successful.");
                onBookingSuccess();  /// optional callback

            } else {
                alert(data.message || "Booking failed.");
            }
        }catch(err){
            console.error(err);
            alert("Booking failed")
        }
    };

    return (
        <div className = "booking-popup">
            <div className = "popup-inner">
                <button className = "close-btn" onClick={onClose}>X</button>
                <h2>Complete your booking</h2>



                <label>Check-in Date:</label>
                <input type = "date" value = {checkInDate} onChange = {(e) => setCheckInDate(e.target.value)} />


                <label>Check-out Date:</label>
                <input type = "date" value = {checkOutDate} onChange = {(e) => setCheckOutDate(e.target.value)} />


                <label>No. of guests:</label>
                <input type = "number" value = {guests} onChange = {(e) => setGuests(e.target.value)}  />

                <label>Note(optional):</label>
                <textarea value = {note} onChange = { (e) => setNote(e.target.value)} placeholder = "Special requests..." />

                <button onClick = {handleBooking}>Confirm Booking</button>

            </div>
        </div>
    );

}  

export default HotelBookingForm