import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

const GoogleOauthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // ѕровер€ем, авторизован ли пользователь через куки
        api.get("/account/user", { withCredentials: true })
            .then(response => {
                navigate("/home");
            })
            .catch(error => {
                console.error("Authentication check failed:", error);
                navigate("/login-error");
            });
    }, [navigate]);

    return <div>Load...</div>;
};

export default GoogleOauthSuccess;