import NumberCounter from "../NumberCounter";

const numberCounter = [
	{
		value: 5,
		tag: "k+",
		title: "Registered Schools",
	},
	{
		value: 10,
		tag: "L+",
		title: "Registered Students",
	},
	{
		value: 45,
		tag: "k+",
		title: "Registered Teachers",
	},
	{
		value: 5,
		tag: "k+",
		title: "Events Conducted",
	},
];

const NipamCounter = () => {
	return (
		<div className="flex flex-wrap justify-between gap-5">
			{numberCounter.map((counter, index) => (
				<NumberCounter
					key={index}
					value={counter.value}
					tag={counter.tag}
					title={counter.title}
					className="text-3xl"
				/>
			))}
		</div>
	);
};

export default NipamCounter;
