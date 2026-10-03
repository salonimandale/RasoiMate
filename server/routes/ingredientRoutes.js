const express = require("express");
const multer = require("multer");

const {
    detectIngredients
} = require("../controllers/ingredientController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/detect",
    protect,
    upload.single("image"),
    detectIngredients
);

module.exports = router;