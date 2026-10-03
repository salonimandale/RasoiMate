import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Home() {
    const navigate = useNavigate();

    const {
        language,
        setLanguage,
        t
    } = useLanguage();

    return (
        <div className="home-page">

            {/* ================= NAVBAR ================= */}

            <nav className="home-navbar">

                <div
                    className="home-brand"
                    onClick={() => navigate("/")}
                >
                    <div className="home-logo">
                        🍳
                    </div>

                    <span>
                        RasoiMate
                    </span>
                </div>

                <div className="home-nav-actions">

                    {/* LANGUAGE SELECTOR */}

                    <div className="home-language">
                        <span>🌐</span>

                        <select
                            value={language}
                            onChange={(e) =>
                                setLanguage(
                                    e.target.value
                                )
                            }
                            aria-label="Select language"
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
                    </div>


                    <button
                        className="home-login-button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        {t("login")}
                    </button>

                    <button
                        className="home-signup-button"
                        onClick={() =>
                            navigate("/signup")
                        }
                    >
                        {t("getStarted")}
                    </button>

                </div>

            </nav>


            {/* ================= HERO ================= */}

            <section className="home-hero">

                <div className="home-hero-content">

                    <div className="home-badge">
                        ✨ {t("aiPowered")}
                    </div>

                    <h1>
                        {t("turnIngredients")}
                        <br />

                        <span>
                            {t("deliciousRecipes")}
                        </span>
                    </h1>

                    <p className="home-hero-description">
                        {t("heroDescription")}
                    </p>

                    <div className="home-hero-buttons">

                        <button
                            className="home-primary-button"
                            onClick={() =>
                                navigate("/signup")
                            }
                        >
                            📷 {t("createYourRecipe")}
                        </button>

                        <button
                            className="home-secondary-button"
                            onClick={() =>
                                document
                                    .getElementById(
                                        "how-it-works"
                                    )
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            {t("howItWorks")} ↓
                        </button>

                    </div>

                    <div className="home-trust">

                        <span>
                            ✓ {t("noRecipeSearching")}
                        </span>

                        <span>
                            ✓ {t("aiIngredientDetection")}
                        </span>

                        <span>
                            ✓ {t("personalizedRecipes")}
                        </span>

                    </div>

                </div>


                {/* ================= HERO VISUAL ================= */}

                <div className="home-hero-visual">

                    <div className="hero-glow"></div>

                    <div className="recipe-preview-card">

                        <div className="recipe-image-area">
                            🍅 🥕 🥚
                        </div>

                        <div className="recipe-preview-content">

                            <div className="ai-label">
                                ✨ {t("aiGenerated")}
                            </div>

                            <h3>
                                {t("freshVegetableOmelette")}
                            </h3>

                            <p>
                                {t("recipePreviewDescription")}
                            </p>

                            <div className="recipe-preview-info">

                                <span>
                                    ⏱️ 20 min
                                </span>

                                <span>
                                    👥 2 {t("servings")}
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="floating-ingredient ingredient-one">
                        🥕
                    </div>

                    <div className="floating-ingredient ingredient-two">
                        🍅
                    </div>

                    <div className="floating-ingredient ingredient-three">
                        🥚
                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section
                className="home-how"
                id="how-it-works"
            >

                <div className="section-heading">

                    <p>
                        {t("simpleAndSmart")}
                    </p>

                    <h2>
                        {t("howRasoiMateWorks")}
                    </h2>

                    <span>
                        {t("howItWorksDescription")}
                    </span>

                </div>


                <div className="home-steps">

                    {/* STEP 1 */}

                    <div className="home-step">

                        <div className="step-icon">
                            📷
                        </div>

                        <div className="step-number">
                            01
                        </div>

                        <h3>
                            {t("uploadIngredients")}
                        </h3>

                        <p>
                            {t("uploadIngredientsDescription")}
                        </p>

                    </div>


                    {/* STEP 2 */}

                    <div className="home-step">

                        <div className="step-icon">
                            🤖
                        </div>

                        <div className="step-number">
                            02
                        </div>

                        <h3>
                            {t("aiDetectsIngredients")}
                        </h3>

                        <p>
                            {t("aiDetectsDescription")}
                        </p>

                    </div>


                    {/* STEP 3 */}

                    <div className="home-step">

                        <div className="step-icon">
                            🍲
                        </div>

                        <div className="step-number">
                            03
                        </div>

                        <h3>
                            {t("getYourRecipe")}
                        </h3>

                        <p>
                            {t("getYourRecipeDescription")}
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section className="home-features">

                <div className="section-heading">

                    <p>
                        {t("whyRasoiMate")}
                    </p>

                    <h2>
                        {t("smartKitchen")}
                    </h2>

                </div>


                <div className="feature-grid">

                    {/* FEATURE 1 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            👁️
                        </div>

                        <h3>
                            {t("smartIngredientDetection")}
                        </h3>

                        <p>
                            {t("smartIngredientDescription")}
                        </p>

                    </div>


                    {/* FEATURE 2 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            🧠
                        </div>

                        <h3>
                            {t("aiRecipeGeneration")}
                        </h3>

                        <p>
                            {t("aiRecipeDescription")}
                        </p>

                    </div>


                    {/* FEATURE 3 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            📖
                        </div>

                        <h3>
                            {t("saveYourRecipes")}
                        </h3>

                        <p>
                            {t("saveRecipesDescription")}
                        </p>

                    </div>


                    {/* FEATURE 4 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            ✏️
                        </div>

                        <h3>
                            {t("editIngredients")}
                        </h3>

                        <p>
                            {t("editIngredientsDescription")}
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="home-cta">

                <div className="cta-content">

                    <div className="cta-icon">
                        🍳
                    </div>

                    <h2>
                        {t("readyToCook")}
                    </h2>

                    <p>
                        {t("readyToCookDescription")}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/signup")
                        }
                    >
                        {t("startCooking")} ✨
                    </button>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="home-footer">

                <div className="footer-brand">
                    🍳 <strong>RasoiMate</strong>
                </div>

                <p>
                    {t("smartCookingPowered")}
                </p>

                <span>
                    © 2026 RasoiMate.{" "}
                    {t("allRightsReserved")}
                </span>

            </footer>

        </div>
    );
}

export default Home;