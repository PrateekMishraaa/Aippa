import axiosInstance from "@/utils/axiosInstance";

class healthServiceApis {
	// get children data by parent id and children id (if provided)
	static getHealthData = async (parentId?: number, childrenId?: string) =>
		await axiosInstance.get(
			`/health/getChildren?parentId=${parentId}&childrenId=${
				childrenId ? childrenId : ""
			}`
		);

	// add or edit children
}

export default healthServiceApis;
