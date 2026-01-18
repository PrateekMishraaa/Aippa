import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useCareer from "@/context/careerContext/CareerContext";
import { GetState } from "@/store/store";

import { OverallStatsType } from "@/types/overallStatsTypes";
import { useSelector } from "react-redux";

const OverallStats = () => {
	const { test, testScore, questionLength } = useCareer();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);
	const date = new Date();
	const formattedDate = date.toLocaleDateString("en-GB");

	const overallStats: OverallStatsType = [
		{
			score: testScore,
			total: questionLength * 5,
			event: `${test} Score`,
		},
		{
			score: 10,
			total: 21,
			event: "21 Days Challenge",
		},
		{
			score: 25,
			total: 75,
			event: "75 Days Challenge",
		},
	];

	return (
		<>
			<div className="border rounded-2xl bg-[url('/blueBackground.webp')] bg-cover bg-no-repeat bg-right-top overflow-hidden">
				<div className="w-full h-full p-5 flex flex-col justify-between gap-10 md:gap-28 bg-white/50">
					<div className="flex flex-wrap justify-between gap-5">
						<div>
							<h1 className="text-4xl font-semibold text-slate-950">
								Overall Stats
							</h1>
							<p className="text-sm text-pretty">as on {formattedDate}</p>
						</div>

						<div>
							<Select>
								<SelectTrigger className="w-[180px] focus:ring-0 bg-slate-50">
									<SelectValue placeholder={loggedInUser?.first_name} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">
										{loggedInUser?.first_name}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex flex-wrap justify-between gap-5">
						{overallStats
							.filter((stats) => stats.event !== "riasec Score" && stats.event !== "tamanna Score" && stats)
							.map((stats) => (
								<div
									key={stats.event}
									className="flex-1 rounded-xl bg-slate-100 shadow-md p-5 text-pretty"
								>
									<div className="flex flex-col gap-3 sm:gap-5 md:gap-8 text-slate-800">
										<div>
											<p className="text-lg">
												<strong> {stats.score} /</strong> {stats.total}
											</p>
										</div>

										<div>
											<p className="sm:text-lg md:text-xl capitalize font-semibold">
												{stats.event}
											</p>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default OverallStats;
