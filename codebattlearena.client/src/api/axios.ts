import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7195/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default axios;