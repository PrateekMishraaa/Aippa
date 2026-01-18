import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { IRawScores } from "@/context/careerContext/CareerContext";

const fullForms: { [key: string]: string } = {
	LA: "Language Aptitude",
	AR: "Abstract Reasoning",
	VR: "Verbal Reasoning",
	MR: "Mechanical Reasoning",
	NA: "Numerical Aptitude",
	SA: "Spatial Aptitude",
	PA: "Perceptual Aptitude",
};

const TamannaResultChart = ({ rawScoreData }: { rawScoreData: IRawScores }) => {
	//

	const chartData = Object.entries(rawScoreData).map(([key, value]) => ({
		category: fullForms[key],
		score: value,
	}));

	const chartConfig = {
		score: {
			label: "Score",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<div className="flex justify-center">
			<div>
				<Card className="border-none shadow-none">
					<CardHeader>
						<CardTitle>Marks secured in every section</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="max-h-96 lg:h-96">
							<BarChart accessibilityLayer data={chartData} barGap={1}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="category"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent indicator="dashed" />}
								/>
								<Bar
									dataKey="score"
									fill="var(--color-score)"
									radius={4}
									barSize={50}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default TamannaResultChart;
