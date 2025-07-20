

const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');

const {createCab, getAllCabs, updateCab, deleteCab} = require('../controllers/cabController')


router.post("/", createCab)
router.get("/", getAllCabs)
router.put("/:id", updateCab);
router.delete("/:id", deleteCab);




module.exports = router ;
