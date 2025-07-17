
import {useEffect, useState} from 'react';

function Cabs(){

    const [cabs, setCabs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCab, setSelectedCab] = useState(null);
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        pickupLocation: '',
        dropLocation: ''
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
            dropLocation: ''
        });
    };

    const handleChange = (e)  => {
        setFormData(prev=>({... prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Booking:', {
            ...formData,
            cabId: selectedCab._id,
            pricePerDay: selectedCab.pricePerDay
        });
        closeModal();
    }
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
                <div className = "modal">
                    <div className = "modal-content">
                        <h3>Book {selectedCab.name}</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                From Date:
                                  <input 
                                  type = "date" 
                                  name = "fromDate" 
                                  value = {formData.fromDate} 
                                  onChange = {handleChange} 
                                  required />
                            </label>
                            <br />
                            <label>
                                To Date:
                                <input
                                    type = "date"
                                    name = "toDate"
                                    value = {formData.toDate}
                                    onChange = {handleChange}
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
                                    onChange = {handleChange}
                                
                                />

                            </label>
                            <br /> 
                            <label>
                                Drop Location:
                                <input 
                                type = "text" 
                                name = "dropLocation" 
                                value = {formData.dropLocation} 
                                onChange = {handleChange} 
                                required />
                            </label>
                            <br />
                            <button type = "submit">Confirm Booking</button>
                            <button type = "button" onClick = {closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Cabs;