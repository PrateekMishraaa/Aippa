import { ReactNode } from "react";
import { motion } from "motion/react";

const pageVariants = {
	initial: {
		opacity: 0,
		scale: 0.98,
		y: 30,
		x: 0,
	},
	animate: {
		opacity: 1,
		scale: 1,
		y: 0,
		x: 0,
		transition: {
			type: "ease",
			duration: 0.6,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		scale: 0.98,
		y: -20,
		x: 0,
		transition: {
			type: "ease",
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

const PageAnimation = ({ children }: { children: ReactNode }) => {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageVariants}
			transition={{ duration: 1.5 }}
		>
			{children}
		</motion.div>
	);
};

export default PageAnimation;
