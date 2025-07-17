import axios from "axios";
import { API_BASE_URL } from "@/config";

export const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Храним функцию для показа оверлея
let showTooManyRequestsOverlay: (() => void) | null = null;

export function registerTooManyRequestsHandler(handler: () => void) {
    showTooManyRequestsOverlay = handler;
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 429 && showTooManyRequestsOverlay) {
            showTooManyRequestsOverlay(); // показать оверлей
        }
        return Promise.reject(error);
    }
);

export default axios;