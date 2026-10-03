const express = require("express");

const {
    generateRecipe,
    saveRecipe,
    getMyRecipes,
    getRecipeById,
    translateRecipe,
    deleteRecipe
} = require("../controllers/recipeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// GET ALL SAVED RECIPES
// =====================================================

router.get(
    "/",
    protect,
    getMyRecipes
);


// =====================================================
// GENERATE RECIPE
// =====================================================

router.post(
    "/generate",
    protect,
    generateRecipe
);


// =====================================================
// SAVE RECIPE
// =====================================================

router.post(
    "/save",
    protect,
    saveRecipe
);


// =====================================================
// TRANSLATE SAVED RECIPE
// =====================================================

router.post(
    "/translate/:id",
    protect,
    translateRecipe
);


// =====================================================
// GET SINGLE RECIPE
// =====================================================

router.get(
    "/:id",
    protect,
    getRecipeById
);


// =====================================================
// DELETE RECIPE
// =====================================================

router.delete(
    "/:id",
    protect,
    deleteRecipe
);


module.exports = router;