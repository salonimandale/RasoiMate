import { useNavigate, useLocation } from "react-router-dom";

import {
    useLanguage
} from "../context/LanguageContext";


function Navbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const {
        language,
        setLanguage,
        t
    } = useLanguage();


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const isActive = (path) => {

        return location.pathname === path;

    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };


    return (

        <nav className="main-navbar">


            {/* BRAND */}

            <div
                className="navbar-brand"
                onClick={() =>
                    navigate("/dashboard")
                }
            >

                <div className="navbar-logo">
                    🍳
                </div>

                <span className="navbar-title">
                    RasoiMate
                </span>

            </div>



            {/* NAVIGATION */}

            <div className="navbar-links">


                <button
                    className={
                        isActive("/dashboard")
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    <span>🏠</span>
                    <span>{t("dashboard")}</span>
                </button>



                <button
                    className={
                        isActive("/upload")
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        navigate("/upload")
                    }
                >
                    <span>📷</span>
                    <span>{t("createRecipe")}</span>
                </button>



                <button
                    className={
                        isActive("/my-recipes")
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        navigate("/my-recipes")
                    }
                >
                    <span>📖</span>
                    <span>{t("myRecipes")}</span>
                </button>



                <button
                    className={
                        isActive("/profile")
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        navigate("/profile")
                    }
                >
                    <span>👤</span>
                    <span>{t("profile")}</span>
                </button>

            </div>



            {/* RIGHT SIDE */}

            <div className="navbar-right">


                {/* LANGUAGE */}

                <div className="navbar-language">

                    <span>
                        🌐
                    </span>

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



                {/* USER */}

                <div className="navbar-user">

                    <div className="user-avatar">
                        {user?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                    </div>

                    <span>
                        {user?.name || "User"}
                    </span>

                </div>



                {/* LOGOUT */}

                <button
                    className="navbar-logout"
                    onClick={
                        handleLogout
                    }
                >
                    <span>↪</span>
                    <span>{t("logout")}</span>
                </button>

            </div>

        </nav>

    );
}


export default Navbar;