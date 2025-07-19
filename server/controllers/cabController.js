
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

module.exports = { createCab, getAllCabs };
