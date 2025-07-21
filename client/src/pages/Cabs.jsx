

import "./Cabs.css"
import {useEffect, useState} from 'react';


import CabBookingForm from "../components/CabBookingForm"

function Cabs(){

    const [cabs, setCabs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCab, setSelectedCab] = useState(null);
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        pickupLocation: '',
        dropLocation: '',
        phone: '',
        time: '',
        note: ''
    })



    useEffect(() => {
        fetch("http://localhost:5000/api/cabs")
        .then(res => res.json())
        .then(data => setCabs(data))
        .catch(err => {
            console.error(err);
            alert('Failed to fetch cabs.')
        });
    }, []);

    const openModal = (cab) => {
        // console.log("openmodal fired for ", cab.name)
        setSelectedCab(cab);
        setShowModal(true); 
        // console.log("setshow", showModal);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({
            fromDate: '',
            toDate: '',
            pickupLocation: '',
            dropLocation: '',
            phone:'',
            time:'',
            note: ''
        });
    };

    const handleChange = (e)  => {
        setFormData(prev=>({... prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in to book.");
            return;
        }

        const bookingData = {
            userId: user._id,
            cabId: selectedCab._id,
            phone: formData.phone,
            pickupLocation: formData.pickupLocation,
            dropLocation: formData.dropLocation,
            date: formData.fromDate,
            time : formData.time,
            cabType: selectedCab.type,
            note: formData.note || ""
        };

        console.log("booking data being sent", bookingData)

        try{ 
            const res = await fetch("http://localhost:5000/api/cab-bookings/book-cab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(bookingData)
            });
            const result = await res.json();
            if (res.ok) {
                alert("Cab booked successfully.");
                closeModal();
            }else{
                alert(result.message || "Booking failed.");
            }
        } catch(err){
            console.error(err);
            alert("Server error, try again later.")
        }
           
       
    };
    
    return (
        <div className="cab-page">
            <h2>Cabs in Kashmir</h2>
            <p>Find and book comfortable cabs for your travel.</p>


            <ul>
                {cabs.map((cab) => (
                    <li key={cab._id}>
                        <h3>{cab.name}</h3>
                        <p>Type: {cab.type}</p>
                        <p>Seats: {cab.seats}</p>
                        <p>₹{cab.pricePerDay}/day</p>
                        <p>{cab.description}</p>
                        <button onClick={() => openModal(cab)}>Book Now</button>
                    </li>
                ))}
            </ul>
                    {showModal && selectedCab && (
                        <CabBookingForm
                            selectedCab={selectedCab}
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onClose={closeModal}
                        />
                    )}
               

        </div>
    );
}

export default Cabs;