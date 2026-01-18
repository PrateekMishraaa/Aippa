import axios from "axios";
import envConfig from "@/config/envConfig";
import authServicesApi from "@/services/authService";

// Create the main Axios instance with the interceptor
const axiosInstance = axios.create({
	baseURL: envConfig.VITE_BACKEND_URI,
	withCredentials: true,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

// Create a separate Axios instance for the interceptor's internal requests
export const interceptorAxiosInstance = axios.create({
	baseURL: envConfig.VITE_BACKEND_URI,
	withCredentials: true,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
	async (config) => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const check = await authServicesApi.checkIsLoggedIn();
				if (!check.data.status) {
					localStorage.removeItem("token");
				}
			}
		} catch (error) {
			console.error("Error in checkIsLoggedIn:", error);
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
