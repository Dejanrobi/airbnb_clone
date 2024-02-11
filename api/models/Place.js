require("dotenv").config();
const mongoose = require('mongoose');

// Creating the place schema

const PlaceSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},    
    title: String,
    address: String,
    photos: [String],
    description: String, 
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number
});


const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;