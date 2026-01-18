import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
import InstructionScreen from "./tamannaTest/InstructionScreen";
import TestScreen from "./tamannaTest/TestScreen";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import useHooks from "@/context/HookContext";
import ParentInfo from "../parentInfoBeforeTest/ParentInfo";

const TamannaTest = () => {
	const { navigate } = useHooks();
	const [phase, setPhase] = useState("instruction");
	const [isWidthLess, setIsWidthLess] = useState<boolean>(false);
	const [isParentInfo, setIsParentInfo] = useState<boolean>(false);
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 600) {
				setIsWidthLess(true);
			} else {
				setIsWidthLess(false);
			}
		};
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (
		loggedInUser?.class !== undefined &&
		![9, 10].includes(loggedInUser.class)
	) {
		navigate("/career");
	}

	useEffect(() => {
		if (localStorage.getItem("phase")) {
			setPhase(localStorage.getItem("phase") || "instruction");
		}

		if (phase !== "instruction") {
			// Function to prevent back navigation by pushing a state into history
			const preventBackNavigation = () => {
				window.history.pushState(null, "", window.location.href); // Push the current state into history
				window.history.forward(); // Immediately move forward to avoid back navigation
			};

			// This handles when the popstate event is triggered (i.e., when the back button is clicked)
			const handlePopState = () => {
				toast.warning("Navigation is disabled during the test.");
				preventBackNavigation(); // Keep the user on the current page
			};

			// This will handle refresh prevention
			const handleBeforeUnload = (event: BeforeUnloadEvent) => {
				event.preventDefault();
				event.returnValue = ""; // This is for most browsers to trigger the confirmation dialog
				toast.warning("Page refresh is disabled during the test.");
			};

			// Add event listeners to prevent back navigation and refresh
			window.addEventListener("popstate", handlePopState);
			window.addEventListener("beforeunload", handleBeforeUnload);

			// Initially call preventBackNavigation to block the first potential back action
			preventBackNavigation();

			// Cleanup event listeners when the component unmounts
			return () => {
				window.removeEventListener("popstate", handlePopState);
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}
	}, [phase]);

	// note: render Parent's Questionnaire
	useEffect(() => {
		const isParentInfoLs = localStorage.getItem("isParentInfo");

		if (!isParentInfoLs || isParentInfoLs === "false") {
			localStorage.setItem("isParentInfo", "false");
			setIsParentInfo(false);
		} else {
			setIsParentInfo(true);
		}
	}, []);
	// note: render Parent's Questionnaire


	const handleOnStart = () => {
		localStorage.setItem("phase", "test");
		setPhase("test");
	};

	if (isWidthLess) {
		return (
			<div className="w-svw h-svh flex items-center justify-center">
				<div className="flex flex-col items-center">
					<img
						src="/careerComponents/tamannaTest/testInstruction.webp"
						alt="Instruction"
						className="w-48 h-full object-cover"
					/>
					<h1>Please attempt this test on a Tab or Laptop!</h1>
				</div>
			</div>
		);
	}

	// note: render Parent's Questionnaire
	
	if (!isParentInfo) {
		return <ParentInfo setIsParentInfo={setIsParentInfo} />;
	}

	return (
		<>
			<ContainerWrapper>
				<WrapperBox>
					{phase === "instruction" ? (
						<InstructionScreen setPhase={handleOnStart} />
					) : (
						<TestScreen />
					)}
				</WrapperBox>
			</ContainerWrapper>
		</>
	);
};

export default TamannaTest;
