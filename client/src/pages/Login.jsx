import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import { useLanguage } from "../context/LanguageContext";

function Login() {

    const navigate = useNavigate();

    const {
        t
    } = useLanguage();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );

            navigate("/dashboard");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                t("loginFailed")
            );

        }
    };


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    🍳 RasoiMate
                </h1>

                <h2>
                    {t("welcomeBack")} 👋
                </h2>


                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder={t("email")}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder={t("password")}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />


                    <button type="submit">
                        {t("login")}
                    </button>

                </form>


                {message && (
                    <p>
                        {message}
                    </p>
                )}


                <p>
                    {t("dontHaveAccount")}
                    {" "}

                    <Link to="/signup">
                        {t("signup")}
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;