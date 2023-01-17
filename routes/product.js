const express = require("express");
const router = express.Router();
const getuser = require("../middleware/getuser");
const upload = require("../middleware/fileUpload");
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct , getProductsByUser } = require("../controllers/productController");


router.route("/").get(getProducts);
router.route("/user").get(getuser, getProductsByUser);
router.route("/:id").get(getProductById);
router.route("/create").post(getuser, upload.array("photos"), createProduct);
router.route("/update/:id").put(updateProduct);
router.route("/delete/:id").delete(deleteProduct);

module.exports = router;
