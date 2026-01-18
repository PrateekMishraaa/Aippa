import axiosInstance from "@/utils/axiosInstance";

interface GetFormData {
	id: string;
	email: string;
}

export interface CorrectionFormData {
	first_name?: string;
	last_name?: string;
	father_name?: string;
	contact?: string;
	email?: string;
	dob?: string;
	gender?: string;
	class?: string;
	stream?: string;
	isFormSubmitted?: boolean;
}

class CorrectionFormApi {
	static getFormData = async ({ id, email }: GetFormData) =>
		await axiosInstance.get(
			`institute/fetch-student-details?id=${id}&email=${email}`
		);

	static updateFormData = async (data: CorrectionFormData) => {
		return await axiosInstance.put("institute/update-student-details", {
			updatedDetails: data,
		});
	};
}

export default CorrectionFormApi;
