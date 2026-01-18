import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const NavigationCarousel = () => {
	const data = [1, 2, 3, 4, 5];

	return (
		<>
			<Swiper
				navigation={true}
				modules={[Navigation, Autoplay]}
				loop={true}
				// autoplay={{
				// 	delay: 5000,
				// 	disableOnInteraction: false,
				// }}
				className="mySwiper bg-transparent"
			>
				{data.map((item, i) => (
					<SwiperSlide key={i}>
						<div
							className={` h-96 rounded-2xl overflow-hidden flex justify-center items-center`}
						>
							<img
								src="/banner.png"
								alt={`${item}a`}
								className="w-full h-full object-cover aspect-auto"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default NavigationCarousel;
