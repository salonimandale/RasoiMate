const OpenAI = require("openai");
const Recipe = require("../models/Recipe");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// =====================================================
// GENERATE RECIPE
// =====================================================

const generateRecipe = async (req, res) => {
    try {

        const {
            ingredients,
            language = "English"
        } = req.body;


        // Validate ingredients

        if (
            !ingredients ||
            !Array.isArray(ingredients) ||
            ingredients.length === 0
        ) {
            return res.status(400).json({
                message:
                    "Please provide at least one ingredient"
            });
        }


        // Allow only supported languages

        const supportedLanguages = [
            "English",
            "Hindi",
            "Marathi"
        ];

        if (
            !supportedLanguages.includes(language)
        ) {
            return res.status(400).json({
                message:
                    "Unsupported recipe language"
            });
        }


        const ingredientList =
            ingredients.join(", ");


        // =====================================================
        // AI RECIPE GENERATION
        // =====================================================

        const response =
            await client.responses.create({

                model: "gpt-6-luna",

                input: `
You are a helpful cooking assistant.

Create one practical recipe using these available ingredients:

${ingredientList}

The user wants the recipe in this language:

${language}


Return ONLY valid JSON in exactly this format:

{
    "title": "Recipe Name",
    "description": "Short description of the recipe",
    "ingredients": [
        {
            "name": "Egg",
            "quantity": "2"
        }
    ],
    "instructions": [
        "Step 1",
        "Step 2",
        "Step 3"
    ],
    "cookingTime": "30 minutes",
    "servings": "2"
}


Rules:

- Generate the complete recipe in ${language}.
- The title must be in ${language}.
- The description must be in ${language}.
- Ingredient names must be in ${language}.
- Cooking instructions must be in ${language}.
- Cooking time and quantities can use normal numerical units.
- Use the provided ingredients as the main ingredients.
- You may include common basic ingredients such as salt, oil and water.
- Give realistic quantities.
- Give clear step-by-step instructions.
- Keep the recipe suitable for a home kitchen.
- Return ONLY valid JSON.
                `
            });


        console.log(
            "Recipe AI Response:",
            response.output_text
        );


        // =====================================================
        // PARSE AI RESPONSE
        // =====================================================

        let recipe;

        try {

            recipe = JSON.parse(
                response.output_text
            );

        } catch (error) {

            console.error(
                "Recipe JSON parsing error:",
                response.output_text
            );

            return res.status(500).json({
                message:
                    "AI returned invalid recipe JSON"
            });
        }


        // =====================================================
        // SEND RECIPE
        // =====================================================

        res.status(200).json({

            message:
                "Recipe generated successfully",

            recipe

        });

    } catch (error) {

        console.error(
            "Recipe generation error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to generate recipe",

            error:
                error.message

        });
    }
};



// =====================================================
// SAVE RECIPE
// =====================================================

const saveRecipe = async (req, res) => {

    try {

        const {
            title,
            description,
            ingredients,
            instructions,
            cookingTime,
            servings
        } = req.body;


        if (
            !title ||
            !ingredients ||
            !instructions
        ) {
            return res.status(400).json({
                message:
                    "Recipe data is incomplete"
            });
        }


        const recipe =
            await Recipe.create({

                user: req.user,

                title,

                description,

                ingredients,

                instructions,

                cookingTime,

                servings

            });


        res.status(201).json({

            message:
                "Recipe saved successfully",

            recipe

        });

    } catch (error) {

        console.error(
            "Save recipe error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to save recipe"

        });
    }
};



// =====================================================
// GET MY RECIPES
// =====================================================

const getMyRecipes = async (req, res) => {

    try {

        const recipes =
            await Recipe.find({

                user: req.user

            }).sort({

                createdAt: -1

            });


        res.status(200).json({

            message:
                "Recipes fetched successfully",

            recipes

        });

    } catch (error) {

        console.error(
            "Get recipes error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to fetch recipes"

        });
    }
};



// =====================================================
// GET SINGLE RECIPE
// =====================================================

