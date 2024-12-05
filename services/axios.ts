import { API_URL } from "@/utils/constants";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('error', error);
        if (error.response?.status === 401) {
            try {
                await axios.post('http://127.0.0.1:8000/api/login/refresh/', {},
                    { withCredentials: true }
                )
            } catch (authError) {
                if (window.location.pathname !== routes.LOGIN) {
                    window.location.href = routes.LOGIN
                }
                console.log("auth error", authError)
                return Promise.reject(authError)
            }
            return api.request(error.config)
        }

        return Promise.reject(error)
    }
);

export default api;