const express = require('express');
const router = express.Router();
const multer = require('multer')
// const authenticationMiddleware = require('../middleware/authentication')

// import controllers
const { uploadByLink, uploadFile, addMyAccommodations, getMyAccommodations, getSingleAccommodation, editSingleAccommodation } = require('../controllers/Places');

// setting the routes
router.route('/upload-by-link').post(uploadByLink);

// using multer middleware
const photosMiddleware = multer({dest:'uploads'});

// we pass the middleware
//'photos' is the name of the passed files as named in the front end
//100: max-no of files
// this middleware also sets the form's data i.e path and original path and then uploads it.
// it uploads the file and gives it a new file path.
router.route('/upload-file').post(photosMiddleware.array('photos', 100) ,uploadFile)


// submit form data
router.route('/my-accommodations').post(addMyAccommodations).get(getMyAccommodations)

// get a single accommodation
router.route('/my-accommodations/:id').get(getSingleAccommodation).patch(editSingleAccommodation);

module.exports = router;