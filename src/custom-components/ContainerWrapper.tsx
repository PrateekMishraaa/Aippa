import { ReactNode } from "react";

interface ContainerWrapperProps {
	children: ReactNode;
	className?: string;
}

const ContainerWrapper = ({ children, className }: ContainerWrapperProps) => {
	return (
		<div
			className={`${className} container mx-auto pt-[170px] pb-[100px] sm:pb-5 sm:pt-[135px] px-5`}
		>
			{children}
		</div>
	);
};

export default ContainerWrapper;
