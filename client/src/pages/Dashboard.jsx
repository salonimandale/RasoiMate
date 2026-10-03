import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
    useLanguage
} from "../context/LanguageContext";


function Dashboard() {

    const navigate = useNavigate();

    const {
        t
    } = useLanguage();


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    return (

        <>

            <Navbar />


            <div className="dashboard-page">


                {/* =========================
                    HERO SECTION
                ========================= */}

                <section className="dashboard-hero">


                    <div className="dashboard-hero-content">


                        <p className="dashboard-greeting">

                            {t("welcomeBack")} 👋

                        </p>


                        <h1>

                            {t("hello")},{" "}
                            {user?.name || "Chef"}!

                        </h1>


                        <p className="dashboard-subtitle">

                            {t(
                                "turnIngredientsIntoRecipes"
                            )}

                        </p>


                        <button
                            type="button"
                            className="dashboard-primary-button"
                            onClick={() =>
                                navigate("/upload")
                            }
                        >

                            📷 {t("createRecipe")}

                        </button>


                    </div>


                    <div className="dashboard-hero-image">

                        🍳

                    </div>


                </section>



                {/* =========================
                    QUICK ACTIONS
                ========================= */}

                <section className="dashboard-section">


                    <h2>

                        {t(
                            "whatWouldYouLikeToDo"
                        )}

                    </h2>


                    <div className="dashboard-cards">


                        {/* =========================
                            CREATE RECIPE
                        ========================= */}

                        <div
                            className="dashboard-card"
                            onClick={() =>
                                navigate("/upload")
                            }
                        >

                            <div className="dashboard-card-icon">

                                📷

                            </div>


                            <h3>

                                {t("createRecipe")}

                            </h3>


                            <p>

                                {t("uploadStep")}

                            </p>


                            <span>

                                {t("getStarted")} →

                            </span>

                        </div>



                        {/* =========================
                            MY RECIPES
                        ========================= */}

                        <div
                            className="dashboard-card"
                            onClick={() =>
                                navigate("/my-recipes")
                            }
                        >

                            <div className="dashboard-card-icon">

                                📖

                            </div>


                            <h3>

                                {t("myRecipes")}

                            </h3>


                            <p>

                                {t(
                                    "myRecipeCollection"
                                )}

                            </p>


                            <span>

                                {t("viewRecipes")} →

                            </span>

                        </div>



                        {/* =========================
                            AI FEATURE
                        ========================= */}

                        <div
                            className="dashboard-card"
                            onClick={() =>
                                navigate("/upload")
                            }
                        >

                            <div className="dashboard-card-icon">

                                🤖

                            </div>


                            <h3>

                                {t("aiPowered")}

                            </h3>


                            <p>

                                {t("generateStep")}

                            </p>


                            <span>

                                {t("exploreAI")} ✨

                            </span>

                        </div>


                    </div>


                </section>



                {/* =========================
                    HOW IT WORKS
                ========================= */}

                <section className="how-it-works">


                    <h2>

                        {t("howItWorks")}

                    </h2>


                    <div className="steps-container">


                        {/* =========================
                            STEP 1
                        ========================= */}

                        <div className="step">


                            <div className="step-number">

                                1

                            </div>


                            <div>

                                <h3>

                                    {t("upload")}

                                </h3>


                                <p>

                                    {t("uploadStep")}

                                </p>

                            </div>


                        </div>



                        {/* =========================
                            STEP 2
                        ========================= */}

                        <div className="step">


                            <div className="step-number">

                                2

                            </div>


                            <div>

                                <h3>

                                    {t("detect")}

                                </h3>


                                <p>

                                    {t("detectStep")}

                                </p>

                            </div>


                        </div>



                        {/* =========================
                            STEP 3
                        ========================= */}

                        <div className="step">


                            <div className="step-number">

                                3

                            </div>


                            <div>

                                <h3>

                                    {t("generate")}

                                </h3>


                                <p>

                                    {t("generateStep")}

                                </p>

                            </div>


                        </div>


                    </div>


                </section>


            </div>

        </>

    );

}


export default Dashboard;