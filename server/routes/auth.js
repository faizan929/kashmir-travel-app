
const express = require('express');
const router =  express.Router();
const authMiddleware = require('../middleware/authMiddleware')

const {register, login} = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login)

// Protected Route

router.get('/me', authMiddleware, (req, res) => {
     res.json({ message: "You are authorized", user: req.user })
});


module.exports = router;