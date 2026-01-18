import { IResultScores } from "@/context/careerContext/CareerContext";
import WrapperBox from "@/custom-components/WrapperBox";
import {
	Bar,
	BarChart,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip as RechartsTooltip,
} from "recharts";
import RiasecLineChart from "./RiasecResultComponent/RiasecLineChart";
import RiasecPieChart from "./RiasecResultComponent/RiasecPieChart";
import { raisecResult } from "@/constants/careerResult/careerResult";
import RiasecCareerGuidanceTabs from "./RiasecResultComponent/RiasecCareerGuidanceTabs";

// note: custom tooltip for the bar chart --------------------------------
//eslint-disable-next-line
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-blue-900 flex items-center gap-5 px-5 py-3 rounded-lg">
				<p style={{ color: "white" }}>{label}</p>
				<p style={{ color: "white" }}>Score: {payload[0].value}</p>
			</div>
		);
	}

	return null;
};
// note: custom tooltip for the bar chart --------------------------------

const RiasecResult = ({ score }: { score: IResultScores | null }) => {
	const riasecFullForm = {
		r: "Realistic",
		i: "Investigative",
		a: "Artistic",
		s: "Social",
		e: "Enterprising",
		c: "Conventional",
	};

	const chartData = Object.keys(score || {})
		.map((key) => {
			return {
				name: riasecFullForm[key as keyof IResultScores],
				score: score?.[key as keyof IResultScores],
			};
		})
		.sort((a, b) => {
			const order = ["r", "i", "a", "s", "e", "c"]; // Define the order of the keys
			return (
				order.indexOf(
					Object.keys(riasecFullForm).find(
						(key) =>
							riasecFullForm[key as keyof typeof riasecFullForm] === a.name
					) || ""
				) -
				order.indexOf(
					Object.keys(riasecFullForm).find(
						(key) =>
							riasecFullForm[key as keyof typeof riasecFullForm] === b.name
					) || ""
				)
			);
		});

	const topThreeCategories = Object.keys(score || {})
		.sort(
			(a, b) =>
				(score?.[b as keyof IResultScores] || 0) -
				(score?.[a as keyof IResultScores] || 0)
		)
		.slice(0, 3);

	return (
		<WrapperBox>
			<div className="space-y-14">
				<div>
					<h2 className="text-2xl md:text-3xl font-semibold capitalize">
						Assessment Report
					</h2>
				</div>

				{/* riasec bar chart */}
				<div>
					<ResponsiveContainer width="100%" height={400}>
						<BarChart
							data={chartData}
							layout="vertical"
							margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
						>
							<XAxis
								type="number"
								domain={[0, 7]}
								padding={{ left: 10, right: 20 }}
							/>
							<YAxis
								type="category"
								dataKey="name"
								width={100}
								padding={{
									bottom: 10,
								}}
							/>
							<RechartsTooltip content={CustomTooltip} />
							<Bar dataKey="score" fill="#2463EB" radius={5}>
								<LabelList
									dataKey="score"
									position="insideRight"
									style={{ fill: "#fff" }}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* top 3 categories */}
				<div className="text-center space-y-5 !-mt-1">
					<h3 className="text-2xl font-semibold capitalize">
						Top 3 Categories:
					</h3>

					<div className="flex flex-wrap justify-center items-center gap-5 ">
						{topThreeCategories.map((cat) => (
							<p
								key={cat}
								className="px-5 py-3 rounded-md bg-blue-900 text-slate-100 shadow-lg"
							>
								{riasecFullForm[cat as keyof IResultScores]}
							</p>
						))}
					</div>

					<h4 className="text-2xl font-semibold">
						Understanding the <strong className="text-yuvaBlue">RIASEC</strong>{" "}
						Career Test
					</h4>

					<p className="text-left text-pretty">
						The RIASEC Test is a scientifically-backed assessment designed to
						help you understand your personality and match it with potential
						career paths. Developed by psychologist John L. Holland, this test
						categorizes personalities into six broad types and combines your
						scores to provide a comprehensive career recommendation.
					</p>
				</div>

				<div>
					<RiasecCareerGuidanceTabs />
				</div>

				{/* riasec line chart */}
				<div className="space-y-5">
					<h3 className="text-2xl font-semibold capitalize text-center">
						How Your Scores Were Combined
					</h3>

					<RiasecLineChart score={score} />

					<p>
						The graph above illustrates how your scores across different
						personality types were combined to determine the best career match
						for you. The scores reflect your dominant traits and how they align
						with potential work environments.
					</p>
				</div>

				{/* riasec pie chart */}
				<div className="space-y-5">
					<h3 className="text-2xl font-semibold capitalize text-center">
						Distribution of Your Personality Traits
					</h3>

					<div>
						<RiasecPieChart score={score} />
					</div>

					<p className="text-pretty">
						The pie chart provides a visual breakdown of your personality
						traits. Each slice represents a different aspect of your
						personality, giving you a clear picture of your strengths and
						preferences.
					</p>
				</div>

				{/* The Six Personality Types */}
				<div className="space-y-5">
					<h3 className="text-2xl font-semibold capitalize text-center">
						The <span className="text-yuvaBlue">Six</span> Personality Types
					</h3>

					{raisecResult.map((data) => {
						return (
							<div
								className="flex flex-wrap gap-5 items-center shadow-md shadow-primaryBg rounded-lg py-10"
								key={data.title}
							>
								<div className="w-full lg:flex-1 flex justify-center items-center">
									<img
										src={data.image}
										alt={data.title}
										className="w-56 h-56 "
									/>
								</div>
								<div className="w-full lg:flex-1 space-y-3">
									<h4 className="text-xl">
										<strong>{data.title}</strong>
									</h4>
									<p dangerouslySetInnerHTML={{ __html: data.desc }} />
									<div>
										<h5 className="font-medium">Careers Available :</h5>
										<ul className="flex flex-wrap gap-3 gap-y-1 pl-5 pr-28 mt-1">
											{data.careersAvailable.map((career) => (
												<li
													key={career}
													className="text-sm text-pretty text-yuvaBlue font-semibold"
												>
													{career}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Why Choose Us */}
				<div className="space-y-5">
					<h3 className="text-2xl font-semibold capitalize text-center">
						Why Choose Us?
					</h3>

					<p className="text-left text-pretty">
						Our platform offers a unique and engaging experience to explore and
						understand your career potential. We leverage cutting-edge AI
						algorithms to provide personalized career recommendations based on
						your RIASEC test results. Our user-friendly interface makes it easy
						to navigate through your results and discover career options that
						match your personality.
					</p>

					<p>
						The seamless integration of our frontend and backend systems ensures
						a smooth and responsive experience. Our robust backend
						infrastructure securely handles all data, providing you with
						accurate and reliable results. Choose us to benefit from our
						expertise and innovative approach to career counseling.
					</p>
				</div>
			</div>
		</WrapperBox>
	);
};

export default RiasecResult;
