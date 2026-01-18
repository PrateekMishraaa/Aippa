import RouteElementTypes from "@/types/routesTypes";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const ForYou = lazy(() => import("@/pages/ForYou"));
const Career = lazy(() => import("@/pages/Career"));
const Health = lazy(() => import("@/pages/Health"));
const PersonalityDev = lazy(() => import("@/pages/PersonalityDev"));
const Safety = lazy(() => import("@/pages/Safety"));
const CorrectionForm = lazy(() => import("@/pages/CorrectionForm"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Competition = lazy(() => import("@/pages/Competition"));
const cLsmt = lazy(() => import("@/custom-components/careerComponents/Lsmt"));
const CRaisec = lazy(
	() => import("@/custom-components/careerComponents/Raisec")
);
const CTamanna = lazy(
	() => import("@/custom-components/careerComponents/Tamanna")
);

const NipamChallenges = lazy(
	() => import("@/custom-components/personalityDevelopment/NipamChallenges")
);
const HealthForm = lazy(
	() => import("@/custom-components/healthComponents/HealthForm")
);
const CareerViewResult = lazy(
	() =>
		import("@/custom-components/careerComponents/resultView/CareerViewResult")
);

class RouteElement {
	routeElement: RouteElementTypes = [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/dashboard",
			component: ForYou,
		},
		{
			path: "/career",
			component: Career,
		},
		{
			path: "/health",
			component: Health,
		},
		{
			path: "/health/add-form",
			component: HealthForm,
		},
		{
			path: "/health/details/:username/:id",
			component: HealthForm,
		},
		{
			path: "/safety",
			component: Safety,
		},
		{
			path: "/correction-form/:id/:email",
			component: CorrectionForm,
		},
		{
			path: "/career/raisec",
			component: CRaisec,
		},
		{
			path: "/career/tamanna",
			component: CTamanna,
		},
		{
			path: "/career/lsmt",
			component: cLsmt,
		},
		{
			path: "/career/result",
			component: CareerViewResult,
		},
		{
			path: "/competition",
			component: Competition,
		},
		{
			path: "/sign-in",
			component: SignIn,
		},
		{
			path: "*",
			component: NotFound,
		},
	];

	personalityDevRoute = [
		{
			index: true,
			element: PersonalityDev,
		},
		{
			path: "/personality-development/nipam",
			element: NipamChallenges,
		},
	];
}

const routesElements = new RouteElement();

export default routesElements;
