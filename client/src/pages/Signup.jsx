import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import { useLanguage } from "../context/LanguageContext";

function Signup() {

    const navigate = useNavigate();

    const {
        t
    } = useLanguage();

    const [formData, setFormData] = useState({
        name: "",
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
                "/auth/register",
                formData
            );

            setMessage(
                response.data.message
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                t("registrationFailed")
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
                    {t("createAccount")}
                </h2>


                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder={t("name")}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />


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
                        {t("createAccount")}
                    </button>

                </form>


                {message && (
                    <p>
                        {message}
                    </p>
                )}


                <p>
                    {t("alreadyHaveAccount")}
                    {" "}

                    <Link to="/login">
                        {t("login")}
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;