import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";


function UploadImage() {

    const navigate = useNavigate();


    // =====================================================
    // IMAGE STATE
    // =====================================================

    const [image, setImage] = useState(null);

    const [preview, setPreview] =
        useState(null);


    // =====================================================
    // INGREDIENT STATE
    // =====================================================

    const [ingredients, setIngredients] =
        useState([]);

    const [newIngredient, setNewIngredient] =
        useState("");


    // =====================================================
    // LANGUAGE STATE
    // =====================================================

    const [language, setLanguage] =
        useState("English");


    // =====================================================
    // MESSAGE STATE
    // =====================================================

    const [message, setMessage] =
        useState("");

    const [saveMessage, setSaveMessage] =
        useState("");


    // =====================================================
    // LOADING STATE
    // =====================================================

    const [loading, setLoading] =
        useState(false);


    // =====================================================
    // RECIPE STATE
    // =====================================================

    const [recipe, setRecipe] =
        useState(null);



    // =====================================================
    // IMAGE CHANGE
    // =====================================================

    const handleImageChange = (e) => {

        const file =
            e.target.files[0];


        if (!file) {
            return;
        }


        if (preview) {

            URL.revokeObjectURL(
                preview
            );

        }


        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );


        setIngredients([]);

        setRecipe(null);

        setMessage("");

        setSaveMessage("");
    };



    // =====================================================
    // ANALYZE IMAGE
    // =====================================================

    const handleAnalyze = async () => {

        if (!image) {

            setMessage(
                "Please select an image first."
            );

            return;
        }


        try {

            setLoading(true);

            setMessage("");

            setSaveMessage("");

            setIngredients([]);

            setRecipe(null);


            const token =
                localStorage.getItem("token");


            if (!token) {

                setMessage(
                    "Please login again."
                );

                navigate("/login");

                return;
            }


            const formData =
                new FormData();


            formData.append(
                "image",
                image
            );


            const response =
                await API.post(
                    "/ingredients/detect",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            setIngredients(
                response.data.ingredients || []
            );


            setMessage(
                response.data.message ||
                "Ingredients detected successfully!"
            );

        } catch (error) {

            console.error(
                "Detection error:",
                error
            );


            if (
                error.response?.status === 401
            ) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                navigate("/login");

                return;
            }


            setMessage(
                error.response?.data?.message ||
                "Ingredient detection failed."
            );

        } finally {

            setLoading(false);

        }
    };



    // =====================================================
    // REMOVE INGREDIENT
    // =====================================================

    const removeIngredient = (
        ingredientToRemove
    ) => {

        setIngredients(
            (previousIngredients) =>
                previousIngredients.filter(
                    (ingredient) =>
                        ingredient !==
                        ingredientToRemove
                )
        );


        setRecipe(null);

        setMessage("");

        setSaveMessage("");
    };



    // =====================================================
    // ADD INGREDIENT
    // =====================================================

    const addIngredient = () => {

        const ingredient =
            newIngredient.trim();


        if (!ingredient) {
            return;
        }


        const alreadyExists =
            ingredients.some(
                (item) =>
                    item.toLowerCase() ===
                    ingredient.toLowerCase()
            );


        if (alreadyExists) {

            setMessage(
                "This ingredient is already in the list."
            );

            return;
        }


        setIngredients(
            (previousIngredients) => [
                ...previousIngredients,
                ingredient
            ]
        );


        setNewIngredient("");

        setRecipe(null);

        setMessage("");

        setSaveMessage("");
    };



    // =====================================================
    // GENERATE RECIPE
    // =====================================================

    const handleGenerateRecipe =
        async () => {

            if (
                ingredients.length === 0
            ) {

                setMessage(
                    "Please add at least one ingredient."
                );

                return;
            }


            try {

                setLoading(true);

                setMessage("");

                setSaveMessage("");

                setRecipe(null);


                const token =
                    localStorage.getItem("token");


                if (!token) {

                    setMessage(
                        "Please login again."
                    );

                    navigate("/login");

                    return;
                }


                const response =
                    await API.post(
                        "/recipes/generate",
                        {
                            ingredients:
                                ingredients,

                            language:
                                language
                        },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                setRecipe(
                    response.data.recipe
                );


                setMessage(
                    response.data.message ||
                    "Recipe generated successfully!"
                );

            } catch (error) {

                console.error(
                    "Recipe generation error:",
                    error
                );


                if (
                    error.response?.status === 401
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    navigate("/login");

                    return;
                }


                setMessage(
                    error.response?.data?.message ||
                    "Recipe generation failed."
                );

            } finally {

                setLoading(false);

            }
        };



    // =====================================================
    // SAVE RECIPE
    // =====================================================

    const handleSaveRecipe =
        async () => {

            if (!recipe) {
                return;
            }


            try {

                setLoading(true);

                setSaveMessage("");


                const token =
                    localStorage.getItem("token");


                if (!token) {

                    setSaveMessage(
                        "❌ Please login again."
                    );

                    setLoading(false);

                    navigate("/login");

                    return;
                }


                await API.post(
                    "/recipes/save",
                    recipe,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                setSaveMessage(
                    "✅ Recipe saved successfully!"
                );

            } catch (error) {

                console.error(
                    "Save recipe error:",
                    error
                );


                if (
                    error.response?.status === 401
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    navigate("/login");

                    return;
                }


                setSaveMessage(
                    error.response?.data?.message ||
                    "❌ Failed to save recipe."
                );

            } finally {

                setLoading(false);

            }
        };



    // =====================================================
    // UI
    // =====================================================

    return (

        <>

            <Navbar />


            <div className="upload-page">

                <div className="upload-content">


                    {/* PAGE HEADER */}

                    <h1>
                        🍳 Find Ingredients
                    </h1>

                    <p>
                        Upload an image of your ingredients
                        and RasoiMate will identify them.
                    </p>



                    <div className="upload-box">


                        {/* IMAGE PREVIEW */}

                        {preview ? (

                            <img
                                src={preview}
                                alt="Selected ingredients"
                                className="image-preview"
                            />

                        ) : (

                            <div className="upload-placeholder">

                                <span className="upload-emoji">
                                    📷
                                </span>

                                <h2>
                                    Upload Ingredient Image
                                </h2>

                                <p>
                                    JPG, PNG or JPEG
                                </p>

                            </div>

                        )}



                        {/* CHOOSE IMAGE */}

                        <label className="upload-button">

                            Choose Image

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImageChange
                                }
                                hidden
                            />

                        </label>



                        {/* ANALYZE BUTTON */}

                        {image && (

                            <button
                                type="button"
                                className="analyze-button"
                                onClick={
                                    handleAnalyze
                                }
                                disabled={loading}
                            >

                                {loading
                                    ? "Analyzing... 🤖"
                                    : "Analyze Image 🤖"}

                            </button>

                        )}



                        {/* MESSAGE */}

                        {message && (

                            <p
                                className="upload-message"
                                aria-live="polite"
                            >
                                {message}
                            </p>

                        )}



                        {/* INGREDIENTS */}

                        {ingredients.length > 0 && (

                            <div className="ingredients-result">


                                <h2>
                                    🥕 Your Ingredients
                                </h2>


                                <p>
                                    Review the detected ingredients.
                                    You can remove or add items
                                    before generating a recipe.
                                </p>



                                {/* INGREDIENT LIST */}

                                <div className="ingredient-list">

                                    {ingredients.map(
                                        (
                                            ingredient,
                                            index
                                        ) => (

                                            <div
                                                key={
                                                    `${ingredient}-${index}`
                                                }
                                                className="ingredient-item"
                                            >

                                                <span>
                                                    ✅ {ingredient}
                                                </span>


                                                <button
                                                    type="button"
                                                    className="remove-ingredient"
                                                    onClick={() =>
                                                        removeIngredient(
                                                            ingredient
                                                        )
                                                    }
                                                    aria-label={
                                                        `Remove ${ingredient}`
                                                    }
                                                >
                                                    ✕
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>



                                {/* ADD INGREDIENT */}

                                <div className="add-ingredient">

                                    <input
                                        type="text"
                                        placeholder="Add an ingredient..."
                                        value={
                                            newIngredient
                                        }
                                        onChange={(e) =>
                                            setNewIngredient(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) => {

                                            if (
                                                e.key ===
                                                "Enter"
                                            ) {

                                                e.preventDefault();

                                                addIngredient();

                                            }

                                        }}
                                    />


                                    <button
                                        type="button"
                                        onClick={
                                            addIngredient
                                        }
                                    >
                                        + Add
                                    </button>

                                </div>



                                {/* =================================================
                                    LANGUAGE SELECTOR
                                ================================================= */}

                                <div className="recipe-language-selector">

                                    <div className="language-selector-header">

                                        <span className="language-icon">
                                            🌐
                                        </span>


                                        <div>

                                            <h3>
                                                Recipe Language
                                            </h3>

                                            <p>
                                                Choose the language for your recipe
                                            </p>

                                        </div>

                                    </div>



                                    <div className="language-options">


                                        <button
                                            type="button"
                                            className={
                                                language ===
                                                "English"
                                                    ? "language-option active"
                                                    : "language-option"
                                            }
                                            onClick={() =>
                                                setLanguage(
                                                    "English"
                                                )
                                            }
                                        >
                                            🇬🇧 English
                                        </button>



                                        <button
                                            type="button"
                                            className={
                                                language ===
                                                "Hindi"
                                                    ? "language-option active"
                                                    : "language-option"
                                            }
                                            onClick={() =>
                                                setLanguage(
                                                    "Hindi"
                                                )
                                            }
                                        >
                                            🇮🇳 हिन्दी
                                        </button>



                                        <button
                                            type="button"
                                            className={
                                                language ===
                                                "Marathi"
                                                    ? "language-option active"
                                                    : "language-option"
                                            }
                                            onClick={() =>
                                                setLanguage(
                                                    "Marathi"
                                                )
                                            }
                                        >
                                            🇮🇳 मराठी
                                        </button>


                                    </div>

                                </div>



                                {/* GENERATE RECIPE */}

                                <button
                                    type="button"
                                    className="generate-recipe-button"
                                    onClick={
                                        handleGenerateRecipe
                                    }
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Generating Recipe... 🤖"
                                        : `🍲 Generate Recipe in ${language}`}

                                </button>


                            </div>

                        )}



                        {/* =================================================
                            GENERATED RECIPE
                        ================================================= */}

                        {recipe && (

                            <div className="recipe-result">


                                <h2>
                                    🍲 {recipe.title}
                                </h2>


                                <p className="recipe-description">
                                    {recipe.description}
                                </p>



                                {/* RECIPE INFO */}

                                <div className="recipe-info">

                                    <span>
                                        ⏱️{" "}
                                        {recipe.cookingTime}
                                    </span>

                                    <span>
                                        👥{" "}
                                        {recipe.servings}{" "}
                                        servings
                                    </span>

                                </div>



                                {/* INGREDIENTS */}

                                <div className="recipe-section">

                                    <h3>
                                        🥕 Ingredients
                                    </h3>


                                    <ul>

                                        {recipe.ingredients?.map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <li
                                                    key={
                                                        index
                                                    }
                                                >

                                                    <strong>
                                                        {
                                                            item.name
                                                        }
                                                    </strong>

                                                    {" — "}

                                                    {
                                                        item.quantity
                                                    }

                                                </li>

                                            )
                                        )}

                                    </ul>

                                </div>



                                {/* INSTRUCTIONS */}

                                <div className="recipe-section">

                                    <h3>
                                        👩‍🍳 Instructions
                                    </h3>


                                    <ol>

                                        {recipe.instructions?.map(
                                            (
                                                step,
                                                index
                                            ) => (

                                                <li
                                                    key={
                                                        index
                                                    }
                                                >
                                                    {step}
                                                </li>

                                            )
                                        )}

                                    </ol>

                                </div>



                                {/* SAVE */}

                                <button
                                    type="button"
                                    className="save-recipe-button"
                                    onClick={
                                        handleSaveRecipe
                                    }
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Saving... 💾"
                                        : "💾 Save Recipe"}

                                </button>


                                {saveMessage && (

                                    <p
                                        className="save-recipe-message"
                                        aria-live="polite"
                                    >
                                        {saveMessage}
                                    </p>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </>

    );
}


export default UploadImage;