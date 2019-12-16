const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    name: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;