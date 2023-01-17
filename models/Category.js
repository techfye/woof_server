const { default: mongoose } = require("mongoose")
const autoIncrement = require("mongoose-auto-increment");
const { Schema } = mongoose;
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

CategorySchema.plugin(autoIncrement.plugin, {
    model: "Category",
    field: "id",
    startAt: 1,
    incrementBy: 1
});


const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;