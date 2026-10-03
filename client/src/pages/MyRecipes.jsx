import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

import {
    useLanguage
} from "../context/LanguageContext";


function MyRecipes() {

    const navigate = useNavigate();

    const {
        t
    } = useLanguage();


    const [recipes, setRecipes] =
        useState([]);

    const [filteredRecipes, setFilteredRecipes] =
        useState([]);


    const [loading, setLoading] =
        useState(true);

    const [message, setMessage] =
        useState("");

    const [search, setSearch] =
        useState("");


    const [deletingId, setDeletingId] =
        useState(null);



    // =====================================================
    // FETCH RECIPES
    // =====================================================

    useEffect(() => {

        fetchMyRecipes();

    }, []);



    const fetchMyRecipes = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;
            }


            const response =
                await API.get(
                    "/recipes",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const recipeList =
                response.data.recipes || [];


            setRecipes(recipeList);

            setFilteredRecipes(recipeList);


        } catch (error) {

            console.error(
                "Fetch recipes error:",
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
                "Failed to load recipes."
            );


        } finally {

            setLoading(false);

        }
    };



    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = (e) => {

        const value =
            e.target.value;


        setSearch(value);


        const searchValue =
            value.toLowerCase().trim();


        if (!searchValue) {

            setFilteredRecipes(
                recipes
            );

            return;
        }


        const filtered =
            recipes.filter(
                (recipe) =>
                    recipe.title
                        ?.toLowerCase()
                        .includes(searchValue)
            );


        setFilteredRecipes(
            filtered
        );
    };



    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (
        recipe
    ) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${recipe.title}"?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(
                recipe._id
            );

            setMessage("");


            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                navigate("/login");

                return;
            }


            await API.delete(
                `/recipes/${recipe._id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            const updatedRecipes =
                recipes.filter(
                    (item) =>
                        item._id !==
                        recipe._id
                );


            setRecipes(
                updatedRecipes
            );


            const searchValue =
                search.toLowerCase().trim();


            const updatedFilteredRecipes =
                updatedRecipes.filter(
                    (item) =>
                        !searchValue ||
                        item.title
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )
                );


            setFilteredRecipes(
                updatedFilteredRecipes
            );


            setMessage(
                "Recipe deleted successfully."
            );


        } catch (error) {

            console.error(
                "Delete recipe error:",
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
                "Failed to delete recipe."
            );


        } finally {

            setDeletingId(null);

        }
    };



    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <>

                <Navbar />


                <div className="my-recipes-page">

                    <div className="recipes-loading">

                        <div className="loading-icon">
                            🍳
                        </div>


                        <h2>
                            {t("loading")}
                        </h2>


                        <p>
                            {t("pleaseWait") ||
                                "Please wait a moment."}
                        </p>

                    </div>

                </div>

            </>

        );
    }



    // =====================================================
    // PAGE
    // =====================================================

    return (

        <>

            <Navbar />


            <div className="my-recipes-page">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="recipes-header">


                    <div>

                        <p className="recipes-label">

                            {t("myRecipes")}

                        </p>


                        <h1>

                            📖 {t("myRecipes")}

                        </h1>


                        <p className="recipes-subtitle">

                            {t(
                                "myRecipeCollection"
                            )}

                        </p>

                    </div>



                    {/* SEARCH */}

                    {recipes.length > 0 && (

                        <div className="recipe-search">

                            <span>
                                🔍
                            </span>


                            <input
                                type="text"
                                placeholder={
                                    t("searchRecipes")
                                }
                                value={search}
                                onChange={
                                    handleSearch
                                }
                            />

                        </div>

                    )}

                </div>



                {/* =================================================
                    MESSAGE
                ================================================= */}

                {message && (

                    <div className="recipe-message">

                        {message}

                    </div>

                )}



                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {recipes.length === 0 &&
                !message ? (

                    <div className="empty-recipes">


                        <div className="empty-recipe-icon">
                            🍳
                        </div>


                        <h2>

                            {t(
                                "noSavedRecipes"
                            )}

                        </h2>


                        <p>

                            {t(
                                "createFirstRecipe"
                            )}

                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/upload"
                                )
                            }
                        >

                            📷{" "}
                            {t(
                                "createFirst"
                            )}

                        </button>


                    </div>


                ) : filteredRecipes.length === 0 ? (


                    /* =================================================
                       SEARCH EMPTY STATE
                    ================================================= */

                    <div className="empty-recipes">


                        <div className="empty-recipe-icon">
                            🔍
                        </div>


                        <h2>

                            {t(
                                "noRecipesFound"
                            )}

                        </h2>


                        <p>

                            {t(
                                "tryDifferentSearch"
                            )}

                        </p>


                    </div>


                ) : (


                    /* =================================================
                       RECIPE CARDS
                    ================================================= */

                    <div className="saved-recipes">


                        {filteredRecipes.map(
                            (recipe) => {


                                const previewIngredients =
                                    recipe.ingredients?.slice(
                                        0,
                                        4
                                    ) || [];


                                const remainingIngredients =
                                    Math.max(
                                        (
                                            recipe.ingredients
                                                ?.length ||
                                            0
                                        ) - 4,
                                        0
                                    );


                                return (

                                    <article
                                        className="saved-recipe-card"
                                        key={
                                            recipe._id
                                        }
                                    >


                                        {/* CARD HEADER */}

                                        <div className="recipe-card-header">


                                            <div className="recipe-card-icon">
                                                🍲
                                            </div>


                                            <div>

                                                <h2>
                                                    {
                                                        recipe.title
                                                    }
                                                </h2>


                                                <p>
                                                    {
                                                        t(
                                                            "savedRecipe"
                                                        )
                                                    }
                                                </p>

                                            </div>

                                        </div>



                                        {/* DESCRIPTION */}

                                        {recipe.description && (

                                            <p className="recipe-description">

                                                {
                                                    recipe.description
                                                }

                                            </p>

                                        )}



                                        {/* INFO */}

                                        <div className="recipe-info">


                                            <span>

                                                ⏱️{" "}

                                                {
                                                    recipe.cookingTime ||
                                                    "Not specified"
                                                }

                                            </span>


                                            <span>

                                                👥{" "}

                                                {
                                                    recipe.servings ||
                                                    "Not specified"
                                                }

                                            </span>

                                        </div>



                                        {/* INGREDIENTS */}

                                        <div className="recipe-section">


                                            <h3>

                                                🥕{" "}
                                                {t(
                                                    "ingredients"
                                                )}

                                            </h3>


                                            <ul className="preview-ingredients">


                                                {previewIngredients.map(
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



                                            {remainingIngredients >
                                                0 && (

                                                <p className="more-ingredients">

                                                    +{" "}

                                                    {
                                                        remainingIngredients
                                                    }{" "}

                                                    {remainingIngredients >
                                                    1
                                                        ? "more ingredients"
                                                        : "more ingredient"}

                                                </p>

                                            )}

                                        </div>



                                        {/* ACTIONS */}

                                        <div className="recipe-card-actions">


                                            <button
                                                type="button"
                                                className="view-recipe-button"
                                                onClick={() =>
                                                    navigate(
                                                        `/recipe/${recipe._id}`
                                                    )
                                                }
                                            >

                                                {t(
                                                    "viewFullRecipe"
                                                )} →

                                            </button>


                                            <button
                                                type="button"
                                                className="delete-recipe-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        recipe
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    recipe._id
                                                }
                                            >

                                                {deletingId ===
                                                recipe._id
                                                    ? t("loading")
                                                    : `🗑️ ${t(
                                                          "deleteRecipe"
                                                      )}`}

                                            </button>


                                        </div>


                                    </article>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </>

    );
}


export default MyRecipes;