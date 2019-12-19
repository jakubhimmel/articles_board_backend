const express = require("express");
const Article = require("./../models/article"); // Import of the model Recipe from './models/Recipe'
const Topic = require("./../models/topic"); // Import of the model Recipe from './models/Recipe'
const User = require("./../models/user"); // Import of the model Recipe from './models/Recipe'
const router = express.Router();

router.post("/create", async(req, res, next) => {
    // const { title, text } = req.body;
    const article = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        text: req.body.text,
        topic: req.body.topic
    };

    if (article.description === undefined) {
        article.description = article.text.slice(0, 200)
    }



    try {
        const newArticle = await Article.create(article);
        /// push the article in the corresponding topic in  the topic collection


        const articleInTopic = await Topic.findOneAndUpdate({ name: newArticle.topic }, {
            $push: { articles: newArticle._id }



        }, { new: true })


        const userId = req.session.currentUser._id;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: { articles: newArticle._id }
        });

        res.status(200).json(newArticle);
    } catch (error) {
        next(error);
    }
});

router.get("/", async(req, res, next) => {

    try {
        const allArticles = await Article.find();
        res.status(200).json(allArticles);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async(req, res, next) => {
    const { id } = req.params;


    try {
        const articleById = await Article.findById(id).populate('comments').populate('owner');
        res.status(200).json(articleById);

    } catch (error) {
        next(error);
    }

});

router.get("/by-name/:name", async(req, res, next) => {
    const { name } = req.params;



    try {
        const articleByNameResult = await Article.find({ title: { '$regex': name, '$options': 'i' } });
        res.status(200).json(articleByNameResult);

    } catch (error) {
        next(error);
    }

});


router.delete("/:id/delete", async(req, res, next) => {
    const { id } = req.params;

    try {
        const userId = req.session.currentUser._id;
        const articleById = await Article.findByIdAndDelete(id);
        const updatedUser = await User.findByIdAndUpdate(
            userId, { $pull: { articles: id } }, { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.get('/topics/:name', async(req, res, next) => {

    const { name } = req.params

    try {
        const topicByName = await Topic.findOne({ name }).populate('articles')

        res.status(200).json(topicByName)
    } catch (error) {
        next(error);
    }

})

router.put('/:id/vote', async(req, res, next) => {
    const { id } = req.params
    const { newScore } = req.body


    try {
        const scoreUpdate = await Article.findByIdAndUpdate(id, { score: newScore }, { new: true }).populate('comments');
        res.status(200).json(scoreUpdate)
        console.log('\n\nid >>>\n', scoreUpdate);

    } catch (error) {
        next(error);

    }
})


// router.get('/:topic', async(req, res, next) => {
//     const { topic } = req.params;
//     const topic = article;

//     try {
//         const articleByTopic = await Article.findById(topic)
//         res.status(200).json(articleByTopic)
//     } catch (error) {
//         next(error);
//     }
// })

module.exports = router;