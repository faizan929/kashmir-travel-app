

const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware')
const Hotel = require('../models/Hotel')
const Cab = require('../models/Cab')


router.post('/', async(req, res) => {
    try {
        const { userId, itemId, itemType, checkInDate, checkOutDate, guests, note } = req.body; 

        if( !userId || !itemId || !itemType) {
            return res.status(400).json({message: "Missing required fields." });
        } 

        const newBooking = new Booking({
            userId,
            itemId, 
            itemType,
            checkInDate,
            checkOutDate,
            guests,
            note,
        });


        await newBooking.save();

        return res.status(201).json({message: "Booking successful.", booking: newBooking });  
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Error creating booking. "});

    }
});


router.get('/my-hotels', authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({
            userId: req.user._id,
            itemType: "hotel",
        }).populate('itemId');
        res.json(bookings);
    } catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to fetch the bookings."})
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('itemId');
        res.json(bookings);
    } catch(err){
        console.error(err);
        res.status(500).json({ message:"Failed to fetch the bookings."});
    }
});

module.exports = router;