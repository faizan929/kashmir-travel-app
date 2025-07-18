
const express = require("express");
const router = express.Router();
const CabBooking = require("../models/CabBooking")



router.post("/book-cab", async (req, res) => {
    try {
        const {
            userId,
            cabId,
            phone,
            pickupLocation,
            dropLocation,
            date,
            time,
            cabType,
            note
        } = req.body;
        if (!userId || !pickupLocation || !dropLocation || !date || !time) {
            return res.status(400).json({ message: "Missing required fields."});
        }


        const newBooking = new CabBooking({
            userId,
            cabId,
            phone,
            pickupLocation,
            dropLocation,
            date,
            time,
            cabType,
            note
        });
        await newBooking.save();
        res.status(201).json({ message: "Cab booked successfully.", booking: newBooking });
    }catch(error) {
        console.error(error);
        res.status(500).json({ message: "Failed to book cab."})
    }

});

module.exports = router