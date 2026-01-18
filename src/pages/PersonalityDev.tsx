// import React from "react";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
import ContentData from "@/custom-components/ContentData";
import PersonalDevData from "@/constants/personalDevelopmentPage";
// import { Link } from "react-router-dom";
import useAuth from "@/context/AuthContext";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useHooks from "@/context/HookContext";
import scrollToTop from "@/utils/scrollToTop";

function PersonalDev() {
	const { isLoggedIn } = useAuth();
	const { navigate } = useHooks();

	const challenges = [
		{
			imageUrl: "/21DayChallenge.webp",
			path: "/personality-development/21days-challenge",
		},
		{
			imageUrl: "/nipam.webp",
			path: "/personality-development/nipam",
		},
	];

	const handleNavigate = (path: string) => {
		scrollToTop();
		navigate(path);
	};

	return (
		<ContainerWrapper className="space-y-5">
			<WrapperBox title="environment" titleCss="!text-slate-950">
				<div className="flex flex-wrap justify-center md:justify-start gap-5">
					{challenges.map(({ imageUrl, path }) => (
						<Dialog key={path}>
							<DialogTrigger asChild className="border-none outline-none">
								<button onClick={() => isLoggedIn && handleNavigate(path)}>
									<img
										src={imageUrl}
										alt={path}
										className="w-full md:w-80 h-auto"
									/>
								</button>
							</DialogTrigger>
							{!isLoggedIn && (
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Access Denied</DialogTitle>
										<DialogDescription>
											Make sure you have logged in before access.
										</DialogDescription>
									</DialogHeader>

									<DialogFooter>
										<DialogClose asChild>
											<Button onClick={() => handleNavigate("/sign-in")}>
												Sign in
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							)}
						</Dialog>
					))}
				</div>
			</WrapperBox>

			<WrapperBox title="Personality Development">
				{PersonalDevData.PdData.map(({ imageUrl, description }) => {
					return (
						<ContentData imageUrl={imageUrl} imageAlt={imageUrl} key={imageUrl}>
							<p className="text-slate-950">{description}</p>
						</ContentData>
					);
				})}
			</WrapperBox>
		</ContainerWrapper>
	);
}

export default PersonalDev;
