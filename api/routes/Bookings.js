const express = require('express');

const router = express.Router();

// import controllers

const { bookAPlace,getMyBookings, getASingleBooking  } = require('../controllers/Bookings');



// setting the routes
router.route('/book-a-place').post(bookAPlace).get(getMyBookings);
router.route('/get-single-booking/:id').get(getASingleBooking);


module.exports = router;