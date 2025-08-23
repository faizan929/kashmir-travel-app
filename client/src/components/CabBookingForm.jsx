
import React from "react";

function CabBookingForm({
  selectedCab,
  formData,
  onSubmit,
  onChange,
  onClose,
}) {
  if (!selectedCab) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
       className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh]overflow-y-auto" 
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Book {selectedCab.name}</h3>
            <button onClose = {onClose}
              className = "text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
        </div>

        <form onSubmit={onSubmit}  className="space-y-4">
          <div> 
            <label className = "block text-sm font-medium text-gray-700 mb-1">
                From Date:
            </label>

            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-1">
                To Date:
          </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>

        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-1">
            Pickup Location:
          </label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"   
            />
        </div>
        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-1">
            Drop Location:
          </label>
            <input
              type="text"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={onChange}
              required
              className = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
        
        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-1">
            Phone:
          </label>
            <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            className = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-1">
            Time:
          </label>
            <input
            type="time"
            name="time"
            value={formData.time}
            onChange={onChange}
            required
            className = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <textarea
            name="note"
            value={formData.note}
            onChange={onChange}
            placeholder="Special requests..."
            className = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

          <div className = "flex space-x-3 pt-4">
            <button 
                type="submit"
                className = "flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Confirm Booking
            </button>

            <button 
                type="button" 
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200 font-medium"
            >
              Cancel
            </button>
          </div> 
        </form>
      </div>
    </div>
  );
}

export default CabBookingForm;
