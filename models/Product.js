const { default: mongoose } = require("mongoose")
var autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
    skuNumber: {
        type: String,
        required: true
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        }
    ],
    price: {
        type: Number,
        required: true
    },
    reviews: {
        type: Array
    },
    images: {
        type: Array,
    },
    stock: {
        type: Number,
        required: true
    },
    itemWeight: {
        type: Number,
    },
    manufacturer: {
        type: String,
    },
    countryOfOrigin: {
        type: String,
    },
    itemModelNumber: {
        type: String,
    },
    brandName: {
        type: String,
    },
    directions: {
        type: String,
    },
    size: {
        type: String,
    },
    careInstructions: {
        type: String,
    },
    specificUses: {
        type: String,
    },
    specialIngredients: {
        type: String,
    },
    breedRecomandation: {
        type: String,
    },
    modelName: {
        type: String,
    },

}, {
    timestamps: true
});

ProductSchema.plugin(autoIncrement.plugin, {
    model: 'Product',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});



const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;