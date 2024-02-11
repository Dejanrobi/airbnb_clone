
const imageDownloader = require('image-downloader');
const { NotFoundError } = require('../errors/index')

// importing status codes
const { StatusCodes }  = require('http-status-codes');
const path = require('path');

const fs = require('fs');

// Place Model
const PlaceModel = require('../models/Place')



// places controllers

const uploadByLink= async(req, res)=>{
    // console.log(req.user)
    const { link } = req.body
    // console.log(link)
    
    const newName ='photo' + Date.now() + '.jpg'
    

    await imageDownloader.image({
        url: link,
        // dest: __dirname + '../uploads/' +newName
        dest: path.join(__dirname, '..', 'uploads', newName)
    })
    
    res.status(StatusCodes.OK).json(newName);
}




const uploadFile=(req, res)=>{

    // these are files already uploaded
    const uploadedFiles = [];
    for (let i=0; i<req.files.length; i++){
        // getting the new path of the file and the original name (has been uploaded with multer)
        // it has a new path, we need the original name to get the file extension and append it to the new path
        const { path, originalname } = req.files[i];
        // splitting the original name in order to get the image extension
        const parts = originalname.split('.');
        // getting the extension (which will be the last item in the array)
        const ext = parts[parts.length - 1];

        // adding the extension to the new file's path
        const newPath = path + '.' + ext;
        // changing the path of the file with the new path
        fs.renameSync(path, newPath);

        // setting the uploaded files in order to return them with their new paths only names without paths
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.status(StatusCodes.OK).json(uploadedFiles)
    // res.json(req.files)

}

const addMyAccommodations= async(req, res)=>{
    // res.json({"successMessage":"Places Form Data Submitted Successfully"})
    // the current user is placed in the req.user

    const currentUser = req.user;
    // userId
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price  } = req.body;
    const placeDoc = await  PlaceModel.create({
        owner: currentUser.userId,
        title,
        address,
        photos:addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    })


    res.status(StatusCodes.OK).json(placeDoc)
}


const getMyAccommodations=async (req, res)=>{
    const { userId } = req.user

    // find accommodations whose owner is equal to the userId
    const myAccommodations = await PlaceModel.find({owner:userId})

    res.status(StatusCodes.OK).json(myAccommodations);
}


const getSingleAccommodation= async(req, res)=>{
    const { id:productId } = req.params;
    const singleAccommodation = await PlaceModel.findById({_id:productId})
    
    res.status(StatusCodes.OK).json(singleAccommodation)
}


const editSingleAccommodation=async(req, res)=>{
    const { id:accommodationId } = req.params;
    const { userId } = req.user

    const {
        
        title,
        address,
        addedPhotos:photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price

    } = req.body

    const editAccommodation ={
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price

    }

    const accommodation = await PlaceModel.findByIdAndUpdate({_id:accommodationId, owner:userId}, editAccommodation, {new:true, runValidators:true})

    if(!accommodation){
        throw new NotFoundError(`No Accommodation with Id: ${accommodationId}`)
    }

    res.status(StatusCodes.OK).json(accommodation)
    // console.log(editAccommodation)
}


module.exports ={
    uploadByLink,
    uploadFile,
    addMyAccommodations,
    getMyAccommodations,
    getSingleAccommodation,
    editSingleAccommodation
}