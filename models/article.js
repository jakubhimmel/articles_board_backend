const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    image: String,
    text: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;