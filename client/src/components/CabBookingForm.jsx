 
 
 
 
 import React from "react";
 import './CabBookingForm.css';


 function CabBookingForm ({ 
            selectedCab,
            formData,
            onSubmit,
            onChange,
            onClose
 }){

    if (!selectedCab) return null;


 return ( 
    <div className = "modal">
        <div className = "modal-content">
                        <h3>Book {selectedCab.name}</h3>
                        <form onSubmit={onSubmit}>
                            <label>
                                From Date:
                                  <input 
                                  type = "date" 
                                  name = "fromDate" 
                                  value = {formData.fromDate} 
                                  onChange = {onChange} 
                                  required />
                            </label>
                            <br />
                            <label>
                                To Date:
                                <input
                                    type = "date"
                                    name = "toDate"
                                    value = {formData.toDate}
                                    onChange = {onChange}
                                    required



                                />

                            </label>
                            <br />
                            <label>
                                Pickup Location:
                                <input 
                                    type = "text"
                                    name = "pickupLocation"
                                    value = {formData.pickupLocation}
                                    onChange = {onChange}
                                
                                />

                            </label>
                            <br /> 
                            <label>
                                Drop Location:
                                <input 
                                type = "text" 
                                name = "dropLocation" 
                                value = {formData.dropLocation} 
                                onChange = {onChange} 
                                required />
                            </label>
                            <br />
                            <button type = "submit">Confirm Booking</button>
                            <button type = "button" onClick = {onClose}>Cancel</button>
                        </form>
                    </div>
                </div>
        );
 }
 

 

 

    export default CabBookingForm;

                    


            