const express = require('express');
const Article = require('./../models/article'); // Import of the model Recipe from './models/Recipe'
const User = require('./../models/user'); // Import of the model Recipe from './models/Recipe'
const Topic = require('./../models/topic'); // Import of the model Recipe from './models/Recipe'
const router = express.Router();

// router.get('/:name', async(req, res, next) => {
//     const { name } = req.params;

//     try {
//         const topicById = await Topic.findOne({ name }).populate('articles')
//         res.status(200).json(topicById)
//     } catch (error) {
//         next(error);
//     }

// })



module.exports = router;