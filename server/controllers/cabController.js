
const Cab = require("../models/Cab");

const createCab = async (req, res) => {
    try {
        const newCab = new Cab(req.body);
        const savedCab = await newCab.save();
        res.status(201).json(savedCab);
    } catch (err) {
        res.status(500).json({ error: "Failed to add cab" });
    }
};

const getAllCabs = async (req, res) => {
    try {
        const cabs = await Cab.find();
        res.status(200).json(cabs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cabs" });
    }
};

const updateCab = async (req, res) => {
    try {
        const updatedCab = await Cab.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCab);
        
       
    }catch(error ){
        res.status(500).json({message: "Failed to update the cab", error});
    }
};


const deleteCab = async (req, res) => { 
    try {
        await Cab.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Cab deleted successfully"})    
    }catch(error){
        res.status(500).json({message: "Failed to delete the cab"})
    }
    
};

module.exports = { createCab, getAllCabs, updateCab, deleteCab };
