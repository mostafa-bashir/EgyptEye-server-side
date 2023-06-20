const express = require('express');
const router = express.Router();

const {Landmark, Search} = require('../models');
const {authenticateUser} = require('../services/authenticate');
const { Op } = require('sequelize');
const createUploadMiddleware = require('../services/multer');
const upload = createUploadMiddleware('searchesImages');

router.get('/landmark', authenticateUser, async(req,res)=>{
    
    try{
        let whereQuery = {};
        
        if (req.query.search) {
            whereQuery = {
                where: {
                    title: {
                        [Op.like]: `%${req.query.search}%`
                    }
                }
            };
        }

        let query = {
            attributes: ['id','title'],
            ...whereQuery //... is used to to spread the whereQuery in the query
        };
        const landmarks = await Landmark.findAll(query);
        console.log(landmarks)
        res.status(200).json({landmarks});
    }catch{
        res.json(500).json({message: 'server internal error'});
    }
})

router.get('/getlandmark', authenticateUser, async(req, res)=>{
    try{
        const landmark = await Landmark.findByPk(req.query.id, {
            include: ['image', 'location']
        })
        if (landmark){
            Search.create({
                person_id: req.user.id,
                landmark_id: landmark.id
            })
            res.status(200).json({landmark})
        }else{
            res.status(404).json({message: 'not found'})
        }
    }catch{
        res.status(500).json({message: 'error'})
    }
})

router.get('/getlandmark/image', authenticateUser, upload.single('image'), async(req,res)=>{
    res.send(req.file.path);
    // Logic of integration with the model should be here
    // Then need to add histroy as the upper endpoint
})

router.get('/gethistory', authenticateUser, async(req,res)=>{
    
    try{
        const landmarks = await Search.findAll({
            where: {
                person_id: req.user.id
            },
            include: ['landmarks'],
            attributes: []
        })
        res.status(200).json({landmarks})
    }catch{
        res.status(500).json({message: 'error'})
    }
})

module.exports = router;