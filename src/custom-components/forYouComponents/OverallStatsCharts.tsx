import useCareer from "@/context/careerContext/CareerContext";
import AreaChartComponent from "./charts/AreaChartComponent";
import BarChartComponent from "./charts/BarChartComponent";

import RadialChartComponent from "./charts/RadialChartComponent";

const OverallStatsCharts = () => {
	const { test } = useCareer();
	return (
		<>
			<div className="grid grid-cols-6 gap-x-5 gap-y-7">
				<div
					className={`p-5 col-span-6 sm:col-span-3 
						${test !== "lsmt" ? "md:col-span-3" : "md:col-span-2"} 
						border rounded-2xl shadow-md`}
				>
					<BarChartComponent />
				</div>
				<div
					className={`p-5 col-span-6 sm:col-span-3 
						${test !== "lsmt" ? "md:col-span-3" : "md:col-span-2"} 
						border rounded-2xl shadow-md`}
				>
					<AreaChartComponent />
				</div>
				{test === "lsmt" && (
					<div className=" p-5 col-span-6 sm:col-span-3 md:col-span-2 border rounded-2xl shadow-md">
						<RadialChartComponent />
					</div>
				)}
			</div>
		</>
	);
};

export default OverallStatsCharts;
