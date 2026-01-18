import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
// Default theme
import "./marqueeSplideCss.css";

function OurEvents() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = (e: Event) => {
			const windowTarget = e.target as Window;
			setWindowWidth(windowTarget.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<Splide
				options={{
					arrows: false,
					rewind: true,
					gap: "1rem",
					type: "loop",
					perPage: windowWidth <= 580 ? 2 : windowWidth <= 767 ? 3 : 4,
					focus: "center",
					autoplay: true,
					interval: 1500,
				}}
				aria-label="My Favorite Images"
			>
				<SplideSlide>
					<img
						className="w-full h-full rounded-md"
						src="/event1.webp"
						alt="Event 1"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						className="w-full h-full rounded-md"
						src="/event2.webp"
						alt="Event 2"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						className="w-full h-full rounded-md"
						src="/event3.webp"
						alt="Event 3"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						className="w-full h-full rounded-md"
						src="/event4.webp"
						alt="Event 4"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						className="w-full h-full rounded-md"
						src="/event5.webp"
						alt="Event 5"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						className="w-full h-full rounded-md"
						src="/event6.webp"
						alt="Event 6"
					/>
				</SplideSlide>
			</Splide>
		</>
	);
}

export default OurEvents;
