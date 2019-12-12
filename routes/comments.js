const express = require('express');
const Comment = require('./../models/comment'); // Import of the model Recipe from './models/Recipe'
const User = require('./../models/user'); // Import of the model Recipe from './models/Recipe'
const Article = require('./../models/article'); // Import of the model Recipe from './models/Recipe'
const router = express.Router();



router.post('/:articleId/create', async(req, res, next) => {
    const { articleId } = req.params;

    const comment = {
        subject: req.body.subject,
        text: req.body.text,
        owner: req.session.currentUser._id
    }

    try {
        const newComment = await Comment.create(comment)
            // const userId = req.session.currentUser._id

        await Article.findByIdAndUpdate(articleId, { $push: { comments: newComment._id } });





        // console.log("Test :", testComment);


        res.status(200).json(newComment)





    } catch (error) {
        next(error);
    }
})

module.exports = router;