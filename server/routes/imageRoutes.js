const express = require("express");
const multer = require("multer");
const fs = require("fs");

const cloudinary = require("../config/cloudinary");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/upload",
    protect,
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "No image uploaded"
                });
            }

            const result =
                await cloudinary.uploader.upload(
                    req.file.path,
                    {
                        folder: "rasoimate/ingredients"
                    }
                );

            fs.unlinkSync(req.file.path);

            res.status(200).json({
                message:
                    "Image uploaded to Cloudinary successfully",

                image: {
                    url: result.secure_url,
                    publicId: result.public_id
                }
            });

        } catch (error) {
            console.error(
                "Cloudinary upload error:",
                error
            );

            res.status(500).json({
                message:
                    "Cloudinary upload failed"
            });
        }
    }
);

module.exports = router;