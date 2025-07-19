

import React from "react";  

import "./HotelBookingForm.css";

function HotelBookingForm({
  showForm,
  onClose,
  formData,
  onChange,
  onSubmit,
}) {
  if (!showForm) return null;

  return (
    <div className="booking-popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Complete your booking</h2>
        <label>
          Check-in Date: 
          <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={onChange}
        />
        </label>
        
        <label>
          Check-out Date:
          <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={onChange}
        />
        </label>
        
        <label>
          Guests:
          <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={onChange}
        />
        </label>
        
      <label>
      Note:
      <textarea
      name="note"
      value={formData.note}
      onChange={onChange}
      placeholder="Any special requests?"
      />
      </label>

        
       
        

        <button onClick = {onSubmit}>Confirm Booking</button>
      </div>
    </div>
  );
}

export default HotelBookingForm;

