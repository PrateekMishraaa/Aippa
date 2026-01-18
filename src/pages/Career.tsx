// import ContainerWrapper from "@/custom-components/ContainerWrapper";
// import WrapperBox from "@/custom-components/WrapperBox";
// import CareerData from "@/constants/careerPage";
// import ContentData from "@/custom-components/ContentData";
// import useAuth from "@/context/AuthContext";
// import useHooks from "@/context/HookContext";
// import { Button } from "@/components/ui/button";
// import scrollToTop from "@/utils/scrollToTop";
// import { useSelector } from "react-redux";
// import { GetState } from "@/store/store";
// import { Lock } from "lucide-react";
// import useCareer from "@/context/careerContext/CareerContext";
// import CareerAnalyzeStep from "@/custom-components/careerComponents/CareerAnalyzeStep";

// const Career = () => {
// 	const { isLoggedIn } = useAuth();
// 	const { navigate } = useHooks();
// 	const { attemptCount } = useCareer();

// 	const loggedInUser = useSelector(
// 		(state: GetState) => state.authSlice.isLoggedInUser
// 	);

// 	const aptitudeTest = [
// 		{
// 			imageUrl: "/lsmt-test-card.webp",
// 			path: "/career/lsmt",
// 			name: "LSMT",
// 			description: "For Classes 6-8",
// 			classes: [6, 7, 8]
// 		},
// 		{
// 			imageUrl: "/raisec-test-card.webp",
// 			path: "/career/raisec",
// 			name: "RAISEC",
// 			description: "For Classes 11-12",
// 			classes: [11, 12]
// 		},
// 		{
// 			imageUrl: "/tamanna-test-card.webp",
// 			path: "/career/tamanna",
// 			name: "TAMANNA",
// 			description: "For Classes 9-10",
// 			classes: [9, 10]
// 		},
// 	];

// 	// For logged in users, get their specific test
// 	let recommendedTest = null;
// 	if (isLoggedIn && loggedInUser) {
// 		const userClass = loggedInUser.class;
// 		if ([6, 7, 8].includes(userClass)) {
// 			recommendedTest = aptitudeTest[0];
// 		} else if ([9, 10].includes(userClass)) {
// 			recommendedTest = aptitudeTest[2];
// 		} else if ([11, 12].includes(userClass)) {
// 			recommendedTest = aptitudeTest[1];
// 		}
// 	}

// 	const handleNavigate = (path: string) => {
// 		scrollToTop();
// 		navigate(path);
// 	};

// 	return (
// 		<ContainerWrapper className="space-y-5">
// 			<WrapperBox title="aptitude test" titleCss="!text-slate-950">
// 				<div className="flex flex-wrap justify-center md:justify-start gap-5">
// 					{/* Show all tests to everyone */}
// 					{aptitudeTest.map(({ imageUrl, path, name, description }) => (
// 						<div key={path} className="relative group">
// 							<button
// 								className="relative w-full md:w-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
// 								onClick={() => handleNavigate(path)}
// 							>
// 								<img
// 									src={imageUrl}
// 									alt={name}
// 									className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
// 								/>
// 								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
// 								<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
// 									<h3 className="text-xl font-bold">{name}</h3>
// 									<p className="text-sm opacity-90">{description}</p>
// 								</div>
								
// 								{/* Show "Recommended" badge for logged in users if this is their recommended test */}
// 								{isLoggedIn && recommendedTest?.path === path && (
// 									<div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
// 										Recommended
// 									</div>
// 								)}
								
// 								{/* Show "Free Access" for non-logged in users */}
// 								{!isLoggedIn && (
// 									<div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
// 										Free Access
// 									</div>
// 								)}
// 							</button>
// 						</div>
// 					))}
					
// 					{/* Show result button only for logged in users */}
// 					{isLoggedIn && (
// 						<div className="relative group">
// 							<button
// 								className="relative w-full md:w-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
// 								disabled={!attemptCount}
// 								onClick={() => navigate("/career/result")}
// 							>
// 								<img
// 									src="/view-result.webp"
// 									alt="View Result"
// 									className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
// 								/>
// 								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
// 								<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
// 									<h3 className="text-xl font-bold">My Results</h3>
// 									<p className="text-sm opacity-90">View your test results</p>
// 								</div>
// 								{!attemptCount && (
// 									<Lock className="absolute top-5 right-5 text-white" />
// 								)}
// 							</button>
// 						</div>
// 					)}
// 				</div>
				
// 				{/* Information section for non-logged in users */}
// 				{!isLoggedIn && (
// 					<div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
// 						<div className="flex flex-col md:flex-row items-center justify-between gap-4">
// 							<div>
// 								<h3 className="text-xl font-bold text-blue-800 mb-2">
// 									Login for Better Experience
// 								</h3>
// 								<p className="text-blue-700">
// 									Login to save your results, track progress, and get personalized recommendations.
// 								</p>
// 							</div>
// 							<Button 
// 								className="bg-yuvaBlue hover:bg-yuvaBlue-dark text-white px-6 py-3"
// 								onClick={() => navigate("/sign-in")}
// 							>
// 								Sign In
// 							</Button>
// 						</div>
// 					</div>
// 				)}
				
// 				{/* Information for logged in users about test attempts */}
// 				{isLoggedIn && (
// 					<div className="mt-8 p-4 bg-gray-50 rounded-lg">
// 						<p className="text-sm text-gray-600">
// 							<strong>Note:</strong> {recommendedTest?.name} is recommended for your class. 
// 							You can attempt the test {attemptCount === undefined ? 2 : 2 - attemptCount} more times.
// 						</p>
// 					</div>
// 				)}
// 			</WrapperBox>

