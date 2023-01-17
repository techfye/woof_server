const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    const userExists = await User.findOne({
        email
    });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedpassword
    });
    if (user) {
        res.status(201).json({
            token: generateToken(user._id),
            name : user.name,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
            name : user.name,
        });
    } else {
        res.status(401);
        res.json({"error" : "Invalid email or password"});
    }
});

const editUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        address,
        phone,
        isStudent
    } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        user.address = address;
        user.phone = phone;
        user.isStudent = isStudent;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        await user.remove();
        res.json({
            message: "User removed"
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getAdminbytoken = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (user.isAdmin === true ) {
        res.json({auth : true});
    } else {
        res.json({auth : false});
    }
});




module.exports = {
    registerUser,
    loginUser,
    editUser,
    deleteUser,
    getUser,
    getAdminbytoken
};