require("dotenv").config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// importing the routes
const authRouter = require('./routes/auth');
const placesRouter = require('./routes/Places')
const unAuthenticatedRouter = require('./routes/UnauthenticatedRoutes');
const BookingsRouter = require('./routes/Bookings');

// authentication middleware
const authenticationMiddleware = require('./middleware/authentication');


// invoking express
const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://airbnb-clone-frontend-m6np.onrender.com'
];

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        // Check if the origin is in the allowedOrigins array or if it's undefined (for localhost)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


// patching all json
app.use(express.json())

// access all files in the uploads folder
app.use('/uploads', express.static(__dirname+'/uploads'));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/places', authenticationMiddleware, placesRouter);
app.use('/api/v1/bookings', authenticationMiddleware, BookingsRouter);

app.use('/api/v1', unAuthenticatedRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);







const PORT = process.env.PORT || 8000;

// starting the server
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)

        app.listen(PORT, ()=>{
            console.log(`Server is listening to port: ${PORT}`);
        })
    } catch (error) {
        console.log(error)
        
    }

}


start();