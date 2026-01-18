import { ChevronLeft, ChevronRight, CircleCheckBig, Timer } from "lucide-react";
import BreakScreen from "./BreakScreen";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import careerServicesApi, {
	ITamannaTestResult,
} from "@/services/careerServices";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/custom-components/careerComponents/tamannaTest/TamannaProgress";
import { subTestName } from "@/constants/tamannaConstant/breakScreen";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import useCareer from "@/context/careerContext/CareerContext";
import useHooks from "@/context/HookContext";

type QuestionOption = {
	key: string;
	value: string;
}[];

type Question = {
	correctOption: "A" | "B" | "C" | "D";
	createdAt: string;
	id: number;
	option: QuestionOption;
	optionImg: string | null;
	question: string;
	questionImg: string | null;
	subTestCategory: string;
	updatedAt: string;
	selectedOption?: string | number;
};

export type Attempts = {
	[key: string]: {
		[questionId: number]: string; // This will store the selected option for each question.
	};
};

export type RawScore = {
	[tab: string]: number;
};

const TestScreen = () => {
	// note: Get the currently logged-in user -----
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	// note: Destructure test data from career context and navigation functions -----
	const { test } = useCareer();
	const { navigate } = useHooks();

	// note: Initialize query client for cache management -----
	const queryClient = useQueryClient();

	// note: Define the order of the test sections -----
	const tabOrder: string[] = ["LA", "AR", "VR", "MR", "NA", "SA", "PA"];

	// note: State variables for managing test state and timing -----
	const [isBreak, setIsBreak] = useState<boolean>(true);
	const [timeLeft, setTimeLeft] = useState<number>(600);
	const [breakTimeLeft, setBreakTimeLeft] = useState<number>(120);
	const [activeTab, setActiveTab] = useState(tabOrder[0]);

	// note: State variables for managing questions and user progress -----
	const [questions, setQuestions] = useState<Question[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [attemptedQuestions, setAttemptedQuestions] = useState<number[]>([]);
	const [attempts, setAttempts] = useState<Attempts>({});
	const [progress, setProgress] = useState<number>(0);

	// note: Initialize raw scores for each section of the test -----
	const [rawScore, setRawScore] = useState<RawScore>(
		tabOrder.reduce((acc, tab) => ({ ...acc, [tab]: 0 }), {})
	);

	// note: Timer logic for break and test sections -----

	useEffect(() => {
		let timer: ReturnType<typeof setInterval>;
		if (isBreak) {
			timer = setInterval(() => {
				setBreakTimeLeft((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						startNextSection();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} else {
			timer = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						handleDialog();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [isBreak, breakTimeLeft, timeLeft]);

	// note: Start the next section when the break time ends -----
	const startNextSection = () => {
		setIsBreak(false);
		setTimeLeft(600);
	};

	// note: Fetch questions for the active test section -----
	const { data } = useQuery({
		queryKey: ["tamannaQuestions", activeTab],
		queryFn: () => careerServicesApi.getTamannaQuestion(activeTab),
		enabled: !!loggedInUser,
	});

	useEffect(() => {
		if (data) {
			const fetchedQuestions = data.data.result.map((q: Question) => ({
				id: q.id,
				question: q.question || "",
				questionImg: q.questionImg || "",
				option: Object.entries(q.option || {}).map(([key, value]) => ({
					key,
					value,
				})),
				optionImg: q.optionImg || "",
				correctOption: q.correctOption || "A",
				subTestCategory: activeTab,
			}));

			setQuestions(fetchedQuestions);
			setCurrentQuestionIndex(0);
			setAttemptedQuestions([]);
			setTimeLeft(600);
		}
	}, [data, activeTab]);

	// note: Handle the option selection for the current question -----
	const handleOptionChange = (selectedKey: string) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) =>
				q.id === questions[currentQuestionIndex].id
					? { ...q, selectedOption: selectedKey }
					: q
			)
		);

		setAttemptedQuestions((prevAttempted) => {
			const currentId = questions[currentQuestionIndex].id;
			if (!prevAttempted.includes(currentId)) {
				return [...prevAttempted, currentId];
			}
			return prevAttempted;
		});

		setAttempts((prev) => ({
			...prev,
			[activeTab]: {
				...(prev[activeTab] || {}),
				[questions[currentQuestionIndex].id]: selectedKey,
			},
		}));
		handleNext();
	};

	// note: Handle question selection from the question count menu -----
	const handleQuestionClick = (index: number) => {
		setCurrentQuestionIndex(index);
	};

	// note: Update progress bar based on attempted questions -----
	useEffect(() => {
		setProgress(
			Math.round(+(attemptedQuestions.length / questions.length) * 100)
		);
	}, [attemptedQuestions, questions]);

	// note:  Move to the next question in the test -----
	const handleNext = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		}
	};

	// note: Move to the previous question in the test -----
	const handlePrev = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
		}
	};

	// note: Mutation for submitting test results -----
	const { mutateAsync } = useMutation({
		mutationFn: (data: ITamannaTestResult) =>
			careerServicesApi.postLsmtAndRiasecResult(data, test),

		onSuccess: async () => {
			localStorage.removeItem("phase");
			navigate("/career");

			await queryClient.invalidateQueries({
				queryKey: ["checkTestAttempts"],
			});
		},
	});

	// note: Calculate the score for the current section -----
	const calculateSectionScore = () => {
		const currentTab = activeTab;
		let sectionScore = 0;
		if (attempts[currentTab]) {
			for (const [id, selectedOption] of Object.entries(attempts[currentTab])) {
				const question = questions.find((q) => q.id === parseInt(id));
				if (question && question.correctOption === selectedOption) {
					sectionScore += 1;
				}
			}
		}
		return sectionScore;
	};

	// note: Handle dialog when time runs out or click on finish button for a section -----
	const handleDialog = () => {
		const currentTabIndex = tabOrder.indexOf(activeTab);

		const sectionScore = calculateSectionScore();

		if (currentTabIndex === tabOrder.length - 1) {
			handleSubmitFinalSection({
				...rawScore,
				[activeTab]: sectionScore,
			});
		} else {
			setRawScore((prevScore) => ({
				...prevScore,
				[activeTab]: sectionScore,
			}));
			const nextTab = tabOrder[currentTabIndex + 1];
			setActiveTab(nextTab);

			if (currentTabIndex === 2) {
				setBreakTimeLeft(300);
			} else {
				setBreakTimeLeft(120);
			}
			setIsBreak(true);
		}
	};

	// note: Submit the final test results -----
	const handleSubmitFinalSection = async (finalRawScore: RawScore) => {
		const rawTotalScore: number = Object.values(finalRawScore).reduce(
			(total, score) => total + score,
			0
		);

		const payload = {
			studentId: loggedInUser?.id,
			class: loggedInUser?.class,
			rawScore: finalRawScore,
			rawTotalScore,
			attemptHistory: attempts,
		};

		toast.promise(mutateAsync(payload), {
			loading: "Submitting your test results, please wait...",
			success: "Your test has been submitted successfully!",
			error:
				"Oops, something went wrong while submitting your test. Please try again.",
		});
	};

	return (
		<>
			{!isBreak ? (
				// note: test screen
				<div className="select-none">
					{/* number of questions and timer */}
					<div className="flex flex-wrap-reverse gap-y-5 justify-between">
						<div className="w-full lg:w-[80%] border-2 rounded-lg shadow-lg p-5">
							{/* total questions  */}
							<div className="h-full flex flex-wrap gap-5">
								<div className="w-full md:w-36">
									<p className="text-sm text-center">
										No. of Questions (Per Section)
									</p>
								</div>

								{/* Total questions   */}
								<div className="flex-1">
									<div className="flex flex-wrap gap-3">
										{questions.map((q, index) => (
											<div
												className={` ${
													attemptedQuestions.includes(q.id) &&
													"bg-tamannaGreen text-slate-100"
												} w-8 h-8 flex items-center justify-center border border-tamannaGreen rounded-full cursor-pointer relative`}
												key={q.id}
												// attempted={attemptedQuestions.includes(q.id)}
												onClick={() => handleQuestionClick(index)}
											>
												{index === currentQuestionIndex && (
													<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-yellow-300 border border-tamannaGreen"></div>
												)}
												{index + 1}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* timer */}
						<div className="w-full lg:w-2/12 border-2 border-red-500 bg-red-100 rounded-lg p-5 shadow-lg shadow-red-200">
							<p className="text-red-500">
								<span className="flex items-center gap-1.5">
									<Timer /> Time Left
								</span>
								{Math.floor(timeLeft / 60)}:
								{String(timeLeft % 60).padStart(2, "0")} Minutes Hurry Up!!
							</p>
						</div>
					</div>

					{/* main body */}
					<div className="w-11/12 mx-auto mt-5">
						{/* main body above section */}
						<div className="mb-5 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<p>Aptitude Test</p>
								<div className="h-7 w-0.5 bg-blue-500"></div>
								<p className="text-slate-500">
									Section : {subTestName[tabOrder.indexOf(activeTab)]}{" "}
								</p>
							</div>

							<div>
								<p className="text-slate-500">
									<strong className="text-blue-500">Attempted :</strong>{" "}
									{attemptedQuestions.length}/{questions.length}
								</p>
							</div>
						</div>

						{/* main body question ans section */}
						<div className="border rounded-lg relative p-10">
							{/* tabs shows test categories */}
							<div className="flex flex-col gap-y-2 absolute top-1/2 -translate-y-1/2 -left-5">
								{tabOrder.map((tab, index) => (
									<div
										key={index}
										className={`bg-white ${
											activeTab === tab && "border-2 border-tamannaGreen"
										} ${
											index < tabOrder.indexOf(activeTab) &&
											"!bg-tamannaGreen text-white"
										}  cursor-default w-10 h-10 flex items-center justify-center rounded-full shadow-md `}
									>
										{tab}
									</div>
								))}
							</div>

							{/* questions, options, buttons and progress bar */}
							<div className="space-y-5">
								{/* question no */}
								<h6 className="text-slate-500 text-pretty">
									Question No. {currentQuestionIndex + 1}
								</h6>

								{/* Question Text */}
								<h3 className="text-slate-900">
									Question: {questions[currentQuestionIndex].question}
								</h3>

								{/* Question Image */}
								{/* todo: update question images size. image is not available */}
								{questions[currentQuestionIndex]?.questionImg && (
									<div>
										<img
											src={questions[currentQuestionIndex]?.questionImg}
											alt="Question"
											className=""
										/>
									</div>
								)}

								{/* Option Image */}
								{/* todo: update question images size. image is not available */}
								{questions[currentQuestionIndex]?.optionImg && (
									<div>
										<img
											src={questions[currentQuestionIndex]?.optionImg}
											alt="Option"
											className=""
										/>
									</div>
								)}

								{/* Select the Option from options */}
								<RadioGroup
									value={String(
										questions[currentQuestionIndex]?.selectedOption
									)}
								>
									{questions[currentQuestionIndex]?.option?.map(
										(option, answerI) => (
											<div
												className="flex items-center justify-between px-5 py-3 rounded-lg border border-blue-600"
												key={answerI}
											>
												<Label
													htmlFor={`${option.key}`}
													className="cursor-pointer"
												>
													{option.key}: {option.value}
												</Label>

												<RadioGroupItem
													value={option.key}
													id={`${option.key}`}
													onClick={() => handleOptionChange(option.key)}
												/>
											</div>
										)
									)}
								</RadioGroup>

								{/* progress bar */}
								<div className="flex-1 flex items-center gap-2">
									<p>Progress: </p>
									<Progress value={progress} className="bg-blue-100" />
									<p> {progress}% </p>
								</div>

								{/* buttons(previous, next), progressBar, finish/submit button */}
								<div className="flex items-center justify-between gap-2">
									{/* previous and next buttons */}
									<div className="flex space-x-3">
										<button
											onClick={handlePrev}
											className="border p-2 rounded-full flex items-center bg-blue-100"
										>
											<div className="bg-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center">
												<ChevronLeft />
											</div>
											<p className="px-3">Previous</p>
										</button>

										<button
											onClick={handleNext}
											className="border p-2 rounded-full flex items-center bg-blue-100"
										>
											<p className="px-3">Next</p>

											<div className="bg-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center">
												<ChevronRight />
											</div>
										</button>
									</div>

									{/* finish button */}
									<div>
										<AlertDialog>
											<AlertDialogTrigger className="border p-2 rounded-full flex items-center bg-blue-100">
												<p className="px-3">Finish</p>

												<div className="bg-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center">
													<CircleCheckBig />
												</div>
											</AlertDialogTrigger>

											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle className="text-slate-950">
														Confirm Section Submission
													</AlertDialogTitle>
													<AlertDialogDescription>
														Are you sure you want to submit your progress for
														this section?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction onClick={handleDialog}>
														Continue
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				// note: break screen
				<BreakScreen
					breakTimeLeft={breakTimeLeft}
					breakScreenOrder={tabOrder.indexOf(activeTab)}
					onSkip={startNextSection}
				/>
			)}
		</>
	);
};

export default TestScreen;
