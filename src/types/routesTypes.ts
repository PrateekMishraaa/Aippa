import { ComponentType } from "react";

type RouteElementTypes = {
	path: string;
	component: ComponentType;
}[];

export type Links = {
	routeName: string;
	path: string;
	isActive?: boolean;
}[];

export default RouteElementTypes;
