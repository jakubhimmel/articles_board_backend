const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    image: String,
    text: String,
    topic: {
        type: String,
        enum: [
            "future",
            "politics",
            "technology",
            "health",
            "zero-waste",
            "culture",
            "food",
            "design"
        ]
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;