// 			<WrapperBox title="Career">
// 				<div>
// 					<CareerAnalyzeStep />
// 				</div>

// 				{CareerData.diffCareer.map(({ title, imageUrl, description }, i) => {
// 					return (
// 						<ContentData imageUrl={imageUrl} imageAlt={title} key={i}>
// 							<h3 className="uppercase text-2xl font-semibold text-yuvaBlue">
// 								{title}
// 							</h3>
// 							<p className="text-slate-950">{description}</p>
// 						</ContentData>
// 					);
// 				})}
// 			</WrapperBox>
// 		</ContainerWrapper>
// 	);
// };

// export default Career;



import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
import CareerData from "@/constants/careerPage";
import ContentData from "@/custom-components/ContentData";
import useAuth from "@/context/AuthContext";
import useHooks from "@/context/HookContext";
// import { Button } from "@/components/ui/button";
import scrollToTop from "@/utils/scrollToTop";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import { Lock } from "lucide-react";
import useCareer from "@/context/careerContext/CareerContext";
import CareerAnalyzeStep from "@/custom-components/careerComponents/CareerAnalyzeStep";

const Career = () => {
	const { isLoggedIn } = useAuth();
	const { navigate } = useHooks();
	const { attemptCount } = useCareer();

	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const aptitudeTest = [
		{
			imageUrl: "/lsmt-test-card.webp",
			path: "/career/lsmt",
			name: "LSMT",
			description: "For Classes 6-8",
			classes: [6, 7, 8]
		},
		{
			imageUrl: "/raisec-test-card.webp",
			path: "/career/raisec",
			name: "RAISEC",
			description: "For Classes 11-12",
			classes: [11, 12]
		},
		{
			imageUrl: "/tamanna-test-card.webp",
			path: "/career/tamanna",
			name: "TAMANNA",
			description: "For Classes 9-10",
			classes: [9, 10]
		},
	];

	// For logged in users, get their specific test
	let recommendedTest = null;
	if (isLoggedIn && loggedInUser) {
		const userClass = loggedInUser.class;
		if ([6, 7, 8].includes(userClass)) {
			recommendedTest = aptitudeTest[0];
		} else if ([9, 10].includes(userClass)) {
			recommendedTest = aptitudeTest[2];
		} else if ([11, 12].includes(userClass)) {
			recommendedTest = aptitudeTest[1];
		}
	}

	const handleNavigate = (path: string) => {
		scrollToTop();
		navigate(path);
	};

	return (
		<ContainerWrapper className="space-y-5">
			<WrapperBox title="aptitude test" titleCss="!text-slate-950">
				<div className="flex flex-wrap justify-center md:justify-start gap-5">
					{/* Show all tests to everyone */}
					{aptitudeTest.map(({ imageUrl, path, name, description }) => (
						<div key={path} className="relative group">
							<button
								className="relative w-full md:w-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
								onClick={() => handleNavigate(path)}
							>
								<img
									src={imageUrl}
									alt={name}
									className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
								<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
									<h3 className="text-xl font-bold">{name}</h3>
									<p className="text-sm opacity-90">{description}</p>
								</div>
								
								{/* Show "Recommended" badge for logged in users if this is their recommended test */}
								{isLoggedIn && recommendedTest?.path === path && (
									<div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
										Recommended
									</div>
								)}
								
								{/* Show "Free Access" for non-logged in users */}
								{!isLoggedIn && (
									<div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
										Free Access
									</div>
								)}
							</button>
						</div>
					))}
					
					{/* Show result button only for logged in users */}
					{isLoggedIn && (
						<div className="relative group">
							<button
								className="relative w-full md:w-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
								disabled={!attemptCount}
								onClick={() => navigate("/career/result")}
							>
								<img
									src="/view-result.webp"
									alt="View Result"
									className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
								<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
									<h3 className="text-xl font-bold">My Results</h3>
									<p className="text-sm opacity-90">View your test results</p>
								</div>
								{!attemptCount && (
									<Lock className="absolute top-5 right-5 text-white" />
								)}
							</button>
						</div>
					)}
				</div>
				
				{/* Information section for non-logged in users */}
				{!isLoggedIn && (
					<div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
						{/* <div className="flex flex-col md:flex-row items-center justify-between gap-4">
							<div>
								<h3 className="text-xl font-bold text-blue-800 mb-2">
									Login for Better Experience
								</h3>
								<p className="text-blue-700">
									Login to save your results, track progress, and get personalized recommendations.
								</p>
							</div>
							<Button 
								className="bg-yuvaBlue hover:bg-yuvaBlue-dark text-white px-6 py-3"
								onClick={() => navigate("/sign-in")}
							>
								Sign In
							</Button>
						</div> */}
					</div>
				)}
				
				{/* Information for logged in users about test attempts */}
				{isLoggedIn && (
					<div className="mt-8 p-4 bg-gray-50 rounded-lg">
						<p className="text-sm text-gray-600">
							<strong>Note:</strong> {recommendedTest?.name} is recommended for your class. 
							You can attempt the test {attemptCount === undefined ? 2 : 2 - attemptCount} more times.
						</p>
					</div>
				)}
			</WrapperBox>

			<WrapperBox title="Career">
				<div>
					<CareerAnalyzeStep />
				</div>

				{CareerData.diffCareer.map(({ title, imageUrl, description }, i) => {
					return (
						<ContentData imageUrl={imageUrl} imageAlt={title} key={i}>
							<h3 className="uppercase text-2xl font-semibold text-yuvaBlue">
								{title}
							</h3>
							<p className="text-slate-950">{description}</p>
						</ContentData>
					);
				})}
			</WrapperBox>
		</ContainerWrapper>
	);
};

export default Career;