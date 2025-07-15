

const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');


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

module.exports = router;