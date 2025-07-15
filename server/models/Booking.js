

const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ///??
        ref: "User",
        required: true
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,   // ???
        required: true
    },
    itemType:{
        type: String,
        enum: ["hotel", "cab"], /// ??
        required: true
    },
    checkInDate:{
        type: Date,
    },
    checkOutDate:{
        type: Date,
    },
    guests:{
        type: Number,
    },
    note: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Booking', bookingSchema)   /// ??