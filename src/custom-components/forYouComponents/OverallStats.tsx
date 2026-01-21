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
			<div className="border border-gray-300 dark:border-gray-700 rounded-2xl bg-[url('/blueBackground.webp')] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black bg-cover bg-no-repeat bg-right-top overflow-hidden">
				{/* Main container with gray overlay in dark mode */}
				<div className="w-full h-full p-5 flex flex-col justify-between gap-10 md:gap-28 bg-white/50 dark:bg-gray-800/90">
					{/* Header section */}
					<div className="flex flex-wrap justify-between gap-5">
						<div>
							<h1 className="text-4xl font-semibold text-slate-950 dark:text-gray-100">
								Overall Stats
							</h1>
							<p className="text-sm text-pretty text-slate-600 dark:text-gray-300">
								as on {formattedDate}
							</p>
						</div>

						<div>
							<Select>
								<SelectTrigger className="w-[180px] focus:ring-0 bg-slate-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
									<SelectValue 
										placeholder={loggedInUser?.first_name} 
										className="dark:placeholder-gray-300"
									/>
								</SelectTrigger>
								<SelectContent className="dark:bg-gray-700 dark:border-gray-600">
									<SelectItem 
										value="light" 
										className="dark:text-gray-200 dark:focus:bg-gray-600"
									>
										{loggedInUser?.first_name}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Stats cards section */}
					<div className="flex flex-wrap justify-between gap-5">
						{overallStats
							.filter((stats) => stats.event !== "riasec Score" && stats.event !== "tamanna Score" && stats)
							.map((stats) => (
								<div
									key={stats.event}
									className="flex-1 min-w-[250px] rounded-xl bg-slate-100 dark:bg-gray-700/80 shadow-md dark:shadow-gray-900 p-5 text-pretty hover:shadow-lg dark:hover:shadow-gray-800 transition-shadow duration-300"
								>
									<div className="flex flex-col gap-3 sm:gap-5 md:gap-8">
										{/* Score section */}
										<div>
											<p className="text-lg">
												<strong className="text-slate-900 dark:text-white"> 
													{stats.score} 
												</strong>
												<span className="text-slate-600 dark:text-gray-400"> 
													{" "}/ {stats.total}
												</span>
											</p>
										</div>

										{/* Event name */}
										<div>
											<p className="sm:text-lg md:text-xl capitalize font-semibold text-slate-900 dark:text-gray-100">
												{stats.event}
											</p>
										</div>

										{/* Progress bar (optional) */}
										<div className="mt-2">
											<div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
												<div 
													className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
													style={{ 
														width: `${(stats.score / stats.total) * 100}%` 
													}}
												></div>
											</div>
											<p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
												{Math.round((stats.score / stats.total) * 100)}% completed
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