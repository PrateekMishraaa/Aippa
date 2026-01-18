import { MoveLeft } from "lucide-react";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
import useHooks from "@/context/HookContext";
import EscapeToBack from "@/utils/EscapeToBack";
import LsmtTest from "./careerTests/LsmtTest";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import { useEffect, useState } from "react";
import ParentInfo from "../parentInfoBeforeTest/ParentInfo";

const Lsmt = () => {
	EscapeToBack();
	const { navigate } = useHooks();
	const [isParentInfo, setIsParentInfo] = useState<boolean>(false);

	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	if (
		loggedInUser?.class !== undefined &&
		![6, 7, 8].includes(loggedInUser.class)
	) {
		navigate("/career");
	}

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

	// note: render Parent's Questionnaire
	if (!isParentInfo) {
		return <ParentInfo setIsParentInfo={setIsParentInfo} />;
	}

	return (
		<>
			<ContainerWrapper>
				<WrapperBox>
					<div className="relative hidden md:block">
						<img
							src="/c-lsmt.webp"
							alt="Health"
							className="w-full h-auto drop-shadow-xl"
						/>

						<p className="absolute bottom-10 lg:bottom-16 xl:bottom-20 left-8 lg:left-10 xl:left-14 text-sm lg:text-lg text-slate-100">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
							Iste sapiente doloribus enim molestias inventore in.
						</p>
					</div>

					<div className="relative text-center py-10">
						<MoveLeft
							onClick={() => navigate(-1)}
							size={35}
							className="cursor-pointer md:absolute top-1/2 -translate-y-1/2"
						/>

						<h1 className="text-4xl uppercase font-extrabold font-unbounded">
							LSMT
						</h1>

						<img
							src="/star.webp"
							alt="raisec-test"
							className="w-8 h-8 absolute top-1/2 left-1/2 translate-y-1 -translate-x-40"
						/>

						<img
							src="/star.webp"
							alt="raisec-test"
							className="absolute bottom-1/2 right-1/2 translate-y-1 translate-x-44"
						/>
					</div>

					<LsmtTest />
				</WrapperBox>
			</ContainerWrapper>
		</>
	);
};

export default Lsmt;
