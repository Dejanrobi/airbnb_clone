const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/authentication');

// importing the controller function
const { register, login, profile } = require('../controllers/auth')

// setting the routes
router.post('/register', register);
router.post('/login', login);
router.route('/profile').get(authenticationMiddleware, profile)

// exporting the router
module.exports  = router;
