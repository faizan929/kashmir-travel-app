

import { useEffect, useState } from 'react';
import HotelBookingForm from '../components/HotelBookingForm';

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        checkInDate: "",
        checkOutDate: "",
        guests: "",
        note: ""
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/hotels")
            .then(res => res.json())
            .then(data => {
                setHotels(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to fetch hotels");
                setLoading(false);
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
            const res = await fetch("http://localhost:5000/api/hotel-bookings", {
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
                alert("Booking Successful");
                setShowBookingForm(false);
                setFormData({
                    checkInDate: "",
                    checkOutDate: "",
                    guests: "",
                    note: ""
                });
            } else {
                alert(data.message || "Booking failed");
            }
        } catch (error) {
            console.error(error);
            alert("Booking failed");
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
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Available Hotels</h2>
                    
                    {hotels.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-gray-400 text-6xl mb-4">🏨</div>
                            <p className="text-xl text-gray-500">No hotels available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {hotels.map((hotel) => (
                                <div key={hotel._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                                    <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                        <div className="text-white text-6xl">🏨</div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                                        
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {hotel.location}
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-green-600 font-bold">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                    ₹{hotel.price}
                                                </div>
                                                
                                                {hotel.rating && (
                                                    <div className="flex items-center text-yellow-500">
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        {hotel.rating}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleBookNow(hotel._id)}
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

            <HotelBookingForm
                showForm={showBookingForm}
                onClose={() => setShowBookingForm(false)}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default Hotels;