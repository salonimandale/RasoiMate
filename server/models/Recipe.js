const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        ingredients: [
            {
                name: String,
                quantity: String
            }
        ],

        instructions: [
            {
                type: String
            }
        ],

        cookingTime: {
            type: String
        },

        servings: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Recipe", recipeSchema);