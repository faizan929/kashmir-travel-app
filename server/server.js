

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Hotel')
require('./models/Cab')



// cors ????

require('dotenv').config();

const app = express()   

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/hotels', require('./routes/hotels'))
app.use('/api/cabs', require('./routes/cabs'))
app.use('/api/hotel-bookings', require('./routes/hotelBookingRoute'))
app.use('/api/cab-bookings', require('./routes/cabBookingRoute')) 


mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen( 5000, () => {
            console.log("Server is running at 5000");
        });
    })
    .catch(err => console.error(err));