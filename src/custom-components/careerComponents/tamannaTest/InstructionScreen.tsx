import CareerData from "@/constants/careerPage";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useHooks from "@/context/HookContext";

interface IInstructionScreen {
	setPhase: (phase: string) => void;
}

const InstructionScreen = ({ setPhase }: IInstructionScreen) => {
	const [isWindowSmall, setIsWindowSmall] = useState<boolean>(false);
	const { navigate } = useHooks();

	useEffect(() => {
		const handleResize = () => {
			const check = window.innerWidth <= 768;
			if (check) setIsWindowSmall(check);
			else setIsWindowSmall(false);
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<div className="flex items-center">
				<p className="uppercase text-7xl font-bold text-slate-950">
					tamanna test
				</p>
				<img
					src="/careerComponents/tamannaTest/leafTamanna.webp"
					alt="tamanna"
					className="relative w-32 h-32 -left-2"
				/>
			</div>

			{/* duration and maximum marks */}
			<div className="w-full flex flex-wrap gap-y-5">
				<div className="w-full md:flex-1 flex gap-10 items-center">
					<p className="text-slate-600">Duration: 85 mins</p>
					<p className="text-slate-600">Maximum Marks: 240</p>
				</div>

				<div
					className="w-full md:flex-1 py-4 px-7 bg-yuvaBlue flex items-center justify-center rounded-md md:rounded-none !rounded-tr-md !rounded-br-md"
					style={{
						clipPath: `polygon(100% 0, 100% 100%, 0% 100%, ${
							isWindowSmall ? "0%" : "5%"
						} 50%, 0% 0%)`,
					}}
				>
					<p className="text-slate-50 font-semibold md:text-xs lg:text-base">
						Try and Measure Aptitude and natural abilities
					</p>
				</div>
			</div>

			{/* Instructions */}
			<div className="flex flex-wrap gap-y-5">
				<div className="w-full lg:flex-1 space-y-5">
					<p className="text-red-500 text-xl ">
						Read the following instructions carefully :
					</p>

					<ul className="list-disc px-5 space-y-5 text-slate-950">
						{CareerData.tamannaInstructions.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>

				<div className="w-full lg:flex-1 flex items-center justify-center">
					<div>
						<img
							src="/careerComponents/tamannaTest/paperBoard.webp"
							alt="tamanna"
						/>
					</div>
				</div>
			</div>

			{/* exit or start test button */}
			<div className="flex gap-5">
				<Button variant={"destructive"} onClick={() => navigate("/career")}>
					Exit
				</Button>

				<Button
					className="bg-yuvaBlue hover:bg-yuvaBlue/90"
					onClick={() => setPhase("test")}
				>
					Start Test
				</Button>
			</div>
		</>
	);
};

export default InstructionScreen;
