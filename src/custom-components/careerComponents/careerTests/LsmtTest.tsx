import { useEffect, useState } from "react";
import WrapperBox from "../../../custom-components/WrapperBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import careerServicesApi, { LsmtTestResult } from "@/services/careerServices";
import { Progress } from "@/custom-components/customProgress";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
} from "@/components/ui/pagination";
import useCareer from "@/context/careerContext/CareerContext";
import { GetState } from "@/store/store";
import { useSelector } from "react-redux";
import useHooks from "@/context/HookContext";

interface Option {
	text: string;
	score: number;
}

interface IQuestions {
	id: number;
	text: string;
	type: string;
	option: Option[];
	createdAt: string;
	updatedAt: string;
}

type SelectAnswerType = {
	id?: number;
	score: number;
	text: string;
};

const LsmtTest = () => {
	const queryClient = useQueryClient();
	const { navigate } = useHooks();
	const { getQuestion: data, isLoading } = useCareer();
	const [questions, setQuestions] = useState<IQuestions[]>([]);
	const [response, setResponses] = useState<SelectAnswerType[]>([]);
	const [progress, setProgress] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);
	const { attemptCount, test } = useCareer();

	useEffect(() => {
		if (data) {
			setQuestions(data.data?.result);
			const initialResponses = data.data?.result.map(
				(question: IQuestions) => ({
					id: question.id,
					score: 0,
					text: "",
				})
			);

			setResponses(initialResponses);
		}
	}, [data]);

	useEffect(() => {
		setProgress(
			Math.round(
				(response.filter((ans) => ans?.score !== 0).length / questions.length) *
					100
			)
		);
	}, [response, questions]);

	const handleSelectAnswer = (ans: SelectAnswerType, questionId: number) => {
		setResponses((prevResponses) => {
			const updatedResponses = [...prevResponses];
			const responseIndex = updatedResponses.findIndex(
				(response) => response?.id === questionId
			);

			if (responseIndex !== -1) {
				updatedResponses[responseIndex] = {
					id: questionId,
					score: ans.score,
					text: ans.text,
				};
			} else {
				updatedResponses.push({
					id: questionId,
					score: ans.score,
					text: ans.text,
				});
			}

			return updatedResponses;
		});
	};

	// Note: post lsmt test result (score)
	const { mutateAsync } = useMutation({
		mutationFn: (data: LsmtTestResult) =>
			careerServicesApi.postLsmtAndRiasecResult(data, test),
		onSuccess: async () => {
			navigate("/career");
			await queryClient.invalidateQueries({
				queryKey: ["checkTestAttempts"],
			});
		},
	});

	const handleSubmit = () => {
		const totalAnsweredQuestions = response.filter((ans) => ans?.score !== 0);
		if (totalAnsweredQuestions.length === questions.length) {
			const totalScore = response
				.filter((ans) => ans?.score !== 0) // Filter out null values
				.reduce((acc, answer) => acc + answer!.score, 0);

			// NOTE: Display total score and call completion API
			const data = {
				userId: loggedInUser?.id,
				role: loggedInUser?.role,
				result: totalScore,
				attemptCount: attemptCount + 1,
			};

			toast.promise(mutateAsync(data), {
				loading: "Loading...",
				success: `Your test has been submitted successfully! Your total score is ${totalScore}`,
				error: () => "Something went wrong!!",
			});
		} else {
			toast.error("Please answer all the questions.");
		}
	};

	const questionsPerPage = 8;
	const indexOfLastQuestion = currentPage * questionsPerPage;
	const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

	const currentQuestions = questions.slice(
		indexOfFirstQuestion,
		indexOfLastQuestion
	);

	const totalPages = Math.ceil(questions.length / questionsPerPage);

	return (
		<>
			{isLoading ? (
				<div className="text-center">Loading...</div>
			) : (
				<WrapperBox className="!px-0">
					{/* Progress bar */}
					<div className="space-y-5">
						<Progress value={progress} />
						<p>Progress: {progress}%</p>
					</div>

					{/* Question.. */}
					<div className="space-y-3">
						{currentQuestions.map((question, i) => {
							// Find the current response for this question
							const currentResponse = response.find(
								(r) => r.id === question.id
							);

							return (
								<div
									key={i}
									className="space-y-2 lg:flex items-center bg-primaryBg px-3 py-3 rounded-lg"
								>
									<div className="w-full lg:w-5/12">
										<h2 className="text-sm">
											<strong>
												Q{question.id} : {question.text}
											</strong>
										</h2>
									</div>

									<div className="w-full lg:w-7/12">
										<RadioGroup
											value={currentResponse?.text || ""} // Set the default value dynamically
											className="flex flex-wrap lg:justify-between gap-5 px-5"
										>
											{question.option.map((option, answerI) => (
												<div
													className="flex items-center space-x-2"
													key={answerI}
												>
													<RadioGroupItem
														value={option.text}
														id={`${question.id}-${option.score}`}
														onClick={() =>
															handleSelectAnswer(option, question.id)
														}
													/>
													<Label htmlFor={`${question.id}-${option.score}`}>
														{option.text}
													</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								</div>
							);
						})}
					</div>

					{/* Pagination controls and submit button */}
					<Pagination className="mt-5">
						<PaginationContent className="flex-wrap justify-center">
							{/* Page numbers */}
							{Array.from({ length: totalPages }, (_, index) => (
								<PaginationItem key={index}>
									<PaginationLink
										isActive={currentPage === index + 1}
										onClick={() => setCurrentPage(index + 1)}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}

							{/* Previous button */}
							<PaginationItem>
								<PaginationPrevious
									className="cursor-pointer select-none"
									onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
								/>
							</PaginationItem>

							{/* Next button */}
							{currentPage !== totalPages ? (
								<PaginationItem>
									<PaginationNext
										className="cursor-pointer select-none"
										onClick={() =>
											setCurrentPage(Math.min(currentPage + 1, totalPages))
										}
									/>
								</PaginationItem>
							) : (
								<button onClick={handleSubmit}>Submit</button>
							)}
						</PaginationContent>
					</Pagination>
				</WrapperBox>
			)}
		</>
	);
};

export default LsmtTest;
