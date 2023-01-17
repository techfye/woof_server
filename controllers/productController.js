const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Category = require('../models/Category');
const slugify = require('slugify');


// get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('tags').populate('category');

    res.json(products);
});


// get product by id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// create product
const createProduct = asyncHandler(async (req, res) => {
    const { name, category, description, information, skuNumber, tags, price, reviews, stock, itemWeight, manufacturer, countryOfOrigin, itemModelNumber, brandName, directions, size, careInstructions, specificUses, specialIngredients, breedRecomandation, modelName
    } = req.body;
    const images = [];
    const url = req.protocol + '://' + req.get('host')
    if (req.files !== undefined) {
        for (var i = 0; i < req.files.length; i++) {
            images.push(url + '/uploads/images/' + req.files[i].filename)
        }
    }
    else {
        images.push(url + '/uploads/images/placeholder.png')
    }

    const user = req.user.id;
    const slug = slugify(name, {
        lower: true
    });
    const productCat = await Category.findById(category);
    const product = new Product({
        user, name, slug, category, description, information, skuNumber, tags, price, reviews, images, stock, itemWeight, manufacturer, countryOfOrigin, itemModelNumber, brandName, directions, size, careInstructions, specificUses, specialIngredients, breedRecomandation, modelName
    });
    const savedProduct = await product.save();

    savedProduct.category = productCat;
    res.status(201).json(savedProduct);
});

// update product

const updateProduct = asyncHandler(async (req, res) => {
    const { user, name, category, description, information, skuNumber, tags, price, reviews, images, stock, itemWeight, manufacturer, countryOfOrigin, itemModelNumber, brandName, directions, size, careInstructions, specificUses, photos, specialIngredients, breedRecomandation, modelName } = req.body;



    if (user === req.user.id) {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name;
            product.slug = slugify(name, {
                lower: true
            });
            product.category = category;
            product.description = description;
            product.information = information;
            product.skuNumber = skuNumber;
            product.tags = tags;
            product.price = price;
            product.reviews = reviews;
            product.images = images;
            product.stock = stock;
            product.itemWeight = itemWeight
            product.manufacturer = manufacturer;
            product.countryOfOrigin = countryOfOrigin;
            product.itemModelNumber = itemModelNumber;
            product.brandName = brandName;
            product.directions = directions;
            product.size = size;
            product.careInstructions = careInstructions;
            product.specificUses = specificUses;
            product.specialIngredients = specialIngredients;
            product.breedRecomandation = breedRecomandation;
            product.modelName = modelName;
            const updatedProduct = await product.save();
            res.json({ message: 'Product updated successfully', type: 'success', updatedProduct });
        }
        else {
            res.status(404);
            throw new Error('Product not found');
        }
    }
    else {
        res.status(401);
        throw new Error('You are not authorized to update this product');
    }

});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed successfully', type: 'success' });
    }
    else {
        res.json({ message: 'Product not found', type: 'warning' });
    }
});

// get products by user
const getProductsByUser = asyncHandler(async (req, res) => {
    const pageNo = parseInt(req.query.pageNo) || 1;
    const size = parseInt(req.query.pageSize) || 10;
    const query = {};
    if (pageNo < 0 || pageNo === 0) {
        response = { error: true, message: 'invalid page number, should start with 1' };
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    const products = await Product.find({ user: req.params.user }, {}, query);
    if (products) {
        res.json(products);
    }
    else {
        res.json({ message: 'No products found for this user', type: 'warning' });
    }
});


module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByUser };