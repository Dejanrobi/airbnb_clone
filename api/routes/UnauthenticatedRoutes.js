const express = require('express');
const router = express.Router();

// importing the controller functions
const { getAllPlaces, getASinglePlace } = require('../controllers/UnauthenticatedControllers')


// setting the routes
router.route('/all-places').get(getAllPlaces);
router.route('/get-a-single-place/:id').get(getASinglePlace);


module.exports = router;