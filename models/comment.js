const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    subject: String,
    title: String,
    text: String,
    ownerId: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    ownerName: String


}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;