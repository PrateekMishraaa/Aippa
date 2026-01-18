import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import useCareer from "@/context/careerContext/CareerContext";

const RadialChartComponent = () => {
	const { testScore, questionLength } = useCareer();
	const [totalEvents, setTotalEvents] = useState<number>(200);
	const [totalAttended, setTotalAttended] = useState<number>(170);

	useEffect(() => {
		setTotalEvents(questionLength * 5);
		setTotalAttended(testScore);
	}, [testScore, questionLength]);

	const chartData = [
		{
			month: "january",
			attended: totalAttended,
			notAttended: totalEvents - totalAttended,
		},
	];

	const chartConfig = {
		attended: {
			label: "Attended",
			color: "#2563eb",
		},
		notAttended: {
			label: "Not Attended",
			color: "#60a5fa",
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex flex-col bg-transparent border-none shadow-none">
			<CardHeader className="pb-0">
				<CardTitle>Events</CardTitle>
			</CardHeader>

			<ChartContainer
				config={chartConfig}
				className="mx-auto aspect-square w-full max-w-[250px] "
			>
				<RadialBarChart
					className="h-40"
					data={chartData}
					endAngle={180}
					innerRadius={80}
					outerRadius={130}
				>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) - 16}
												className="fill-foreground text-2xl font-bold"
											>
												{totalAttended}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 4}
												className="fill-muted-foreground"
											>
												attended of {totalEvents}
											</tspan>
										</text>
									);
								}
							}}
						/>
					</PolarRadiusAxis>
					<RadialBar
						dataKey="notAttended"
						fill="var(--color-notAttended)"
						stackId="a"
						cornerRadius={5}
						className="stroke-transparent stroke-2"
					/>
					<RadialBar
						dataKey="attended"
						stackId="a"
						cornerRadius={5}
						fill="var(--color-attended)"
						className="stroke-transparent stroke-2"
					/>
				</RadialBarChart>
			</ChartContainer>

			<CardFooter className="flex-col gap-2 text-sm">
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

export default RadialChartComponent;
