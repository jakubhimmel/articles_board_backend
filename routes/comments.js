const express = require("express");
const Comment = require("./../models/comment"); // Import of the model Recipe from './models/Recipe'
const User = require("./../models/user"); // Import of the model Recipe from './models/Recipe'
const Article = require("./../models/article"); // Import of the model Recipe from './models/Recipe'
const router = express.Router();

router.post("/:articleId/create", async(req, res, next) => {
    const { articleId } = req.params;


    const comment = {
        title: req.body.title,
        text: req.body.text,
        ownerId: req.session.currentUser._id,
        ownerName: req.session.currentUser.username
    };

    try {
        const newComment = await Comment.create(comment);

        await Article.findByIdAndUpdate(articleId, {
            $push: { comments: newComment._id }
        });

        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
});

router.put("/:articleId/delete", async(req,res,next) => {
    const { articleId } = req.params;

    try {
        const userId = req.session.currentUser._id;
        const commentById = await Comment.findByIdAndDelete(articleId);
        const updatedUser = await User.findByIdAndUpdate(
            userId, { $pull: { comments: id } }, { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }

}

)

module.exports = router;