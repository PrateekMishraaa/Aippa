import careerServicesApi from "@/services/careerServices";
import { GetState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type RiasecCareerGuidanceTabsTypes = {
	careerId: number;
	careerDetails: string;
	careerName: string;
}[];

const RiasecCareerGuidanceTabs = () => {
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const [getTabsData, setTabsData] = useState<RiasecCareerGuidanceTabsTypes>(
		[]
	);
	const [selectTabId, setSelectTabId] = useState(0);
	const [getSelectTabData, setSelectTabData] = useState("");

	const { data } = useQuery({
		queryKey: ["riasecCareerGuidance"],
		queryFn: async () => await careerServicesApi.RiasecCareerGuidance(),
		enabled: !!loggedInUser,
	});

	useEffect(() => {
		if (data) {
			setTabsData(data.data.result);
			setSelectTabId(data.data.result[0].careerId);
		}
	}, [data]);

	useEffect(() => {
		const data = getTabsData.filter((data) => {
			return data.careerId === selectTabId && data;
		});

		if (data.length > 0) {
			setSelectTabData(data[0].careerDetails);
		} else {
			setSelectTabData("");
		}
	}, [selectTabId, getTabsData]);

	// Function to parse the career details
	const parseCareerDetails = (details: string) => {
		const lines = details.split("\n");

		const parsedDetails = lines.map((line, index) => {
			// Handle headers (e.g., ## or ###)
			if (line.startsWith("#### ")) {
				return <h4 key={index}>{line.replace("### ", "")}</h4>;
			} else if (line.startsWith("### ")) {
				return <h3 key={index}>{line.replace("### ", "")}</h3>;
			} else if (line.startsWith("## ")) {
				return <h2 key={index}>{line.replace("## ", "")}</h2>;
			} else if (line.startsWith("- ") || line.startsWith("* ")) {
				// Handle list items
				const modifiedLine = line.replace(/\*\*(.*?)\*\*/g, "$1"); // Remove ** around text in list items
				return <li key={index}>{modifiedLine.replace(/^\* |^- /, "")}</li>;
			} else if (line.trim() === "") {
				// Handle empty lines (e.g., for spacing)
				return <div key={index}>&nbsp;</div>;
			} else {
				// Remove the ** for bold text and replace with <strong>
				const modifiedLine = line.replace(
					/\*\*(.*?)\*\*/g,
					"<strong>$1</strong>"
				);
				return (
					<p key={index} dangerouslySetInnerHTML={{ __html: modifiedLine }} />
				);
			}
		});

		return parsedDetails;
	};

	return (
		<div className="pt-6 lg:pt-3 p-3 rounded-xl lg:flex border border-slate-50 shadow-xl">
			<div className="lg:pr-3 lg:border-r">
				<ul className="space-y-2">
					{getTabsData.map((data) => (
						<li
							key={data.careerId}
							className={`  ${
								data.careerId === selectTabId ? "bg-primaryBg" : ""
							} hover:bg-primaryBg px-5 py-3 rounded-lg cursor-pointer transition-all duration-500`}
							onClick={() => setSelectTabId(data.careerId)}
						>
							{data.careerName}
						</li>
					))}
				</ul>
			</div>

			<div className="flex-1 mt-3 lg:mt-0 border-t lg:border-0 pl-3">
				<div className="py-3">{parseCareerDetails(getSelectTabData)}</div>
			</div>
		</div>
	);
};

export default RiasecCareerGuidanceTabs;
