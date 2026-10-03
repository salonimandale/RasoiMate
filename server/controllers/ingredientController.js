const OpenAI = require("openai");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const detectIngredients = async (req, res) => {
    let uploadedFile = null;

    try {
        // Check image
        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded"
            });
        }

        uploadedFile = req.file.path;

        // 1. Upload image to Cloudinary
        const cloudinaryResult =
            await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "rasoimate/ingredients"
                }
            );

        const imageUrl =
            cloudinaryResult.secure_url;

        console.log("Cloudinary URL:", imageUrl);

        // 2. Send image to OpenAI Vision
        const response = await client.responses.create({
            model: "gpt-6-luna",

            input: [
                {
                    role: "user",

                    content: [
                        {
                            type: "input_text",

                            text: `
Look at this image and identify the food
ingredients that are clearly visible.

Return ONLY valid JSON in this format:

{
    "ingredients": [
        "Eggs",
        "Milk",
        "Tomato"
    ]
}

Rules:
- Include only visible food ingredients.
- Do not include utensils.
- Do not include plates.
- Do not include containers.
- Do not include quantities.
- Do not add explanations.
                            `
                        },

                        {
                            type: "input_image",
                            image_url: imageUrl
                        }
                    ]
                }
            ]
        });

        console.log(
            "AI Response:",
            response.output_text
        );

        // 3. Convert AI response to JSON
        let result;

        try {
            result = JSON.parse(
                response.output_text
            );
        } catch (error) {

            console.error(
                "JSON parsing error:",
                response.output_text
            );

            return res.status(500).json({
                message: "AI returned invalid JSON",
                rawResponse: response.output_text
            });
        }

        // 4. Send result to frontend
        res.status(200).json({
            message: "Ingredients detected successfully",

            imageUrl: imageUrl,

            ingredients: result.ingredients
        });

    } catch (error) {

        console.error(
            "Ingredient detection error:",
            error
        );

        res.status(500).json({
            message: "Failed to detect ingredients",
            error: error.message
        });

    } finally {

        // Delete temporary multer file
        if (
            uploadedFile &&
            fs.existsSync(uploadedFile)
        ) {
            fs.unlinkSync(uploadedFile);
        }
    }
};

module.exports = {
    detectIngredients
};