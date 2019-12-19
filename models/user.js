const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    bio: String,
    email: String,
    password: String,
    following: [],
    favorite: [],
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;