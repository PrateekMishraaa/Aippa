import useCareer from "@/context/careerContext/CareerContext";
import WrapperBox from "@/custom-components/WrapperBox";
import { useEffect, useState } from "react";
const resultChildren = "/careerComponents/result/lsmt/resultChildren.webp";
const lsmtResultStar = "/careerComponents/result/lsmt/lsmtResultStar.webp";
const GreatJob = "/careerComponents/result/lsmt/GreatJob.webp";
import careerResult from "@/constants/careerResult/careerResult";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import boy from "/careerComponents/result/lsmt/boy.webp";
import girl from "/careerComponents/result/lsmt/girl.webp";

const LsmtResult = ({ score = 150 }: { score: number }) => {
	const { test } = useCareer();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const [defineCategory, setDefineCategory] = useState<string>("");

	const getResult = careerResult.filter(
		(result) =>
			result.test === test && result.category === defineCategory && result
	);

	// note:useEffect hook to calculate and display the category based on the score.
	useEffect(() => {
		if (score >= 237 && score <= 265) {
			setDefineCategory("Highly Proficient");
		} else if (score >= 215 && score < 237) {
			setDefineCategory("Proficient");
		} else if (score >= 170 && score < 215) {
			setDefineCategory("Competent");
		} else if (score >= 148 && score < 170) {
			setDefineCategory("Basic");
		} else {
			setDefineCategory("Emerging");
		}
	}, [score]);

	return (
		<WrapperBox className="relative">
			<div className="absolute -top-2.5 left-0 w-full">
				<div className="relative w-full flex justify-center gap-5 h-32 ">
					<img
						src={GreatJob}
						alt="lsmtResult"
						className="w-auto h-full md:h-[150%] absolute -top-2 -left-8 md:-left-10 drop-shadow-xl"
					/>

					<img
						src={resultChildren}
						alt="lsmtResult"
						className="w-auto h-full drop-shadow-xl"
					/>
					<img
						src={resultChildren}
						alt="lsmtResult"
						className="w-auto h-full hidden md:block drop-shadow-xl"
					/>
					<img
						src={resultChildren}
						alt="lsmtResult"
						className="w-auto h-full hidden lg:block drop-shadow-xl"
					/>
				</div>
			</div>

			<div className="pt-28 mx-auto xl:w-5/6 text-center">
``				<div className="relative">
					<img
						src={lsmtResultStar}
						alt="star"
						className="absolute -right-2 xl:right-5 -top-14 hidden lg:block drop-shadow-xl"
					/>
					<h1 className="text-3xl md:text-4xl font-semibold text-yuvaBlue">
						ASSESSMENT REPORT
					</h1>
					<p className="mt-5 text-lg md:text-xl">
						You have completed the test successfully! We really appreciate your
						effort.
					</p>
				</div>

				<div className="mt-5">
					<q>
						<p className="text-pretty">
							<strong>
								Congratulations{" "}
								<span className="text-yuvaBlue capitalize">
									{loggedInUser?.first_name}
								</span>{" "}
								on completing the assessment!
							</strong>{" "}
							This accomplishment reflects your dedication and commitment to
							developing essential skills that will empower you in various
							aspects of life. It's clear that you have shown resilience and a
							willingness to improve, and these efforts will play a crucial role
							in your ongoing growth. Based on your score, your current category
							is <strong className="text-yuvaBlue">{defineCategory}</strong>. As
							you continue on this journey, it's important to focus on refining
							these skills to ensure long-term success and personal development.
						</p>
					</q>
				</div>

				<div className="mt-5 text-justify">
					<div className="px-5 relative z-10">
						<img
							src={loggedInUser?.gender === "M" || loggedInUser?.gender === "male" ? boy : girl}
							alt="aippa"
							className=" absolute top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2 -z-[1] opacity-40"
						/>

						{getResult?.map((result, index) => (
							<ul key={index} className="mt-5">
								{result.pathways.map((pathway, index) => {
									// name, he/she, his/her, him/her

									const title = pathway.split(":")[0];
									const desc = pathway
										.split(":")[1]
										.replace(
											"name",
											`${loggedInUser?.first_name
												.charAt(0)
												.toUpperCase()}${loggedInUser?.first_name.slice(1)}`
										)
										.replace(
											"he/she",
											`${loggedInUser?.gender === "M" ? "he" : "she"}`
										)
										.replace(
											"he/she",
											`${loggedInUser?.gender === "M" ? "he" : "she"}`
										)
										.replace(
											"his/her",
											`${loggedInUser?.gender === "M" ? "his" : "her"}`
										)
										.replace(
											"him/her",
											`${loggedInUser?.gender === "M" ? "him" : "her"}`
										);

									return (
										<li key={index} className="mt-5">
											- <strong>{title}:</strong> {desc}
										</li>
									);
								})}
							</ul>
						)) || <p>No results found.</p>}
					</div>
				</div>
			</div>
		</WrapperBox>
	);
};

export default LsmtResult;
