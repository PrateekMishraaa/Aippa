import NumberTicker from "@/components/ui/number-ticker";

interface NumberCounterProps {
	value: number;
	tag?: string;
	title?: string;
	className?: string;
}
const NumberCounter = ({
	value,
	tag,
	title,
	className,
}: NumberCounterProps) => {
	return (
		<div className="text-center w-[130px]">
			<div className={`${className} text-yuvaBlue text-5xl font-bold`}>
				<NumberTicker className="text-yuvaBlue" value={value} />
				{tag}
			</div>
			<h3 className="text-xl leading-6">{title}</h3>
		</div>
	);
};

export default NumberCounter;
