import axiosInstance, { interceptorAxiosInstance } from "@/utils/axiosInstance";

export type SignInType = {
	user: string;
	password: string;
};

class authServicesApi {
	// user sign api
	static signIn = async (data: SignInType) =>
		await axiosInstance.post("/auth/login-aippa", data);

	// user logout api
	static signOut = async () =>
		await axiosInstance.get(`/auth/logout-Aippa/${localStorage.getItem("id")}`);

	// loggedIn user api
	static getLoggedInUser = async () =>
		await axiosInstance.get(
			`/auth/student-Aippa/${localStorage.getItem("id")}`
		);

	// check is user loggedIn
	static checkIsLoggedIn = async () =>
		await interceptorAxiosInstance.get(
			`/auth/checkElligibilty/${localStorage.getItem("id")}`
		);
}

export default authServicesApi;
