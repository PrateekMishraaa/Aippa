import { Pie, PieChart } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { IResultScores } from "@/context/careerContext/CareerContext";

const RiasecPieChart = ({ score }: { score: IResultScores | null }) => {
	const riasecFullForm = {
		r: "Realistic",
		i: "Investigative",
		a: "Artistic",
		s: "Social",
		e: "Enterprising",
		c: "Conventional",
	};

	const chartData = Object.keys(score || {})
		.map((key, i) => {
			return {
				name: riasecFullForm[key as keyof IResultScores],
				score: score?.[key as keyof IResultScores],
				fill: `hsl(var(--chart-${i == 0 ? 2 : i}))`,
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

	const chartConfig = {
		score: {
			label: "score",
		},
		realistic: {
			label: "Realistic",
			color: "hsl(var(--chart-2))",

		},
		investigative: {
			label: "Investigative",
			color: "hsl(var(--chart-1))",
		},
		artistic: {
			label: "Artistic",
			color: "hsl(var(--chart-2))",
		},
		Social: {
			label: "Social",
			color: "hsl(var(--chart-3))",
		},
		enterprising: {
			label: "Enterprising",
			color: "hsl(var(--chart-4))",
		},
		conventional: {
			label: "Conventional",
			color: "hsl(var(--chart-5))",
		},
	} satisfies ChartConfig;

	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<Pie data={chartData} dataKey="score" label nameKey="name" />
			</PieChart>
		</ChartContainer>
	);
};

export default RiasecPieChart;
