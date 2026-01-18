import WrapperBox from "@/custom-components/WrapperBox";

import {
	AlarmClock,
	CalendarDays,
	Eye,
	Forward,
	Heart,
	User,
	UsersRound,
} from "lucide-react";

const assets = [
	{
		logo: <User />,
		heading: "Registered",
		text: "180/200 Students",
	},
	{
		logo: <UsersRound />,
		heading: "Team Size",
		text: "Individual",
	},
	{
		logo: <Eye />,
		heading: "Impression",
		text: "180/200 Students",
	},
	{
		logo: <User />,
		heading: "Registered",
		text: "180/200 Students",
	},
	{
		logo: <AlarmClock />,
		heading: "Registration Deadline",
		text: "21 Jan, 2025",
	},
];

const assests2 = [<Heart />, <CalendarDays />, <Forward />];

function Register() {
	return (
		<>
			<WrapperBox className="w-[38%] lg:w-[40%]">
				<div className="border-b-2 border-gray-200">
					<div className="flex flex-row justify-between mb-6">
						<span className="text-2xl font-bold">&#8377; 999/-</span>
						<span className="flex flex-row justify-around">
							{assests2.map((logo, i) => (
								<span className="p-2" key={i}>
									{logo}
								</span>
							))}
						</span>
					</div>
					<div className="flex justify-center mb-6">
						<button
							className="bg-yuvaBlue w-4/5 lg:w-[100%] text-xl text-white font-semibold p-2 rounded-lg"
							type="button"
						>
							Register Now
						</button>
					</div>
				</div>
				<div className="logosAndTexts">
					{assets.map(({ logo, text, heading }, index) => {
						return (
							<div key={index} className="flex justify-start">
								<span className="p-1 px-2 border rounded-full flex justify-center items-center bg-gray-200 mb-3">
									{logo}
								</span>
								<span className="p-1 ms-3 flex flex-col text-yuvaBlue">
									<span className="text-black font-semibold">{heading}</span>
									<span>{text}</span>
								</span>
							</div>
						);
					})}
				</div>
			</WrapperBox>
		</>
	);
}

export default Register;
