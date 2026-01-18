import { AxiosRequestConfig } from "axios";

const axiosRequestConfig = (additionalConfig?: AxiosRequestConfig) => ({
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		...additionalConfig?.headers, // Merge additional headers if provided
	},
	...additionalConfig,
});

export default axiosRequestConfig;
