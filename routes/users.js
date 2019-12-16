const express = require('express');
const Article = require('./../models/article'); // Import of the model Recipe from './models/Recipe'
const User = require('./../models/user'); // Import of the model Recipe from './models/Recipe'
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require('../helpers/middlewares');


isLoggedIn,
router.post('/:id/settings', isLoggedIn, async(req, res, next) => {
    const { email, password } = req.body;
    console.log({ email, password });

    const { _id } = req.session.currentUser

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);

    try {
        // const userId = req.session.currentUser._id

        const updatedUser = await User.findByIdAndUpdate(_id, { email, password: hashPass }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error);
    }

})


module.exports = router;