import axiosInstance from "@/utils/axiosInstance";
import {
	Attempts,
	RawScore,
} from "@/custom-components/careerComponents/tamannaTest/TestScreen";


export interface LsmtTestResult {
	userId?: number;
	role?: string;
	result: number;
	attemptCount: number;
}

export interface IRiasecTestResult {
	userId?: number;
	role?: string;
	result: {
		r: number;
		i: number;
		a: number;
		s: number;
		e: number;
		c: number;
	};
	attemptCount: number;
}

export interface ITamannaTestResult {
	studentId: number | undefined;
	class: number | undefined;
	rawScore: RawScore;
	rawTotalScore: number;
	attemptHistory: Attempts;
}

class careerServicesApi {
	// note: get lsmt and raisec test services --------------------------------
	static getLsmtQuestion = async (test?: string) =>
		await axiosInstance.get(`api/v2/${test}Test/allQuestion`);

	// note: check lsmt, riasec and tamanna attempts common api --------------------------------
	// note: in this api this get attempt count and result details this is only works with tamanna api.
	static checkLsmtRiasecAttempts = async (userId?: number, test?: string) =>
		await axiosInstance.get(`/api/v2/${test}Test/getAttempt/${userId}/student`);

	// note: post lsmt, riasec and tamanna result common api --------------------------------
	static postLsmtAndRiasecResult = async (
		data: LsmtTestResult | IRiasecTestResult | ITamannaTestResult,
		test?: string
	) => await axiosInstance.post(`/api/v2/${test}Test/postAttempt`, data);

	// note: Riasec Career Guidance api --------------------------------
	static RiasecCareerGuidance = async () =>
		await axiosInstance.get(
			`/api/v2/riasecTest/riasec-careers/${localStorage.getItem("id")}`
		);

	// note: get tamanna question acc to sub-categories api--------------------------------
	static getTamannaQuestion = async (categoryId?: string) =>
		await axiosInstance.get(
			`/api/v2/tamannaTest/sub-category-questions/${categoryId}`
		);
}

export default careerServicesApi;
