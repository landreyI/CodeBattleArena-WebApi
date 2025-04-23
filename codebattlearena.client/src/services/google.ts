import axios, { api } from "../api/axios";

export const fetchRedirectOnOauthServer = async () => {
    try {
        let response = await api.get("/GoogleAuth/google-redirect-oauth-server");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Google OAuth redirect URL:", error);
        throw error;
    }
};

export const handleGoogleLogin = async () => {
    try {
        const dataUrl = await fetchRedirectOnOauthServer();
        if (dataUrl && dataUrl.url) {
            window.location.href = dataUrl.url;
        } else {
            console.error("No valid redirect URL received");

            window.location.href = "/login-error";
        }
    } catch (error) {
        console.error("Google login initiation failed:", error);
        window.location.href = "/login-error";
    }
};