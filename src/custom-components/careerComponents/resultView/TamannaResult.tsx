import { useEffect, useState } from "react";
import useCareer, { IRawScores } from "@/context/careerContext/CareerContext";
import WrapperBox from "@/custom-components/WrapperBox";
import arrowImage from "/careerComponents/tamannaTest/tamanna_result_arrow.webp";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";
import TamannaResultChart from "./TamannaResultComponents/TamannaResultChart";

interface ISubTests {
	category: string;
	stenScore: number;
	high: boolean;
	average: boolean;
	low: boolean;
}

interface IReportData {
	rawScores: IRawScores;
	subTests: ISubTests[];
}

const TamannaResult = () => {
	const { tamannaResult } = useCareer();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const [rawScore, setRawScore] = useState<number>();
	const [reportData, setReportData] = useState<IReportData | undefined>(
		undefined
	);
	const [descRowIndex, setDescRowIndex] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);

	const fullForms: { [key: string]: string } = {
		LA: "Language Aptitude",
		AR: "Abstract Reasoning",
		VR: "Verbal Reasoning",
		MR: "Mechanical Reasoning",
		NA: "Numerical Aptitude",
		SA: "Spatial Aptitude",
		PA: "Perceptual Aptitude",
	};

	const getFullFormsKeys = Object.keys(fullForms);

	useEffect(() => {
		if (loggedInUser && tamannaResult?.rawScore) {
			// note: calculate the raw score to show
			const rawScore = tamannaResult?.rawScore;
			const rawScoreValue = Object.values(rawScore);
			const totalRawScore = rawScoreValue.reduce(
				(totalScore, score) => totalScore + score,
				0
			);
			if (totalRawScore) setRawScore(totalRawScore);

			// note: calculate the report data to show
			const updatedSubTests = tamannaResult.stenScore.map((item) => {
				const key = Object.keys(item)[0];
				const stenScore = item[key];
				const range =
					stenScore <= 3 ? "low" : stenScore <= 7 ? "average" : "high";

				return {
					category: key,
					stenScore,
					high: range === "high",
					average: range === "average",
					low: range === "low",
				};
			});

			setReportData({
				rawScores: tamannaResult.rawScore,
				subTests: updatedSubTests,
			});
		}
	}, [loggedInUser, tamannaResult]);

	useEffect(() => {
		// Define the interval
		const intervalId = setInterval(() => {
			setDescRowIndex((prevIndex) => {
				// Check if index is not at the last item
				const nextIndex = prevIndex + 1;
				if (nextIndex < tamannaResult!.description!.length) {
					return nextIndex;
				} else {
					// Reset to 0 if the end of descriptions is reached
					return 0;
				}
			});
		}, 5000);

		// Cleanup the interval when the component unmounts
		return () => clearInterval(intervalId);
	}, [tamannaResult]);

	useEffect(() => {
		const progress = Math.round(
			+(descRowIndex / tamannaResult!.description.length) * 100
		);
		setProgress(progress + 15);
	}, [descRowIndex, tamannaResult]);

	return (
		<>
			<WrapperBox>
				{/* Result intro box */}
				<div className="flex flex-wrap gap-y-5 justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold uppercase text-yuvaBlue">
							Tamanna
						</h1>
						<p className="capitalize text-sm">
							Dashboard / <span className="text-yuvaBlue">view result</span>
						</p>
					</div>

					<div>
						<p className="text-2xl font-semibold capitalize text-end">
							Aptitude Test Report Sheet
						</p>

						<div>
							<img
								src={arrowImage}
								alt="tamanna"
								className="w-auto h-auto mt-2  relative -right-7"
							/>
						</div>
					</div>
				</div>

				{/* result table, student and result info */}

				<div className="w-full flex flex-wrap-reverse lg:flex-nowrap gap-5 items-center">
					{/* result table */}
					<div className="p-5 border w-full lg:w-9/12 rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>S no.</TableHead>
									<TableHead>Sub-Test</TableHead>
									<TableHead>Raw Score</TableHead>
									<TableHead>Sten Score</TableHead>
									<TableHead>High</TableHead>
									<TableHead>Average</TableHead>
									<TableHead>Low</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{reportData?.subTests?.map((test, i) => (
									<TableRow key={i}>
										<TableCell>{i + 1}</TableCell>
										<TableCell>{fullForms[test.category]}</TableCell> 
										<TableCell>
											{tamannaResult?.rawScore[test.category]}
										</TableCell>
										<TableCell>{test.stenScore}</TableCell>
										<TableCell>{test.high && <Check />}</TableCell>
										<TableCell>{test.average && <Check />}</TableCell>
										<TableCell>{test.low && <Check />}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{/* student and result info */}
					<div className="w-full lg:w-3/12">
						<div className="flex flex-wrap lg:flex-col items-center gap-5">
							{/* student name */}
							<div className="border-2 border-yuvaBlue/80 bg-yuvaBlue/20 rounded-lg flex-1 lg:w-full p-5">
								<h2 className="text-lg font-bold text-yuvaBlue">
									Student Name :
								</h2>
								<p className="text-sm text-slate-950">
									{loggedInUser?.first_name} {loggedInUser?.last_name}
								</p>
							</div>

							{/* attempts count */}
							<div className="border-2 border-yuvaBlue/80 bg-yuvaBlue/20  rounded-lg flex-1 lg:w-full p-5">
								<h2 className="text-lg font-bold text-yuvaBlue">
									Attempts Count :
								</h2>
								<p className="text-sm text-slate-950">
									{tamannaResult?.attemptCount}
								</p>
							</div>

							{/* result info raw score */}
							<div className="border-2 border-yuvaBlue/80 bg-yuvaBlue/20  rounded-lg flex-1 lg:w-full p-5">
								<h2 className="text-lg font-bold text-yuvaBlue">
									Total Raw Score :
								</h2>
								<p className="text-sm text-slate-950">{rawScore}</p>
							</div>
						</div>
					</div>
				</div>
			</WrapperBox>

			<WrapperBox className="mt-5">
				<div className="w-full flex flex-wrap gap-5 items-center">
					<div className="w-full xl:flex-1">
						<TamannaResultChart rawScoreData={tamannaResult!.rawScore} />
					</div>

					<div className="xl:flex-1">
						<div className="space-y-3 relative">
							<div className="absolute w-2 h-full rounded-full bg-slate-100 overflow-hidden">
								<div
									className="w-full h-40 bg-emerald-300 rounded-full transition-all duration-300"
									style={{ height: `${progress}%` }}
								></div>
							</div>
							{tamannaResult?.description.map((desc, i) => {
								const data = desc[getFullFormsKeys[i]];

								return (
									<div key={i} className="p-3 pl-5 space-y-1">
										<h3 className="text-lg font-semibold text-yuvaBlue">
											{fullForms[data.subtestCategory]}
										</h3>
										<div
											className={`overflow-hidden ${
												descRowIndex === i ? "" : "h-0"
											} `}
										>
											<p>{data.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</WrapperBox>
		</>
	);
};

export default TamannaResult;
