


import { useEffect, useState } from "react";
import AddCabForm from "../components/AddCabForm";
import AddHotelForm from "../components/AddHotelForm";
import { submitCab } from "../services/cabService";
import { submitHotel } from "../services/hotelService";

function AdminDashboard() {
    const [hotels, setHotels] = useState([]);
    const [cabs, setCabs] = useState([]);
    const [editHotel, setEditHotel] = useState(null);
    const [editCab, setEditCab] = useState(null);
    
    const [user, setUser] = useState(null);
    const [showHotelForm, setShowHotelForm] = useState(false);
    const [showCabForm, setShowCabForm] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    useEffect(() => {
        if (!user?.isAdmin) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const [hotelRes, cabRes] = await Promise.all([
                    fetch("http://localhost:5000/api/hotels"),
                    fetch("http://localhost:5000/api/cabs")
                ]);

                const hotelData = await hotelRes.json();
                const cabData = await cabRes.json();

                setHotels(hotelData);
                setCabs(cabData);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (user == null || !user?.isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <div className="text-red-500 text-6xl mb-4">🚫</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600">You don't have permission to access this page.</p>
                </div>
            </div>
        );
    }

    const handleHotelSubmit = async (data) => {
        try {
            if (editHotel) {
                const res = await fetch(`http://localhost:5000/api/hotels/${editHotel._id}`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                const updatedHotel = await res.json();
                setHotels((prev) => 
                    prev.map((h) => (h._id === updatedHotel._id ? updatedHotel : h))
                );
                setEditHotel(null);
                setShowHotelForm(false);
            } else {
                const savedHotel = await submitHotel(data);
                setHotels((prev) => [...prev, savedHotel]);
                setShowHotelForm(false);
            }
        } catch (err) {
            console.error(err);
            alert("Error handling hotel");
        }
    };

    const handleCabSubmit = async (data) => {
        try {
            if (editCab) {
                const res = await fetch(`http://localhost:5000/api/cabs/${editCab._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(data),
                });
                const updatedCab = await res.json();
                setCabs((prev) =>
                    prev.map((c) => (c._id === updatedCab._id ? updatedCab : c))
                );
                setEditCab(null);
                setShowCabForm(false);
            } else {
                const savedCab = await submitCab(data);
                setCabs((prev) => [...prev, savedCab]);
                setShowCabForm(false);
            }
        } catch (err) {
            console.error(err);
            alert("Error handling cab");
        }
    };

    const handleDeleteHotel = async (id) => {
        if (!confirm("Are you sure you want to delete this hotel?")) return;
        
        try {
            await fetch(`http://localhost:5000/api/hotels/${id}`, {
                method: 'DELETE'
            });
            setHotels((prev) => prev.filter((hotel) => hotel._id !== id));
        } catch (error) {
            console.error(error);
            alert("Error deleting the hotel");
        }
    };

    const handleDeleteCab = async (id) => {
        if (!confirm("Are you sure you want to delete this cab?")) return;
        
        try {
            await fetch(`http://localhost:5000/api/cabs/${id}`, {
                method: 'DELETE'
            });
            setCabs((prev) => prev.filter((cab) => cab._id !== id));
        } catch (error) {
            console.error(error);
            alert("Error deleting the cab");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
                        <p className="text-gray-600">Manage hotels and cabs for your travel booking platform</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Hotels Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Hotels</h3>
                                        <p className="text-gray-500">{hotels.length} total hotels</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowHotelForm(!showHotelForm);
                                        setEditHotel(null);
                                    }}
                                    className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                                        showHotelForm 
                                            ? "bg-gray-500 hover:bg-gray-600 text-white" 
                                            : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                                >
                                    {showHotelForm ? "Cancel" : "Add Hotel"}
                                </button>
                            </div>

                            {showHotelForm && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <AddHotelForm 
                                        onSubmit={handleHotelSubmit}
                                        initialData={editHotel}
                                    />
                                </div>
                            )}

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {hotels.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">🏨</div>
                                        <p>No hotels added yet</p>
                                    </div>
                                ) : (
                                    hotels.map((hotel) => (
                                        <div key={hotel._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                                            <div>
                                                <h4 className="font-medium text-gray-800">{hotel.name}</h4>
                                                <p className="text-sm text-gray-600">{hotel.location} • ₹{hotel.price}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditHotel(hotel);
                                                        setShowHotelForm(true);
                                                    }}
                                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition duration-200"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteHotel(hotel._id)}
                                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Cabs Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Cabs</h3>
                                        <p className="text-gray-500">{cabs.length} total cabs</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowCabForm(!showCabForm);
                                        setEditCab(null);
                                    }}
                                    className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                                        showCabForm 
                                            ? "bg-gray-500 hover:bg-gray-600 text-white" 
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                >
                                    {showCabForm ? "Cancel" : "Add Cab"}
                                </button>
                            </div>

                            {showCabForm && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <AddCabForm 
                                        onSubmit={handleCabSubmit}
                                        initialData={editCab}
                                    />
                                </div>
                            )}

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {cabs.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">🚗</div>
                                        <p>No cabs added yet</p>
                                    </div>
                                ) : (
                                    cabs.map((cab) => (
                                        <div key={cab._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                                            <div>
                                                <h4 className="font-medium text-gray-800">{cab.name}</h4>
                                                <p className="text-sm text-gray-600">{cab.type} • ₹{cab.pricePerDay}/day</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditCab(cab);
                                                        setShowCabForm(true);
                                                    }}
                                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition duration-200"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCab(cab._id)}
                                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

