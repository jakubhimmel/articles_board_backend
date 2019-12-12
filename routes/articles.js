const express = require('express');
const Article = require('./../models/article'); // Import of the model Recipe from './models/Recipe'
const User = require('./../models/user'); // Import of the model Recipe from './models/Recipe'
const router = express.Router();

router.post('/create', async(req, res, next) => {
    // const { title, text } = req.body;
    const article = {
        title: req.body.title,
        text: req.body.text
    }

    try {
        const newArticle = await Article.create(article)
        const userId = req.session.currentUser._id
        console.log("New Article:", newArticle._id);

        const testUser = await User.findByIdAndUpdate(userId, { $push: { articles: newArticle._id } });

        res.status(200).json(newArticle)

    } catch (error) {
        next(error);
    }
})

router.get('/', async(req, res, next) => {
    console.log("Current User:", req.session.currentUser);

    try {
        const allArticles = await Article.find()
        res.status(200).json(allArticles)
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;

    try {
        const articleById = await Article.findById(id)
        res.status(200).json(articleById)
    } catch (error) {
        next(error);
    }
})

router.get('/:id/delete', async(req, res, next) => {
    const { id } = req.params;

    try {
        const articleById = await Article.findByIdAndDelete(id)
        res.status(200).json(articleById)
    } catch (error) {
        next(error);
    }
})



module.exports = router;