const BookingsModel = require('../models/Bookings');
const { StatusCodes }  = require('http-status-codes');

const bookAPlace=async(req, res)=>{
    const {userId} = req.user;

    const {placeId, checkIn, checkOut, numberOfGuests, name, email, price} = req.body

    const bookingData ={
        placeId, 
        userId,
        checkIn, 
        checkOut, 
        numberOfGuests, 
        name, 
        email, 
        price
    }

    const booking = await BookingsModel.create(bookingData);

    res.status(StatusCodes.OK).json(booking)

    

}

const getMyBookings=async(req, res)=>{

    const { userId } = req.user;

    const myBookings = await BookingsModel.find({userId:userId}).populate('placeId')

    res.status(StatusCodes.OK).json(myBookings)
}

const getASingleBooking=async(req, res)=>{
    const {userId} = req.user;

    const { id:bookingId } = req.params;

   
    const singleBooking = await BookingsModel.findById({_id:bookingId}).populate('placeId')

    res.status(StatusCodes.OK).json(singleBooking);
}


module.exports ={
    bookAPlace,
    getMyBookings,
    getASingleBooking
}