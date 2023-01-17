const express = require("express");
const router = express.Router();

const { getTags, addTag, deleteTag, editTag } = require("../controllers/tagsController");

router.get("/", getTags).post("/", addTag);
router.delete("/:id", deleteTag).put("/:id", editTag);

module.exports = router;