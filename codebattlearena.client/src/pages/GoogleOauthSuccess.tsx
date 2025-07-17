import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

const GoogleOauthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        api
            .get("/account/user", {
                withCredentials: true,
                signal: controller.signal,
            })
            .then(() => {
                navigate("/home");
            })
            .catch((error) => {
                // Если запрос был отменён — ничего не делаем
                if (error.code === "ERR_CANCELED") return;

                console.error("Authentication check failed:", error);
                navigate("/login-error");
            });

        // Отмена запроса при размонтировании компонента
        return () => controller.abort();
    }, [navigate]);

    return <div>Load...</div>;
};

export default GoogleOauthSuccess;
