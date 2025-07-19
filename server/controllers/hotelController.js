

const Hotel = require("../models/Hotel")


const createHotel = async (req, res) => {
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel)
    } catch(error){
        res.status(500).json({message: "Failed to add hotel", error})

    }
};


const getAllHotels = async (req, res) => {

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    }catch(error){
        res.status(500).json({message: "Failed to fetch hotels", error })
    }
};


module.exports = {createHotel, getAllHotels}