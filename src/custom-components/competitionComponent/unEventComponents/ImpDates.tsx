import WrapperBox from "@/custom-components/WrapperBox";

const dates = [
	{
		title: "Form Deadline",
		day: 25,
		month: " Jan",
		deadline: "Till 18:00",
	},
	{
		title: "Video Interview",
		day: 31,
		month: "Jan",
		deadline: "At 13:00",
	},
	{
		title: "Competition",
		day: "03",
		month: "Feb",
		deadline: "From 17:00",
	},
	{
		title: "Result Declaration",
		day: "05",
		month: "Feb",
		deadline: "Till 13:00",
	},
];

function ImpDates() {
	return (
		<>
			<WrapperBox>
				<h1 className="text-start text-lg font-bold md:text-3xl font-unbounded">
					IMPORTANT
					<span className="text-yuvaBlue font-unbounded"> DATES</span>{" "}
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2">
					{dates.map(({ title, day, month, deadline }, index) => {
						return (
							<div className="flex justify-start items-center mb-6" key={index}>
								<div className="bg-yuvaBlue rounded-full w-16 h-16 flex flex-col justify-around items-center p-1 text-lg text-white font-bold">
									<span className="text-xl">{day}</span>
									<span>{month}</span>
								</div>
								<div className="flex flex-col items-start justify-start ms-3">
									<span className="text-black font-bold text-lg lg:text-2xl">
										{title}
									</span>
									<span className="text-yuvaBlue text-md lg:text-lg">
										{deadline}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</WrapperBox>
		</>
	);
}

export default ImpDates;
