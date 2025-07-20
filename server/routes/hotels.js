

const express = require('express');
const router = express.Router();

const Hotel = require('../models/Hotel');
const { createHotel, getAllHotels, updateHotel, deleteHotel} = require('../controllers/hotelController');



router.post("/", createHotel)
router.get("/", getAllHotels)
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel)



module.exports = router 