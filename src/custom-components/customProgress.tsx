interface IProps {
	value: number;
}

export const Progress = ({ value }: IProps) => {
	return (
		<div className="relative h-2 w-full rounded-full bg-primary/20 ">
			<div
				className={`progressScroll h-full flex-1 bg-primary transition-all rounded-full `}
				style={{ width: `${value || 0}%` }}
			/>
			<img
				src="/progressBalloon.webp"
				alt="progress"
				className="absolute top-1/2 -translate-y-1/2 h-[40px] w-[40px] transition-all"
				style={{ left: `calc(${value}% - 20px)` }}
			/>
		</div>
	);
};

export default Progress;
