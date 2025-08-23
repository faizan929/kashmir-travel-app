

import React from "react";  


function HotelBookingForm({
  showForm,
  onClose,
  formData,
  onChange,
  onSubmit,
}) {
  if (!showForm) return null;

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh]overflow-y-auto">

        <div className = "flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Complete your booking</h2>
            <button 
              onClick={onClose}
              className = "text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
        </div>

          <div className = "space-y-4">
            <div> 
              <label className = "block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date: 
              </label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
        
            <div>
                <label className = "block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date:
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        
            <div>
                <label className = "block text-sm font-medium text-gray-700 mb-1">
                  Guests:
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        
            <div>
              <label className = "block text-sm font-medium text-gray-700 mb-1">
                  Note:
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={onChange}
                placeholder="Any special requests?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <button 
              onClick = {onSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium mt-6"
            >
              Confirm Booking
            </button>
          </div>
      </div>
</div>
  );
}

export default HotelBookingForm;

