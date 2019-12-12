const express = require('express');
const Article = require('./../models/article'); // Import of the model Recipe from './models/Recipe'
const User = require('./../models/user'); // Import of the model Recipe from './models/Recipe'
const router = express.Router();

router.put('/:id/settings', async(req, res, next) => {
    const { id } = req.session.currentUser

    try {
        const userId = req.session.currentUser._id

        const settingsById = await Article.findByIdAndUpdate(userId)
        res.status(200).json(settingsById)
    } catch (error) {
        next(error);
    }

})


module.exports = router;