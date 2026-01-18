import { useEffect } from "react";
import breakScreen from "@/constants/tamannaConstant/breakScreen";
import { Button } from "@/components/ui/button";

interface IBreakScreen {
	breakTimeLeft: number;
	breakScreenOrder: number;
	onSkip: () => void;
}

const BreakScreen = ({
	breakTimeLeft,
	breakScreenOrder,
	onSkip,
}: IBreakScreen) => {
	const { title, description } = breakScreen[breakScreenOrder];

	useEffect(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "/assets/css/breakScreen.css";
		document.head.appendChild(link);

		return () => {
			document.head.removeChild(link);
		};
	}, []);

	return (
		<div>
			{/* header sec */}
			<div className="flex flex-wrap items-center justify-between">
				<h1 className="text-5xl font-bold">{title}</h1>

				<div className="border-2 border-yuvaBlue bg-yuvaBlue/10 text-yuvaBlue rounded-md px-7 py-2 text-lg text-pretty cursor-default select-none pointer-events-none">
					{Math.floor(breakTimeLeft / 60)}:
					{String(breakTimeLeft % 60).padStart(2, "0")}
				</div>
			</div>

			{/* main body */}
			<div className="mt-5">
				<div dangerouslySetInnerHTML={{ __html: description }} />
			</div>

			{/* skip button */}
			<div className="text-center mt-5">
				<Button onClick={() => onSkip()}>Skip</Button>
			</div>
		</div>
	);
};

export default BreakScreen;
