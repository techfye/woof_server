const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const TagsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

TagsSchema.plugin(autoIncrement.plugin, {
    model: "Tag",
    field: "id",
    startAt: 1,
    incrementBy: 1
});

const Tag = mongoose.model("Tag", TagsSchema);
module.exports = Tag;