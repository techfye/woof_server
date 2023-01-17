const asyncHandler = require("express-async-handler");
const Tags = require("../models/Tags");
const slugify = require("slugify");

// get all tags

const getTags = asyncHandler(async (req, res) => {
    const tags = await Tags.find({});
    res.json(tags);
    });

// add tag

const addTag = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name, {
        lower: true
    });
    const tag = new Tags({
        name,
        slug
    });
    const createdTag = await tag.save();
    res.json(createdTag);
});


// delete tag   
const deleteTag = asyncHandler(async (req, res) => {
    const tag = await Tags.findById(req.params.id);
    if (tag) {
        await tag.remove();
        res.json({ message: 'Tag removed successfully', type: 'success' });
    }
    else {
        res.json({ message: 'Tag not found', type: 'warning' });
    }
});

// edit tag

const editTag = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name, {
        lower: true
    });
    const tag = await Tags.findById(req.params.id);
    if (tag) {
        tag.name = name;
        tag.slug = slug;
        const updatedTag = await tag.save();
        res.json({ message: 'Tag updated successfully', type: 'success', updatedTag });
    }
    else {
        res.status(404);
        throw new Error('Tag not found');
    }
});



module.exports = { getTags, addTag, deleteTag, editTag };