

const { trusted } = require("mongoose");
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

const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedHotel);
       
    }catch(error ){
        res.status(500).json({message: "Failed to update the hotel", error});
    }
};

const deleteHotel = async (req, res) => { 
    try {
        await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Hotel deleted successfully"})    
    }catch(error){
        res.status(500).json({message: "Failed to delete the hotel"})
    }
    
}


module.exports = { createHotel, getAllHotels, updateHotel, deleteHotel }