import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const [hotelRes, cabRes] = await Promise.all([
          fetch(`http://localhost:5000/api/hotel-bookings/user/${user._id}`),
          fetch(`http://localhost:5000/api/cab-bookings/user/${user._id}`),
        ]);

        const hotelData = await hotelRes.json();
        const cabData = await cabRes.json();

        const hotelWithType = hotelData.map((b) => ({ ...b, type: "hotel" }));
        const cabWithType = cabData.map((b) => ({ ...b, type: "cab" }));
        setBookings([...hotelWithType, ...cabWithType]);
      } catch (error) {
        console.error(error);
        alert("Failed to load the bookings.");
      }
    };
    fetchBookings();
  }, []);

  if (loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }else{
    setLoading(false);  //// here
  }


    if (!Array.isArray(bookings)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-xl text-gray-600">Failed to load bookings.</p>
                </div>
            </div>
        );
    }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Bookings</h2>



          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <p className="text-xl text-gray-500 mb-4">No bookings found.</p>
              <p className="text-gray-400">Start exploring and book your first trip!</p>
            </div>
          ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {booking.type === "hotel" ? booking.hotelId?.name : booking.cabId?.name} 
                  </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.type === "hotel" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-blue-100 text-blue-800"
                  }`}>
                    {booking.type === "hotel" ? "🏨 Hotel" : "🚗 Cab"}           
                </span>
              </div>
            
              
              <div className="space-y-2">
                  {booking.type === "hotel" ? (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">{booking.checkInDate?.slice(0, 10)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">{booking.checkOutDate?.slice(0, 10)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium">{booking.guests}</span>
                    </div>
                  </>
                  ) : (
                  
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Pickup:</span>
                      <span className="font-medium">{booking.pickupLocation}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Drop:</span>
                      <span className="font-medium">{booking.dropLocation}</span>
                    </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{booking.pickupDate?.slice(0, 10)}</span>
                      </div>
                  </>
                )}
                                          
                {booking.note && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium">Note:</span>
                    <p className="text-gray-700 mt-1">{booking.note}</p>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )}

export default MyBookings;
