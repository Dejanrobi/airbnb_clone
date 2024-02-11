require("dotenv").config();
const mongoose = require('mongoose');


// bookings schema
const BookingsSchema = new mongoose.Schema({
    placeId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    checkIn: {type:Date, required:[true, 'Please set your Check In']},
    checkOut: {type:Date, required:[true, 'Please set your Check Out']},
    name: {type:String, required: [true, 'Please provide a name']},
    email:{
        type: String,
        required: [true, 'Please provide an email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        
    },
    price: Number
})


// exporting the model
module.exports = mongoose.model("Bookings", BookingsSchema)