

const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');


router.post('/', async (req, res) => {
    try {
        const newCab = new Cab(req.body);
        await newCab.save()
        res.status(201).json({message: 'Cab added successfully.'});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error adding cab.'});
    }
});

module.exports = router ;

router.get('/', async (req, res) => {
    try {
        const cabs = await Cab.find();
        res.json(cabs);

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error fetching cabs.'})
        }
});

