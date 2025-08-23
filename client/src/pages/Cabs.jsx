

import { useEffect, useState } from 'react';
import CabBookingForm from "../components/CabBookingForm";

function Cabs() {
    const [cabs, setCabs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCab, setSelectedCab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        pickupLocation: '',
        dropLocation: '',
        phone: '',
        time: '',
        note: ''
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/cabs")
            .then(res => res.json())
            .then(data => {
                setCabs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to fetch cabs.');
                setLoading(false);
            });
    }, []);

    const openModal = (cab) => {
        setSelectedCab(cab);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({
            fromDate: '',
            toDate: '',
            pickupLocation: '',
            dropLocation: '',
            phone: '',
            time: '',
            note: ''
        });
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
            time: formData.time,
            cabType: selectedCab.type,
            note: formData.note || ""
        };

        console.log("booking data being sent", bookingData);

        try {
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
            } else {
                alert(result.message || "Booking failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error, try again later.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Cabs in Kashmir</h2>
                        <p className="text-xl text-gray-600">Find and book comfortable cabs for your travel.</p>
                    </div>

                    {cabs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-gray-400 text-6xl mb-4">🚗</div>
                            <p className="text-xl text-gray-500">No cabs available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {cabs.map((cab) => (
                                <div key={cab._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <div className="text-white text-6xl">🚗</div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{cab.name}</h3>
                                        
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center justify-between py-1">
                                                <span className="text-gray-600 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    Type:
                                                </span>
                                                <span className="font-medium">{cab.type}</span>
                                            </div>
                                            
                                            {cab.seats && (
                                                <div className="flex items-center justify-between py-1">
                                                    <span className="text-gray-600 flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Seats:
                                                    </span>
                                                    <span className="font-medium">{cab.seats}</span>
                                                </div>
                                            )}
                                            
                                            <div className="flex items-center justify-between py-1">
                                                <span className="text-gray-600 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                    Price:
                                                </span>
                                                <span className="font-bold text-green-600">₹{cab.pricePerDay}/day</span>
                                            </div>
                                        </div>
                                        
                                        {cab.description && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cab.description}</p>
                                        )}
                                        
                                        <button
                                            onClick={() => openModal(cab)}
                                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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