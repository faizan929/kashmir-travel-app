

const mongoose = require('mongoose')

const HotelBookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ///??
        ref: "User",
        required: true
    },
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,   // ???
        required: true,
        ref: "Hotel"
        // refPath: 'itemType'
    },
    checkInDate: Date,
    checkOutDate: Date,
    guests: Number,
    note: String,
    date:{
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('HotelBooking', HotelBookingSchema)   /// ??