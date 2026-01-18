import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
const chartData = [
	{ month: "January", raisec: 186, tamanna: 80 },
	{ month: "February", raisec: 305, tamanna: 200 },
	{ month: "March", raisec: 237, tamanna: 120 },
	{ month: "April", raisec: 73, tamanna: 190 },
	{ month: "May", raisec: 209, tamanna: 130 },
	{ month: "June", raisec: 214, tamanna: 140 },
];

const chartConfig = {
	raisec: {
		label: "Raisec",
		color: "#2563eb",
	},
	tamanna: {
		label: "Tamanna",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

const AreaChartComponent = () => {
	return (
		<Card className="flex flex-col bg-transparent border-none shadow-none">
			<CardHeader className="pb-0">
				<CardTitle>Marks</CardTitle>
			</CardHeader>

			<ChartContainer config={chartConfig}>
				<AreaChart
					accessibilityLayer
					data={chartData}
					margin={{
						left: 12,
						right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent indicator="dot" />}
					/>
					<Area
						dataKey="tamanna"
						type="natural"
						fill="var(--color-tamanna)"
						fillOpacity={0.4}
						stroke="var(--color-tamanna)"
						stackId="a"
					/>
					<Area
						dataKey="raisec"
						type="natural"
						fill="var(--color-raisec)"
						fillOpacity={0.4}
						stroke="var(--color-raisec)"
						stackId="a"
					/>
				</AreaChart>
			</ChartContainer>

			<CardFooter className="flex-col gap-2 text-sm mt-10">
				<div className="flex  gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total Events for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
};

export default AreaChartComponent;
