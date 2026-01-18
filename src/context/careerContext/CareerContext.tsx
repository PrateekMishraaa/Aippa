import careerServicesApi from "@/services/careerServices";
import { GetState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface IResultScores {
	r: number;
	i: number;
	a: number;
	s: number;
	e: number;
	c: number;
}

interface ISubTest {
	[key: string]: { subtestCategory: string; description: string };
}

export interface IRawScores {
	[key: string]: number;
}

type StenScoresTypes = {
	[key: string]: number;
}[];

interface ITamannaResult {
	attemptCount: number;
	description: ISubTest[];
	rawScore: IRawScores;
	stenScore: StenScoresTypes;
}

// Note: context interface -–----------------------------------------------------------------
interface CareerContextType {
	attemptCount: number;
	test: string;
	testScore: number;
	questionLength: number;
	//eslint-disable-next-line
	getQuestion: any;
	isLoading: boolean;
	riasecScore: IResultScores | null;
	tamannaResult: ITamannaResult | null;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider = ({ children }: { children: React.ReactNode }) => {
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);
	const [attemptCount, setAttemptCount] = useState<number>(0); // note: used to track the number of test attempts
	const [testScore, setTestScore] = useState<number>(0); // note: note: used to store the lsmtTest result score
	const [questionLength, setQuestionLength] = useState<number>(0); // note: used to store the number of questions
	const [riasecScore, setRiasecScore] = useState<IResultScores | null>(null); // note: note: used to store the riasecTest result score
	const [tamannaResult, setTamannaResult] = useState<ITamannaResult | null>(
		null
	);

	let test: string = ""; // note: used to store the test type or name based on the user's class

	// NOTE: Assign the correct test name based on the user's class
	if (
		loggedInUser?.class === 6 ||
		loggedInUser?.class === 7 ||
		loggedInUser?.class === 8
	) {
		test = "lsmt";
	} else if (loggedInUser?.class === 9 || loggedInUser?.class === 10) {
		test = "tamanna";
	} else if (loggedInUser?.class === 11 || loggedInUser?.class === 12) {
		test = "riasec";
	}

	// note: Fetch test attempt count and score for the logged-in user
	const { data } = useQuery({
		queryKey: ["checkTestAttempts", "userId", "test"],
		queryFn: () =>
			careerServicesApi.checkLsmtRiasecAttempts(loggedInUser?.id, test),
		enabled: !!loggedInUser,
	});

	useEffect(() => {
		if (data && loggedInUser) {
			setAttemptCount(data.data?.result?.attemptCount);
			setTestScore(test === "lsmt" ? data.data?.result?.result : 0);
			setRiasecScore(test === "riasec" ? data.data?.result?.result : null);

			if (test === "tamanna") {
				setTamannaResult(data.data?.result);
			}
		} else {
			setAttemptCount(0);
			setTestScore(0);
			setRiasecScore(null);
		}
	}, [data, test, loggedInUser]);

	// NOTE: Fetch test questions from API
	const { data: getQuestion, isLoading } = useQuery({
		queryKey: ["getLsmtQuestions", "test"],
		queryFn: () => careerServicesApi.getLsmtQuestion(test),
		enabled: !!loggedInUser && attemptCount < 2 && test !== "tamanna",
	});

	// NOTE: Set the number of questions when fetched from the API
	useEffect(() => {
		if (getQuestion && loggedInUser) {
			setQuestionLength(getQuestion.data.result.length);
		} else {
			setQuestionLength(0);
		}
	}, [getQuestion, loggedInUser]);

	const value = {
		attemptCount,
		test,
		testScore,
		questionLength,
		getQuestion,
		isLoading,
		riasecScore,
		tamannaResult,
	};

	return (
		<CareerContext.Provider value={value}>{children}</CareerContext.Provider>
	);
};

const useCareer = () => {
	const context = useContext(CareerContext);

	if (!context) {
		throw new Error("useCareer must be used within an CareerProvider");
	}

	return context;
};

//eslint-disable-next-line
export default useCareer;
