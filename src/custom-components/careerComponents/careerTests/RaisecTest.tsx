import { useEffect, useState } from "react";
import WrapperBox from "@/custom-components/WrapperBox";
import { Progress } from "@/custom-components/customProgress";
import questionImages, { optionImages } from "@/constants/careerRaisecTest";
import { MoveLeft, MoveRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import useCareer from "@/context/careerContext/CareerContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import careerServicesApi, {
	IRiasecTestResult,
} from "@/services/careerServices";
import useHooks from "@/context/HookContext";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import { useTheme } from "@/context/ThemeContext/ThemeContext"; // Add theme context

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

interface ApiResponse {
	result: IQuestions[];
	message?: string;
	success?: boolean;
}

const RaisecTest = () => {
	const { navigate } = useHooks();
	const [questionData, setQuestionData] = useState<IQuestions[]>([]);
	const { getQuestion: data, isLoading, test, attemptCount } = useCareer();
	const queryClient = useQueryClient();
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
	const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);
	
	// Add theme context
	const { theme } = useTheme();
	const isDark = theme === 'dark';

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
		if (data?.data?.result && data.data.result.length > 0) {
			setQuestionData(data.data.result);
			setResponses(Array(data.data.result.length).fill(null));
		}
	}, [data]);

	useEffect(() => {
		if (questionData.length > 0) {
			setProgress((currQuesIndex / (questionData.length - 1)) * 100);
		}
	}, [currQuesIndex, questionData.length]);

	useEffect(() => {
		const fetchQuestionData = async () => {
			if ((!data || !data.data?.result || data.data.result.length === 0) && !loadingQuestions && questionData.length === 0) {
				setLoadingQuestions(true);
				setError(null);
				try {
					const response = await axios.get<ApiResponse>(
						'http://localhost:3100/api/v2/riasecTest/allQuestion'
					);
					
					console.log("this is risec question data", response.data);
					
					if (response.data.result && response.data.result.length > 0) {
						setQuestionData(response.data.result);
						setResponses(Array(response.data.result.length).fill(null));
					} else {
						setError("No questions found");
						toast.error("No questions available");
					}
					
				} catch (err) {
					console.error("Error fetching questions:", err);
					setError("Failed to load questions. Please try again.");
					toast.error("Failed to load questions");
				} finally {
					setLoadingQuestions(false);
				}
			}
		};

		fetchQuestionData();
	}, [data, loadingQuestions, questionData.length]);

	const handleOptionClick = (optionIndex: number) => {
		if (!questionData[currQuesIndex]) return;

		const newResponses = [...responses];
		const questionType = questionData[currQuesIndex].type;

		const previousResponse = newResponses[currQuesIndex];
		const selectedScore = questionData[currQuesIndex].option[optionIndex].score;

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
				questionData[currQuesIndex].option[previousResponse].score;
			setCategoryScores((prevScores) => ({
				...prevScores,
				[questionType]:
					prevScores[questionType as keyof ICategoryScores] -
					previousScore +
					selectedScore,
			}));
		}

		setResponses(newResponses);

		if (currQuesIndex === questionData.length - 1) {
			setIsCompleted(true);
		} else {
			handleNext();
		}
	};

	const handleSubmit = () => {
		if (!loggedInUser) {
			toast.error("User not logged in");
			return;
		}

		const unansweredQuestions = responses.filter(response => response === null);
		if (unansweredQuestions.length > 0) {
			toast.error(`Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`);
			return;
		}

		const data = {
			userId: loggedInUser.id,
			role: loggedInUser.role,
			result: categoryScores,
			attemptCount: attemptCount ? attemptCount + 1 : 1,
		};

		toast.promise(mutateAsync(data), {
			loading: "Submitting your test...",
			success: "Your test has been submitted successfully!",
			error: (error) => {
				console.error("Submission error:", error);
				return "Something went wrong while submitting your test!";
			},
		});
	};

	const handleNext = () => {
		if (currQuesIndex < questionData.length - 1) {
			setCurrQuesIndex(currQuesIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currQuesIndex > 0) {
			setCurrQuesIndex(currQuesIndex - 1);
		}
	};

	// Theme-based classes
	const textClass = isDark ? 'text-gray-300' : 'text-gray-800';
	const mutedTextClass = isDark ? 'text-gray-400' : 'text-gray-600';
	const bgClass = isDark ? 'bg-gray-800' : 'bg-gray-50';
	const borderClass = isDark ? 'border-gray-700' : 'border-gray-200';
	const optionBgClass = isDark ? 'bg-gray-900' : 'bg-white';
	const optionHoverClass = isDark ? 'hover:bg-gray-800 hover:border-blue-700' : 'hover:bg-gray-50 hover:border-blue-300';
	const optionSelectedBgClass = isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-500';
	const buttonDisabledClass = isDark ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed';
	const optionIconBgClass = isDark ? 'bg-gray-800' : 'bg-gray-100';
	const questionBgClass = isDark ? 'bg-gray-900/50' : 'bg-gray-50';
	const buttonPrimaryClass = isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600';
	const buttonSuccessClass = isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600';
	const imageBorderClass = isDark ? 'border-gray-700' : 'border-gray-300';
	const successTextClass = isDark ? 'text-green-400' : 'text-green-600';
	const infoTextClass = isDark ? 'text-blue-400' : 'text-blue-600';

	// Get current question
	const currentQuestion = questionData[currQuesIndex];
	
	// Get question image
	const questionImage = questionImages[currQuesIndex % questionImages.length] || questionImages[0];

	if ((loadingQuestions || isLoading) && questionData.length === 0) {
		return (
			<WrapperBox>
				<div className={`text-center py-10 ${textClass}`}>
					<div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-gray-300' : 'border-gray-900'} mx-auto`}></div>
					<p className={`mt-4 ${mutedTextClass}`}>Loading questions...</p>
				</div>
			</WrapperBox>
		);
	}

	if (error && questionData.length === 0) {
		return (
			<WrapperBox>
				<div className={`text-center py-10 ${isDark ? 'text-red-400' : 'text-red-500'}`}>
					<p className="text-lg font-semibold">{error}</p>
					<button 
						onClick={() => window.location.reload()}
						className={`mt-4 px-4 py-2 ${buttonPrimaryClass} text-white rounded`}
					>
						Try Again
					</button>
				</div>
			</WrapperBox>
		);
	}

	if (questionData.length === 0) {
		return (
			<WrapperBox>
				<div className={`text-center py-10 ${textClass}`}>
					<p>No questions available at the moment.</p>
				</div>
			</WrapperBox>
		);
	}

	return (
		<WrapperBox>
			{/* Progress bar */}
			<div className="space-y-5 mb-8">
				<Progress value={progress} />
				<div className="flex justify-between items-center">
					<p className={`text-sm ${mutedTextClass}`}>
						Progress: {Math.round(progress)}%
					</p>
					<p className={`text-sm ${mutedTextClass}`}>
						Question {currQuesIndex + 1} of {questionData.length}
					</p>
				</div>
			</div>

			{/* Question */}
			<div className="sm:flex items-center justify-between mb-8 gap-6">
				<div className="flex-1">
					<h3 className={`text-xl font-semibold mb-4 ${textClass}`}>Question :</h3>
					<div className={`${questionBgClass} p-4 rounded-lg ${borderClass} border`}>
						<p className={`py-3 text-lg ${textClass}`}>
							<span className={`font-medium ${textClass}`}>Q{currQuesIndex + 1}:</span> {currentQuestion?.text}
						</p>
					</div>
				</div>

				{questionImage && (
					<div className="flex justify-center mt-4 sm:mt-0">
						<img
							src={questionImage}
							alt={currentQuestion?.text || "Question image"}
							className={`w-36 h-36 object-cover p-1 border rounded-lg ${imageBorderClass}`}
						/>
					</div>
				)}
			</div>

			{/* Select options */}
			<div className="sm:flex justify-between items-end">
				<div className="flex-1">
					<h3 className={`text-xl font-semibold mb-4 ${textClass}`}>Select your answer:</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{currentQuestion &&
							currentQuestion.option.map((optionObj, index) => (
								<div
									key={index}
									onClick={() => handleOptionClick(index)}
									className={`
										border-2 rounded-lg cursor-pointer transition-all duration-200 
										select-none p-4 flex items-center gap-4
										${responses[currQuesIndex] === index
											? `${optionSelectedBgClass}`
											: `${optionBgClass} ${borderClass} ${optionHoverClass}`
										}
									`}
								>
									<div className="flex-shrink-0">
										<div className={`w-10 h-10 flex items-center justify-center rounded-full ${optionIconBgClass}`}>
											{optionImages[index] ? (
												<img 
													src={optionImages[index]} 
													alt={optionObj?.text}
													className="w-6 h-6"
												/>
											) : (
												<span className={`font-semibold ${textClass}`}>{String.fromCharCode(65 + index)}</span>
											)}
										</div>
									</div>
									<div>
										<p className={`font-medium ${textClass}`}>{optionObj.text}</p>
										{responses[currQuesIndex] === index && (
											<p className={`text-sm mt-1 ${successTextClass}`}>✓ Selected</p>
										)}
									</div>
								</div>
							))}
					</div>
				</div>

				{/* Navigation buttons */}
				<div className="mt-8 sm:mt-0 sm:ml-8 flex flex-col items-center">
					<div className="flex items-center gap-4">
						<button
							onClick={handlePrev}
							disabled={currQuesIndex === 0}
							className={`
								flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
								${currQuesIndex === 0
									? `${buttonDisabledClass}`
									: `${buttonPrimaryClass} text-white cursor-pointer`
								}
							`}
						>
							<MoveLeft size={20} /> Previous
						</button>
						
						{!isCompleted ? (
							<button
								onClick={handleNext}
								disabled={currQuesIndex === questionData.length - 1}
								className={`
									flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
									${currQuesIndex === questionData.length - 1
										? `${buttonDisabledClass}`
										: `${buttonPrimaryClass} text-white cursor-pointer`
									}
								`}
							>
								Next <MoveRight size={20} />
							</button>
						) : (
							<button
								onClick={handleSubmit}
								className={`flex items-center gap-2 px-6 py-2 ${buttonSuccessClass} text-white rounded-lg transition-colors cursor-pointer`}
							>
								Submit Test
							</button>
						)}
					</div>
					
					{isCompleted && (
						<p className={`mt-4 text-sm text-center ${successTextClass}`}>
							✓ All questions answered! Click Submit to finish.
						</p>
					)}
					
					{responses[currQuesIndex] !== null && !isCompleted && (
						<p className={`mt-4 text-sm text-center ${infoTextClass}`}>
							✓ Answer saved. Move to next question.
						</p>
					)}
				</div>
			</div>

			{/* Optional: Quick navigation dots (uncomment if needed) */}
			{/* <div className="mt-12">
				<h4 className={`text-lg font-semibold mb-4 ${textClass}`}>Question Navigation:</h4>
				<div className="flex flex-wrap gap-2">
					{questionData.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrQuesIndex(index)}
							className={`
								w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors
								${index === currQuesIndex
									? `${buttonPrimaryClass} text-white`
									: responses[index] !== null
									? `${isDark ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-green-100 text-green-700 border-green-300'} border`
									: `${isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-300'} border`
								}
								${isDark ? 'hover:bg-gray-700 hover:text-gray-300' : 'hover:bg-gray-200 hover:text-gray-900'}
							`}
						>
							{index + 1}
						</button>
					))}
				</div>
			</div> */}
		</WrapperBox>
	);
};

export default RaisecTest;