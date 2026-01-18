import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { IResultScores } from "@/context/careerContext/CareerContext";

const RiasecLineChart = ({ score }: { score: IResultScores | null }) => {
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
				key: riasecFullForm[key as keyof IResultScores],
				score: score?.[key as keyof IResultScores],
			};
		})
		.sort((a, b) => {
			const order = ["r", "i", "a", "s", "e", "c"]; // Define the order of the keys
			return (
				order.indexOf(
					Object.keys(riasecFullForm).find(
						(key) =>
							riasecFullForm[key as keyof typeof riasecFullForm] === a.key
					) || ""
				) -
				order.indexOf(
					Object.keys(riasecFullForm).find(
						(key) =>
							riasecFullForm[key as keyof typeof riasecFullForm] === b.key
					) || ""
				)
			);
		});

	const chartConfig = {
		score: {
			label: "Score",
			color: "#2463EB",
		},
	} satisfies ChartConfig;

	return (
		<div className="h-44 xs:h-40 md:h-80 w-3/4 mx-auto mt-10">
			<ChartContainer config={chartConfig} className="h-full w-full">
				<LineChart
					accessibilityLayer
					data={chartData}
					margin={{
						top: 20,
						left: 12,
						right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="key"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent indicator="line" />}
					/>
					<Line
						dataKey="score"
						type="natural"
						stroke="var(--color-score)"
						strokeWidth={2}
						dot={{
							fill: "var(--color-score)",
						}}
						activeDot={{
							r: 6,
						}}
					>
						<LabelList
							position="top"
							offset={12}
							className="fill-foreground"
							fontSize={12}
						/>
					</Line>
				</LineChart>
			</ChartContainer>
		</div>
	);
};

export default RiasecLineChart;