const getRecipeById = async (req, res) => {

    try {

        const recipe =
            await Recipe.findOne({

                _id: req.params.id,

                user: req.user

            });


        if (!recipe) {

            return res.status(404).json({

                message:
                    "Recipe not found"

            });
        }


        res.status(200).json({

            message:
                "Recipe fetched successfully",

            recipe

        });

    } catch (error) {

        console.error(
            "Get recipe by ID error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to fetch recipe"

        });
    }
};



// =====================================================
// TRANSLATE SAVED RECIPE
// =====================================================

const translateRecipe = async (req, res) => {

    try {

        const {
            language
        } = req.body;


        // =====================================================
        // VALIDATE LANGUAGE
        // =====================================================

        const supportedLanguages = [
            "English",
            "Hindi",
            "Marathi"
        ];

        if (
            !supportedLanguages.includes(language)
        ) {
            return res.status(400).json({

                message:
                    "Unsupported recipe language"

            });
        }


        // =====================================================
        // FIND RECIPE
        // =====================================================

        const recipe =
            await Recipe.findOne({

                _id: req.params.id,

                user: req.user

            });


        if (!recipe) {

            return res.status(404).json({

                message:
                    "Recipe not found"

            });
        }


        // =====================================================
        // PREPARE RECIPE FOR AI
        // =====================================================

        const recipeData = {

            title:
                recipe.title,

            description:
                recipe.description,

            ingredients:
                recipe.ingredients,

            instructions:
                recipe.instructions,

            cookingTime:
                recipe.cookingTime,

            servings:
                recipe.servings

        };


        // =====================================================
        // AI TRANSLATION
        // =====================================================

        const response =
            await client.responses.create({

                model: "gpt-6-luna",

                input: `
You are a professional cooking recipe translator.

Translate the following recipe into:

${language}

IMPORTANT:
- Translate the title.
- Translate the description.
- Translate ingredient names.
- Keep ingredient quantities accurate.
- Translate cooking instructions.
- Keep cooking time unchanged where appropriate.
- Keep servings unchanged.
- Do NOT change the meaning of the recipe.
- Do NOT add new ingredients.
- Do NOT remove ingredients.
- Do NOT add cooking steps.
- Do NOT remove cooking steps.

Return ONLY valid JSON in exactly this format:

{
    "title": "Translated Recipe Name",
    "description": "Translated description",
    "ingredients": [
        {
            "name": "Translated ingredient",
            "quantity": "Original quantity"
        }
    ],
    "instructions": [
        "Translated step 1",
        "Translated step 2",
        "Translated step 3"
    ],
    "cookingTime": "30 minutes",
    "servings": "2"
}

Recipe to translate:

${JSON.stringify(recipeData)}
                `
            });


        console.log(
            "Recipe Translation Response:",
            response.output_text
        );


        // =====================================================
        // PARSE AI RESPONSE
        // =====================================================

        let translatedRecipe;

        try {

            translatedRecipe =
                JSON.parse(
                    response.output_text
                );

        } catch (error) {

            console.error(
                "Translation JSON parsing error:",
                response.output_text
            );

            return res.status(500).json({

                message:
                    "AI returned invalid translation"

            });
        }


        // =====================================================
        // SEND TRANSLATED RECIPE
        // =====================================================

        res.status(200).json({

            message:
                "Recipe translated successfully",

            language,

            recipe:
                translatedRecipe

        });

    } catch (error) {

        console.error(
            "Recipe translation error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to translate recipe",

            error:
                error.message

        });
    }
};



// =====================================================
// DELETE RECIPE
// =====================================================

const deleteRecipe = async (req, res) => {

    try {

        const recipe =
            await Recipe.findOne({

                _id: req.params.id,

                user: req.user

            });


        if (!recipe) {

            return res.status(404).json({

                message:
                    "Recipe not found"

            });
        }


        await Recipe.findByIdAndDelete(
            recipe._id
        );


        res.status(200).json({

            message:
                "Recipe deleted successfully"

        });

    } catch (error) {

        console.error(
            "Delete recipe error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to delete recipe"

        });
    }
};



// =====================================================
// EXPORT
// =====================================================

module.exports = {

    generateRecipe,

    saveRecipe,

    getMyRecipes,

    getRecipeById,

    translateRecipe,

    deleteRecipe

};