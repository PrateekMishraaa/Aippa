import ContainerWrapper from "@/custom-components/ContainerWrapper";
import OverallStats from "@/custom-components/forYouComponents/OverallStats";
import OverallStatsCharts from "@/custom-components/forYouComponents/OverallStatsCharts";

const ForYou = () => {
	return (
		<ContainerWrapper className="space-y-5">
			<OverallStats />
			<OverallStatsCharts />
		</ContainerWrapper>
	);
};

export default ForYou;
