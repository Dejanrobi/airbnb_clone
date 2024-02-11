const PlaceModel = require('../models/Place');
const { StatusCodes }  = require('http-status-codes');


const getAllPlaces=async(req, res)=>{

    // get all the places
    const allPlaces = await PlaceModel.find({});

    res.status(StatusCodes.OK).json(allPlaces)
    // res.json({"msg":"all places gotten"})

}

const getASinglePlace= async(req, res)=>{
    const { id } = req.params;

    const getPlace = await PlaceModel.findById(id)

    res.status(StatusCodes.OK).json(getPlace)
}


module.exports = {
    getAllPlaces,
    getASinglePlace
}