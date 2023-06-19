const express = require('express');
const router = express.Router();

const {Landmark, Location, Image} = require('../models');

const jwt = require("../services/jwt");
const {authenticateAdmin} = require('../services/authenticate')

const upload = require('../services/multer');

router.post('/addLandmark',authenticateAdmin ,upload.single('image'), async(req, res)=>{

    try{
        const newLocation = await Location.build({
            lat: req.body.lat, 
            long: req.body.long
        })

        const newImage = await Image.build({
            image: req.file.path
        })

        await newImage.save();
        await newLocation.save()
        if(newLocation && newImage) {
            
            const newLandmark = await Landmark.create({
                title: req.body.title,
                description: req.body.description,
                image_id: newImage.id,
                location_id: newLocation.id
            })

            if (newLandmark){
                console.log("user", req.user)
                res.status(200).json({message: "Landmark added successfully"});
            }
        }
    }catch{
        res.status(500).json({error: "error"})
    }
})


module.exports = router
