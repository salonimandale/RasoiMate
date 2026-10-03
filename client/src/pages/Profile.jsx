import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: ""
    });

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [editing, setEditing] = useState(false);


    // =====================================================
    // FETCH PROFILE
    // =====================================================

    useEffect(() => {
        fetchProfile();
    }, []);


    const fetchProfile = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await API.get(
                "/auth/profile",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const user =
                response.data.user;

            setProfile(user);

            setFormData({
                name: user.name || "",
                email: user.email || ""
            });

        } catch (error) {

            console.error(
                "Fetch profile error:",
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

            setError(
                error.response?.data?.message ||
                "Failed to load profile."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });

        setMessage("");
        setError("");
    };


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.name.trim() ||
            !formData.email.trim()
        ) {
            setError(
                "Name and email are required."
            );

            return;
        }

        try {

            setSaving(true);

            const token =
                localStorage.getItem("token");

            const response =
                await API.put(
                    "/auth/profile",
                    {
                        name:
                            formData.name.trim(),

                        email:
                            formData.email
                                .trim()
                                .toLowerCase()
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const updatedUser =
                response.data.user;

            setProfile(updatedUser);

            setFormData({
                name:
                    updatedUser.name,

                email:
                    updatedUser.email
            });

            // Update localStorage
            const oldUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    ) || "{}"
                );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...oldUser,
                    id:
                        updatedUser._id,
                    name:
                        updatedUser.name,
                    email:
                        updatedUser.email
                })
            );

            setEditing(false);

            setMessage(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // CANCEL EDIT
    // =====================================================

    const handleCancel = () => {

        setFormData({
            name: profile.name || "",
            email: profile.email || ""
        });

        setEditing(false);

        setMessage("");
        setError("");
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="profile-page">

                    <div className="profile-loading">

                        <div className="profile-loading-icon">
                            👤
                        </div>

                        <h2>
                            Loading your profile...
                        </h2>

                        <p>
                            Please wait a moment.
                        </p>

                    </div>

                </div>
            </>
        );
    }


    // =====================================================
    // PROFILE PAGE
    // =====================================================

    return (
        <>
            <Navbar />

            <div className="profile-page">

                <div className="profile-container">

                    {/* PAGE HEADER */}

                    <div className="profile-page-header">

                        <p className="profile-label">
                            ACCOUNT
                        </p>

                        <h1>
                            👤 My Profile
                        </h1>

                        <p>
                            Manage your RasoiMate
                            account information.
                        </p>

                    </div>


                    {/* PROFILE CARD */}

                    <div className="profile-card">

                        {/* PROFILE TOP */}

                        <div className="profile-top">

                            <div className="profile-avatar-large">
                                {profile.name
                                    ? profile.name
                                          .charAt(0)
                                          .toUpperCase()
                                    : "U"}
                            </div>

                            <div className="profile-user-summary">

                                <h2>
                                    {profile.name}
                                </h2>

                                <p>
                                    {profile.email}
                                </p>

                                <span>
                                    RasoiMate User
                                </span>

                            </div>

                        </div>


                        {/* MESSAGE */}

                        {message && (
                            <div className="profile-success">
                                ✓ {message}
                            </div>
                        )}


                        {error && (
                            <div className="profile-error">
                                {error}
                            </div>
                        )}


                        {/* PROFILE FORM */}

                        <form
                            className="profile-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="profile-section-title">

                                <h3>
                                    Personal Information
                                </h3>

                                {!editing && (
                                    <button
                                        type="button"
                                        className="edit-profile-button"
                                        onClick={() =>
                                            setEditing(
                                                true
                                            )
                                        }
                                    >
                                        ✏️ Edit Profile
                                    </button>
                                )}

                            </div>


                            {/* NAME */}

                            <div className="profile-field">

                                <label>
                                    Full Name
                                </label>

                                <div className="profile-input-wrapper">

                                    <span>
                                        👤
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={
                                            !editing
                                        }
                                        placeholder="Enter your name"
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="profile-field">

                                <label>
                                    Email Address
                                </label>

                                <div className="profile-input-wrapper">

                                    <span>
                                        ✉️
                                    </span>

                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={
                                            !editing
                                        }
                                        placeholder="Enter your email"
                                    />

                                </div>

                            </div>


                            {/* ACTION BUTTONS */}

                            {editing && (
                                <div className="profile-form-actions">

                                    <button
                                        type="button"
                                        className="cancel-profile-button"
                                        onClick={
                                            handleCancel
                                        }
                                        disabled={
                                            saving
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="save-profile-button"
                                        disabled={
                                            saving
                                        }
                                    >
                                        {saving
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>

                                </div>
                            )}

                        </form>


                        {/* ACCOUNT INFORMATION */}

                        <div className="account-info-section">

                            <h3>
                                Account Information
                            </h3>

                            <div className="account-info-grid">

                                <div className="account-info-item">

                                    <span>
                                        📖
                                    </span>

                                    <div>
                                        <small>
                                            My Recipes
                                        </small>

                                        <strong>
                                            View your saved recipes
                                        </strong>
                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/my-recipes"
                                            )
                                        }
                                    >
                                        View →
                                    </button>

                                </div>


                                <div className="account-info-item">

                                    <span>
                                        📷
                                    </span>

                                    <div>
                                        <small>
                                            Create Recipe
                                        </small>

                                        <strong>
                                            Generate a new AI recipe
                                        </strong>
                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/upload"
                                            )
                                        }
                                    >
                                        Create →
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Profile;