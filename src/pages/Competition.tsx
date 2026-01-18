import useHooks from "@/context/HookContext";
import UnEvent from "@/custom-components/competitionComponent/UnEvent";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
// import { useEffect, useState } from "react";

const Competition = () => {
	const { location, navigate } = useHooks();
	const competitionType = location.search.split("=")[1];

	let renderPage;

	switch (competitionType) {
		case "un_model":
			renderPage = <UnEvent />;
			break;

		default:
			renderPage = <UnEvent />;
			break;
	}

	const challenges = [
		{
			imageUrl: "/competition_un.webp",
			path: "/competition?c=un_model",
		},
	];

	return (
		<div>
			<ContainerWrapper className="space-y-5">
				<WrapperBox title="Competition" titleCss="!text-slate-950">
					<div className="flex flex-wrap justify-center md:justify-start gap-5">
						{challenges.map(({ imageUrl, path }) => (
							<button key={path} onClick={() => navigate(path)}>
								<img
									src={imageUrl}
									alt={path}
									className="w-full md:w-80 h-auto"
								/>
							</button>
						))}
					</div>
				</WrapperBox>
				{renderPage}
			</ContainerWrapper>
		</div>
	);
};

export default Competition;
