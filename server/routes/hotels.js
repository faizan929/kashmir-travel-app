

const express = require('express');
const router = express.Router();

const Hotel = require('../models/Hotel');


router.post('/', async (req, res) => {
    try{
        const newHotel = new Hotel(req.body);
        await newHotel.save();
        res.status(201).json({message:'Hotel added successfully', hotel: newHotel });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error adding hotel'});
    }
});

router.get('/', async(req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    }catch(error){
        console.error(error);
            res.status(500).json({message: 'Error fetching hotels.'});
        }
    });


module.exports = router 