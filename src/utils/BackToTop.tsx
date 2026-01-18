import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import scrollToTop from "@/utils/scrollToTop";

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<Button
			className={`fixed bottom-24 sm:bottom-5 right-5 
                ${isVisible ? "flex" : "hidden"}`}
			variant={"outline"}
			size={"icon"}
			onClick={scrollToTop}
		>
			<FaAngleUp />
		</Button>
	);
};

export default BackToTop;
