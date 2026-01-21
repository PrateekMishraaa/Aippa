import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
const PersonalityDevOutlet = lazy(() => import("@/pages/PersonalityDevOutlet"));
import LoadingPage from "@/utils/LoadingPage";
import { AnimatePresence } from "motion/react";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard.jsx"
import SignUp from "../src/pages/SignUp/SignUp.jsx"
import useHooks from "./context/HookContext";
import PageAnimation from "./utils/PageAnimation";
import routesElements from "./routes/routeConstant";
import useAuth from "./context/AuthContext";
import privateRoutes from "./constants/privateRoutes";
import { toast } from "sonner";
import scrollToTop from "./utils/scrollToTop";
import { useSelector } from "react-redux";
import { GetState } from "./store/store";

const App = () => {
	const { location, navigate } = useHooks();
	const { isLoggedIn } = useAuth();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	useEffect(() => {
		const isPrivateRoute = privateRoutes.some((route) => {
			const routeRegex = new RegExp(
				"^" + route.replace(/:\w+/g, "[^/]+") + "$"
			);
			const decodedPath = decodeURIComponent(location.pathname);
			return routeRegex.test(decodedPath);
		});

		//note: If no token in localStorage and trying to access a private route
		if (!localStorage.getItem("token")) {
			if (isPrivateRoute && !isLoggedIn) {
				navigate("/sign-in");
			}
		}

		//note: If logged in but trying to access the sign-in page, redirect to dashboard
		if (isLoggedIn && location.pathname === "/sign-in") {
			navigate("/dashboard");
		}

		scrollToTop();
	}, [isLoggedIn, location.pathname, navigate, loggedInUser]);

	useEffect(() => {
		const handleOffline = () => {
			toast.error(
				"You've gone offline. Please check your internet connection."
			);
		};

		const handleOnline = () => {
			toast.success("Back online! Your connection is restored.");
		};

		window.addEventListener("offline", handleOffline);
		window.addEventListener("online", handleOnline);

		return () => {
			window.removeEventListener("offline", handleOffline);
			window.removeEventListener("online", handleOnline);
		};
	}, []);

	return (
		<Suspense fallback={<LoadingPage />}>
			<AnimatePresence mode="wait" initial={false}>
				<Routes location={location} key={location.pathname}>
					{routesElements.routeElement.map(({ path, component: Component }) => (
						<Route
							path={path}
							element={
								<PageAnimation>
									<Component />
								</PageAnimation>
							}
							key={path}
						/>
					))}

					{/* personality development route */}
					<Route
						path="/personality-development"
						element={<PersonalityDevOutlet />}
					>
						{routesElements.personalityDevRoute.map(
							({ index, path, element: Component }) => (
								<Route
									index={index}
									path={path}
									element={
										<PageAnimation>
											<Component />
										</PageAnimation>
									}
									key={path ? path : "index"}
								/>
							)
						)}
					</Route>
					<Route path="/student/dashboard" element={<StudentDashboard/>}/>
					<Route path="/sign-up" element={<SignUp/>}/>
				</Routes>
			</AnimatePresence>
		</Suspense>
	);
};

export default App;
