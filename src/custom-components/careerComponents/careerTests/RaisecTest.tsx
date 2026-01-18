import { useEffect, useState } from "react";
import WrapperBox from "@/custom-components/WrapperBox";
import { Progress } from "@/custom-components/customProgress";
import questionImages, { optionImages } from "@/constants/careerRaisecTest";
import { MoveLeft, MoveRight } from "lucide-react";
import { toast } from "sonner";
import useCareer from "@/context/careerContext/CareerContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import careerServicesApi, {
	IRiasecTestResult,
} from "@/services/careerServices";
import useHooks from "@/context/HookContext";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";

interface Option {
	text: string;
	score: number;
}

interface IQuestions {
	createdAt: string;
	id: number;
	option: Option[];
	order: number;
	text: string;
	type: string;
	updatedAt: string;
}

interface ICategoryScores {
	r: number;
	i: number;
	a: number;
	s: number;
	e: number;
	c: number;
}

const RaisecTest = () => {
	const { navigate } = useHooks();
	const { getQuestion: data, isLoading, test, attemptCount } = useCareer();
	const queryClient = useQueryClient();
	const [questions, setQuestions] = useState<IQuestions[]>([]);
	const [responses, setResponses] = useState<(number | null)[]>([]);
	const [currQuesIndex, setCurrQuesIndex] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [categoryScores, setCategoryScores] = useState<ICategoryScores>({
		r: 0,
		i: 0,
		a: 0,
		s: 0,
		e: 0,
		c: 0,
	});
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	// Note: post lsmt test result (score)
	const { mutateAsync } = useMutation({
		mutationFn: (data: IRiasecTestResult) =>
			careerServicesApi.postLsmtAndRiasecResult(data, test),
		onSuccess: async () => {
			navigate("/career");
			await queryClient.invalidateQueries({
				queryKey: ["checkTestAttempts"],
			});
		},
	});

	useEffect(() => {
		if (data) {
			setQuestions(data.data?.result || []);
			setResponses(Array(data.data?.result.length).fill(null));
		}
	}, [data]);

	useEffect(() => {
		setProgress((currQuesIndex / (questions.length - 1)) * 100);
	}, [currQuesIndex, questions.length]);

	const handleOptionClick = (optionIndex: number) => {
		const newResponses = [...responses];
		const questionType = questions[currQuesIndex].type;

		const previousResponse = newResponses[currQuesIndex];
		const selectedScore = questions[currQuesIndex].option[optionIndex].score;

		if (previousResponse === null) {
			newResponses[currQuesIndex] = optionIndex;
			setCategoryScores((prevScores) => ({
				...prevScores,
				[questionType]:
					prevScores[questionType as keyof ICategoryScores] + selectedScore,
			}));
		} else {
			newResponses[currQuesIndex] = optionIndex;
			const previousScore =
				questions[currQuesIndex].option[previousResponse].score;
			setCategoryScores((prevScores) => ({
				...prevScores,
				[questionType]:
					prevScores[questionType as keyof ICategoryScores] -
					previousScore +
					selectedScore,
			}));
		}

		setResponses(newResponses);

		if (currQuesIndex === questions.length - 1) {
			setIsCompleted(true);
		} else {
			handleNext();
		}
	};

	const handleSubmit = () => {
		const data = {
			userId: loggedInUser?.id,
			role: loggedInUser?.role,
			result: categoryScores,
			attemptCount: attemptCount ? attemptCount + 1 : 1,
		};

		if (
			responses.length === 42 &&
			responses.every((response) => response !== null)
		) {
			toast.promise(mutateAsync(data), {
				loading: "Loading...",
				success: "Your test has been submitted successfully!",
				error: () => "Something went wrong!!",
			});
		} else {
			toast.error("Please select all the questions.");
		}
	};

	const handleNext = () => {
		if (currQuesIndex < questions.length - 1) {
			setCurrQuesIndex(currQuesIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currQuesIndex > 0) {
			setCurrQuesIndex(currQuesIndex - 1);
		}
	};

	const question: IQuestions = questions[currQuesIndex];
	const questionImage = questionImages[currQuesIndex];

	return (
		<>
			{isLoading ? (
				<div className="text-center">Loading...</div>
			) : (
				<WrapperBox>
					{/* Progress bar */}
					<div className="space-y-5">
						<Progress value={progress} />
						<p>Progress: {Math.round(progress)}%</p>
					</div>

					{/* Question.. */}
					<div className="sm:flex items-center justify-between">
						<div>
							<h3 className="text-xl font-semibold">Question : </h3>
							<p className="py-3">
								Q{currQuesIndex + 1} : {question?.text}
							</p>
						</div>

						<div className="flex justify-center">
							<img
								src={questionImage}
								alt={question?.text}
								className="w-36 h-36 object-cover p-1"
							/>
						</div>
					</div>

					{/* select options  */}
					<div className="sm:flex justify-between items-end">
						<div className="flex flex-wrap justify-center sm:justify-normal gap-5">
							{question &&
								question.option.map((optionObj, index) => (
									<div
										key={index}
										onClick={() => handleOptionClick(index)}
										className={`border py-2 px-5 rounded-lg cursor-pointer hover:bg-slate-200 select-none flex flex-col items-center
                                        ${
																					responses[currQuesIndex] === index
																						? "bg-slate-200"
																						: "bg-transparent"
																				}`}
									>
										<div className="img-wrapper">
											<img src={optionImages[index]} alt={optionObj?.text} />
										</div>

										<p>
											<span>{optionObj.text}</span>
										</p>
									</div>
								))}
						</div>

						{/* Next/Previous buttons */}
						<div className="flex justify-center sm:justify-normal mt-10 sm:mt-0 items-center gap-2">
							<p
								onClick={() => handlePrev()}
								className="flex items-center gap-2 cursor-pointer"
							>
								<MoveLeft /> Previous
							</p>
							|
							{!isCompleted ? (
								<p
									onClick={() => handleNext()}
									className="flex items-center gap-2 cursor-pointer"
								>
									Next <MoveRight />
								</p>
							) : (
								<p onClick={handleSubmit} className="cursor-pointer">
									Submit
								</p>
							)}
						</div>
					</div>
				</WrapperBox>
			)}
		</>
	);
};

export default RaisecTest;
