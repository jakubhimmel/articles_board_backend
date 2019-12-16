const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./../models/topic')

const topics = [
    { name: 'future', articles: [] },
    { name: 'politics', articles: [] },
    { name: 'technology', articles: [] },
    { name: 'health', articles: [] },
    { name: 'zero-waste', articles: [] },
    { name: 'culture', articles: [] },
    { name: 'food', articles: [] },
    { name: 'design', articles: [] }
]


// MONGOOSE CONNECTION
mongoose
    .connect('mongodb://localhost:27017/articles-board', {
        keepAlive: true,
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
    })
    .then(() => {
        console.log(`Connected to database`)
        Topic.insertMany(topics)
            .then(() => {
                mongoose.connection.close()
            })
    })
    .catch((err) => console.error(err));