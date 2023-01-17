const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const slugify = require('slugify');

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (req.file !== undefined) {
        const url = req.protocol + '://' + req.get('host')
        var photo = url + '/uploads/images/' + req.file.filename;
    }
    else {
        var photo = url + '/uploads/images/placeholder.png'
    }

    const slug = slugify(name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });

    const category = new Category({
        name, slug, photo
    });
    const createdCategory = await category.save();
    res.status(201).json({ message: 'Category created successfully', createdCategory });
}
);


const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    if (category) {
        category.name = name;
        category.slug = slugify(name, {
            lower: true
        });
        const updatedCategory = await category.save();
        res.status(201).json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
}
);


const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        const removedCat = await category.remove();
        res.json(removedCat);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});


const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
}
);


const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        res.json(category);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
}
);

module.exports = { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById };