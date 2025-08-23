
const User = require("../models/User");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.register = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully "});
    }catch(err){
        console.error(err)
        res.status(500).json({ message: "Registration failed", error: err.message })
    }
};


exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found"});

        const isMatch = await bcrypt.compare( password, user.password);
        if (!isMatch) return res.status(400).json({ message : "Invalid credentials" });

        const token = jwt.sign( { _id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });


        res.json({ 
            token, 
            user: 
            { _id: user._id, 
                name:user.name, 
                email: user.email,
                isAdmin: user.isAdmin
            }  
        });
        
    }catch(err){ 
        res.status(500).json({ error: "Login failed"})
    }
};