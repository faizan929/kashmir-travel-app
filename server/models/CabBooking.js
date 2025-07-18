

const mongoose = require("mongoose")

const cabBookingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cabId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cab",
        required: true,
    },
    phone: String,
    pickupLocation: String,
    dropLocation: String,
    date: Date,
    time: String,
    cabType: String,
    note: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    

});

module.exports = mongoose.model("CabBooking", cabBookingSchema)