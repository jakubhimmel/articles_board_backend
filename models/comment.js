const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    subject: String,
    text: String,
    owner: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;