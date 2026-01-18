import ContainerWrapper from "@/custom-components/ContainerWrapper";
import LsmtResult from "./LsmtResult";
import useCareer from "@/context/careerContext/CareerContext";
import useHooks from "@/context/HookContext";
import { useEffect } from "react";
import RiasecResult from "./RiasecResult";
import TamannaResult from "./TamannaResult";

const CareerViewResult = () => {
	const { navigate } = useHooks();
	const { attemptCount, testScore, test, riasecScore } = useCareer();

	useEffect(() => {
		if (attemptCount === 0) {
			navigate("/career");
		}
	}, [attemptCount, navigate]);

	let testCard = null;

	if (test === "lsmt") {
		testCard = <LsmtResult score={testScore} />;
	} else if (test === "riasec") {
		testCard = <RiasecResult score={riasecScore} />;
	} else if (test === "tamanna") {
		testCard = <TamannaResult />;
	}

	return <ContainerWrapper>{testCard}</ContainerWrapper>;
};

export default CareerViewResult;
