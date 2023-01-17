const express = require("express");
const router = express.Router();
const { AddOrder } = require("../controllers/orderController");

router.route("/").post(AddOrder);

module.exports = router;