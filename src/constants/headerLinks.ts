import { Links } from "@/types/routesTypes";

const links = (isActive?: boolean) => {
	const links: Links = [
		{
			routeName: "home",
			path: "/",
			isActive: true,
		},
		{
			routeName: "Dashboard",
			path: "/dashboard",
			isActive,
		},
		{
			routeName: "Career",
			path: "/career",
			isActive: true,
		},
		{
			routeName: "Health",
			path: "/health",
			isActive: true,
		},
		{
			routeName: "Personality Development",
			path: "/personality-development",
			isActive: true,
		},
		{
			routeName: "Competition",
			path: "/competition?c=un_model",
			isActive: true,
		},
		{
			routeName: "Safety",
			path: "/safety",
			isActive: true,
		},
	];
	return links;
};

export default links;
