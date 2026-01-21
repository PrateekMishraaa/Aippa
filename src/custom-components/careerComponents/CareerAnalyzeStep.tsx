import { Button } from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import useCareer from "@/context/careerContext/CareerContext";
import useHooks from "@/context/HookContext";

const CareerAnalyzeStep = () => {
	const { questionLength, test, attemptCount } = useCareer();
	const { isLoggedIn } = useAuth();
	const { navigate } = useHooks();

	return (
		<div>
			{/* step: 1 */}
			<div className="py-5 md:flex relative">
				<div className="border border-slate-50 dark:border-gray-800 px-10 py-14 md:w-2/4 rounded-xl bg-white dark:bg-gray-900 z-[1] shadow-lg dark:shadow-gray-950">
					<h3 className="text-2xl font-semibold text-slate-950 dark:text-gray-100">
						Step 1
					</h3>
					<p className="text-slate-700 dark:text-gray-300">
						Users give answers of all the {!!questionLength && questionLength}{" "}
						questions based on {!!questionLength && 6} personality types.
					</p>

					{isLoggedIn && (
						<Button
							className="mt-5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
							disabled={attemptCount === 2}
							onClick={() =>
								navigate(`/career/${test === "riasec" ? "raisec" : test}`)
							}
						>
							Start test
						</Button>
					)}
				</div>

				<div className="hidden md:block absolute w-1/4 h-3/4 border-t-4 border-r-4 border-dotted border-slate-950 dark:border-gray-700 rounded-xl top-1/2 left-1/2 -translate-x-1/3 lg:-translate-x-1/2">
					<div className="w-full h-full relative">
						<img
							src="/downArrow.webp"
							alt="arrow"
							className="absolute top-1/2 -translate-y-1/2 -right-[22px] h-10 w-10 bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-full p-1"
						/>
					</div>
				</div>
			</div>

			{/* step: 2 */}
			<div className="py-5 md:flex justify-end relative">
				<div className="border border-slate-50 dark:border-gray-800 px-10 py-14 md:w-2/4 rounded-xl bg-white dark:bg-gray-900 z-[1] shadow-lg dark:shadow-gray-950">
					<h3 className="text-2xl font-semibold text-slate-950 dark:text-gray-100">
						Step 2
					</h3>
					<p className="text-slate-700 dark:text-gray-300">
						Scores are calculated for each personality type based on responses
					</p>

					{isLoggedIn && (
						<Button
							className="mt-5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
							onClick={() => navigate(`/career/result`)}
							disabled={attemptCount === 0}
						>
							Check result
						</Button>
					)}
				</div>

				<div className="hidden md:block absolute w-1/4 h-3/4 border-t-4 border-l-4 border-dotted border-slate-950 dark:border-gray-700 rounded-xl top-1/2 right-1/2 translate-x-1/3 lg:translate-x-1/2">
					<div className="w-full h-full relative">
						<img
							src="/downArrow.webp"
							alt="arrow"
							className="absolute top-1/2 -translate-y-1/2 -left-[22px] h-10 w-10 bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-full p-1"
						/>
					</div>
				</div>
			</div>

			{/* step: 3 */}
			<div className="py-5 md:flex relative">
				<div className="border border-slate-50 dark:border-gray-800 px-10 py-14 md:w-2/4 rounded-xl bg-white dark:bg-gray-900 z-[1] shadow-lg dark:shadow-gray-950">
					<h3 className="text-2xl font-semibold text-slate-950 dark:text-gray-100">
						Step 3
					</h3>
					<p className="text-slate-700 dark:text-gray-300">
						Scores are compared to determine the dominant personality types.
					</p>
				</div>

				<div className="hidden md:block absolute w-1/4 h-3/4 border-t-4 border-r-4 border-dotted border-slate-950 dark:border-gray-700 rounded-xl top-1/2 left-1/2 -translate-x-1/3 lg:-translate-x-1/2">
					<div className="w-full h-full relative">
						<img
							src="/downArrow.webp"
							alt="arrow"
							className="absolute top-1/2 -translate-y-1/2 -right-[22px] h-10 w-10 bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-full p-1"
						/>
					</div>
				</div>
			</div>

			{/* step: 4 */}
			<div className="py-5 md:flex justify-end">
				<div className="border border-slate-50 dark:border-gray-800 px-10 py-14 md:w-2/4 rounded-xl bg-white dark:bg-gray-900 z-[1] shadow-lg dark:shadow-gray-950">
					<h3 className="text-2xl font-semibold text-slate-950 dark:text-gray-100">
						Step 4
					</h3>
					<p className="text-slate-700 dark:text-gray-300">
						Results are then combined to provide career recommendations
					</p>
				</div>
			</div>
		</div>
	);
};

export default CareerAnalyzeStep;