import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

import {
    useLanguage
} from "../context/LanguageContext";


function RecipeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { t } = useLanguage();


    const [recipe, setRecipe] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [message, setMessage] =
        useState("");

    // Language used for translating the saved recipe
    const [recipeLanguage, setRecipeLanguage] =
        useState("English");

    // Translation loading state
    const [translating, setTranslating] =
        useState(false);


    useEffect(() => {

        fetchRecipe();

    }, [id]);


    // =========================
    // FETCH SINGLE RECIPE
    // =========================

    const fetchRecipe = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;
            }


            const response = await API.get(
                `/recipes/${id}`,
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


        } catch (error) {

            console.error(
                "Fetch recipe error:",
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
                "Failed to load recipe."
            );


        } finally {

            setLoading(false);

        }
    };


    // =========================
    // TRANSLATE SAVED RECIPE
    // =========================

    const handleTranslate = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;
            }


            setTranslating(true);
            setMessage("");


            const response = await API.post(

                `/recipes/translate/${id}`,

                {
                    language:
                        recipeLanguage
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            // Replace displayed recipe
            // with translated version

            setRecipe(
                response.data.recipe
            );


        } catch (error) {

            console.error(
                "Recipe translation error:",
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
                "Failed to translate recipe."
            );


        } finally {

            setTranslating(false);

        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <>

                <Navbar />


                <div className="recipe-details-page">

                    <div className="recipe-details-loading">

                        <div className="details-loading-icon">

                            🍳

                        </div>


                        <h2>

                            {t("loading")}

                        </h2>


                        <p>

                            {t("pleaseWait")}

                        </p>


                    </div>

                </div>

            </>

        );
    }


    // =========================
    // RECIPE NOT FOUND
    // =========================

    if (!recipe) {

        return (

            <>

                <Navbar />


                <div className="recipe-details-page">

                    <div className="recipe-not-found">

                        <div className="not-found-icon">

                            🍽️

                        </div>


                        <h2>

                            {t("recipeNotFound")}

                        </h2>


                        <p>

                            {message ||
                                "This recipe could not be found."}

                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/my-recipes"
                                )
                            }
                        >

                            ←{" "}
                            {t("backToMyRecipes")}

                        </button>

                    </div>

                </div>

            </>

        );
    }


    // =========================
    // RECIPE DETAILS
    // =========================

    return (

        <>

            <Navbar />


            <div className="recipe-details-page">

                <div className="recipe-details-container">


                    {/* =========================
                        BACK BUTTON
                    ========================= */}

                    <button
                        type="button"
                        className="back-recipes-button"
                        onClick={() =>
                            navigate(
                                "/my-recipes"
                            )
                        }
                    >

                        ←{" "}
                        {t("backToMyRecipes")}

                    </button>



                    {/* =========================
                        RECIPE HEADER
                    ========================= */}

                    <div className="recipe-details-header">

                        <div className="recipe-details-icon">

                            🍲

                        </div>


                        <div>

                            <p className="recipe-details-label">

                                {t("savedRecipe")}

                            </p>


                            <h1>

                                {recipe.title}

                            </h1>


                            {recipe.description && (

                                <p className="recipe-details-description">

                                    {recipe.description}

                                </p>

                            )}

                        </div>

                    </div>



                    {/* =========================
                        RECIPE LANGUAGE
                    ========================= */}

                    <div className="recipe-language-box">

                        <div className="recipe-language-content">

                            <div className="recipe-language-icon">

                                🌐

                            </div>


                            <div>

                                <h3>

                                    {t(
                                        "recipeLanguage"
                                    )}

                                </h3>


                                <p>

                                    {t(
                                        "chooseRecipeLanguage"
                                    )}

                                </p>

                            </div>

                        </div>


                        <div className="recipe-language-controls">

                            <select
                                value={
                                    recipeLanguage
                                }
                                onChange={(e) =>
                                    setRecipeLanguage(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    translating
                                }
                            >

                                <option value="English">

                                    English

                                </option>


                                <option value="Hindi">

                                    हिन्दी

                                </option>


                                <option value="Marathi">

                                    मराठी

                                </option>

                            </select>


                            <button
                                type="button"
                                onClick={
                                    handleTranslate
                                }
                                disabled={
                                    translating
                                }
                            >

                                {translating
                                    ? `🔄 ${t(
                                          "loading"
                                      )}`
                                    : `🌐 ${t(
                                          "translateRecipe"
                                      )}`}

                            </button>

                        </div>

                    </div>



                    {/* =========================
                        MESSAGE
                    ========================= */}

                    {message && (

                        <div className="recipe-translation-message">

                            {message}

                        </div>

                    )}



                    {/* =========================
                        RECIPE INFORMATION
                    ========================= */}

                    <div className="recipe-details-info">

                        {/* COOKING TIME */}

                        <div className="details-info-item">

                            <span>

                                ⏱️

                            </span>


                            <div>

                                <small>

                                    {t(
                                        "cookingTime"
                                    )}

                                </small>


                                <strong>

                                    {recipe.cookingTime ||
                                        "Not specified"}

                                </strong>

                            </div>

                        </div>



                        {/* SERVINGS */}

                        <div className="details-info-item">

                            <span>

                                👥

                            </span>


                            <div>

                                <small>

                                    {t(
                                        "servings"
                                    )}

                                </small>


                                <strong>

                                    {recipe.servings ||
                                        "Not specified"}

                                </strong>

                            </div>

                        </div>

                    </div>



                    {/* =========================
                        MAIN CONTENT
                    ========================= */}

                    <div className="recipe-details-content">


                        {/* =========================
                            INGREDIENTS
                        ========================= */}

                        <section className="details-section">

                            <div className="details-section-heading">

                                <span>

                                    🥕

                                </span>


                                <h2>

                                    {t(
                                        "ingredients"
                                    )}

                                </h2>

                            </div>


                            <div className="details-ingredients">

                                {recipe.ingredients?.length > 0 ? (

                                    recipe.ingredients.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <div
                                                className="details-ingredient-item"
                                                key={index}
                                            >

                                                <span className="ingredient-check">

                                                    ✓

                                                </span>


                                                <span className="ingredient-name">

                                                    {item.name}

                                                </span>


                                                <span className="ingredient-quantity">

                                                    {item.quantity}

                                                </span>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <p>

                                        {t(
                                            "noIngredients"
                                        )}

                                    </p>

                                )}

                            </div>

                        </section>



                        {/* =========================
                            INSTRUCTIONS
                        ========================= */}

                        <section className="details-section">

                            <div className="details-section-heading">

                                <span>

                                    👩‍🍳

                                </span>


                                <h2>

                                    {t(
                                        "cookingInstructions"
                                    )}

                                </h2>

                            </div>


                            <div className="details-instructions">

                                {recipe.instructions?.length > 0 ? (

                                    recipe.instructions.map(
                                        (
                                            step,
                                            index
                                        ) => (

                                            <div
                                                className="instruction-item"
                                                key={index}
                                            >

                                                <div className="instruction-number">

                                                    {index + 1}

                                                </div>


                                                <p>

                                                    {step}

                                                </p>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <p>

                                        {t(
                                            "noInstructions"
                                        )}

                                    </p>

                                )}

                            </div>

                        </section>

                    </div>



                    {/* =========================
                        BOTTOM BUTTON
                    ========================= */}

                    <div className="recipe-details-footer">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/my-recipes"
                                )
                            }
                        >

                            📖{" "}
                            {t(
                                "backToMyRecipes"
                            )}

                        </button>

                    </div>


                </div>

            </div>

        </>

    );
}


export default RecipeDetails;