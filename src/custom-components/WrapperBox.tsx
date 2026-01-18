import { ReactNode } from "react";

interface WrapperBoxProp {
	children: ReactNode;
	title?: string;
	titleCss?: string;
	className?: string;
}
const WrapperBox = ({
	children,
	title,
	className,
	titleCss,
}: WrapperBoxProp) => {
	return (
		<div className={`w-full bg-white p-7 rounded-3xl space-y-5 ${className}`}>
			{title && (
				<div>
					<h3
						className={`text-2xl md:text-3xl font-semibold capitalize ${titleCss}`}
					>
						{title}
					</h3>
				</div>
			)}

			<div className="space-y-5">{children}</div>
		</div>
	);
};

export default WrapperBox;
