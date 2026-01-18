import ContainerWrapper from "@/custom-components/ContainerWrapper";
import CompetitionSubWrap from "@/custom-components/CompetitionSubWrap";
import Marquee from "react-fast-marquee";
import WrapperBox from "@/custom-components/WrapperBox";
import EventDes from "@/custom-components/competitionComponent/unEventComponents/EventDes";
import compImage from "/competitionOne.webp";
import compImage2 from "/competitionTwo.webp";
import eventHighlight1 from "/eventHighlight1.webp";
import eventHighlight2 from "/eventHighlight2.webp";
import eventHighlight3 from "/eventHighlight3.webp";
import eventHighlight4 from "/eventHighlight4.webp";
import moe from "/moe.webp";
import y20 from "/y20.webp";
import undp from "/undp.webp";
import moc from "/moc.webp";
import Register from "@/custom-components/competitionComponent/unEventComponents/Register";
import ImpDates from "@/custom-components/competitionComponent/unEventComponents/ImpDates";
import Faqs from "@/custom-components/competitionComponent/unEventComponents/Faqs";
import Steps from "@/custom-components/competitionComponent/unEventComponents/Steps";

const compImages = [compImage, compImage2];
const eventHighlightImages = [
	eventHighlight1,
	eventHighlight2,
	eventHighlight3,
	eventHighlight4,
];
const ourPartnerImages = [moe, y20, undp, moc];

const UnEvent = () => {
	return (
		<div>
			<ContainerWrapper>
				{/* heading competition */}
				<CompetitionSubWrap className="mb-4 md:mb-8 xl:mb-14 ">
					<img
						className="w-28 md:w-72 lg:w-80 xl:w-1/3 -z-10 opacity-10 absolute top-10 md:top-5  lg:left-24 xl:top-0 xl:left-32  transform -translate-x-1/2"
						src="/unLogo.png"
						alt="united nation logo"
					/>
					<h1 className="text-center  font-bold md:text-3xl lg:text-4xl xl:text-5xl font-unbounded">
						United Nations{" "}
						<span className="text-yuvaBlue font-unbounded underline underline-offset-8">
							{" "}
							Model Event
						</span>{" "}
					</h1>
				</CompetitionSubWrap>

				{/* banner */}

				<CompetitionSubWrap className="flex justify-center mb-6">
					<img
						className="w-full  lg:full 2xl:w-full rounded-md"
						src="/competiton_banner.webp"
						alt="competition banner"
					/>
				</CompetitionSubWrap>

				{/* Event Descriptor */}

				<CompetitionSubWrap className="flex flex-col gap-6 lg:flex-row justify-between mb-6">
					<EventDes />
					<Register />
				</CompetitionSubWrap>

				{/* united nation model text */}
				<CompetitionSubWrap className="mb-6">
					<WrapperBox>
						<h1 className="text-start text-lg font-bold md:text-3xl lg:text-4xl lg:w-3/4 font-unbounded">
							WHAT IS Yuvamanthan{" "}
							<span className="text-yuvaBlue font-unbounded">
								Model United Nations?
							</span>{" "}
						</h1>
						<div className="flex flex-col lg:flex-row lg:justify-between p-2">
							<p className="w-full lg:w-1/2 font-semibold text-md lg:text-xl lg:leading-10 mb-2 lg:mb-0">
								Yuvamanthan United Nations Model is an interactive simulation
								where students step into the roles of diplomats to represent
								countries, debate global issues, and propose solutions. This
								platform fosters critical thinking, diplomacy, public speaking,
								and collaboration, empowering participants to address pressing
								international challenges while gaining a deeper understanding of
								global affairs and decision-making processes.
							</p>
							<div className="flex w-full lg:w-1/3 md:flex-row md:justify-around items-center flex-col lg:items-center lg:flex-col ">
								{compImages.map((img, i) => {
									return (
										<img
											className=" w-full rounded-md h-40 md:w-60  lg:w-full lg:h-48 mb-4"
											src={img}
											alt={img}
											loading="lazy"
											key={i}
										/>
									);
								})}
							</div>
						</div>
					</WrapperBox>
				</CompetitionSubWrap>

				{/* Imp dates */}
				<CompetitionSubWrap className="mb-6">
					<ImpDates />{" "}
				</CompetitionSubWrap>

				{/* Event highLights */}
				<CompetitionSubWrap className="mb-6">
					<WrapperBox>
						<h1 className="text-start text-lg font-bold md:text-3xl lg:text-4xl lg:w-3/4 font-unbounded">
							Event{" "}
							<span className="text-yuvaBlue font-unbounded">Highlights</span>{" "}
						</h1>{" "}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
							{eventHighlightImages.map((img, i) => {
								return (
									<img
										loading="lazy"
										src={img}
										className="w-full h-56 rounded-md object-cover "
										alt="Aippa by - yuvamanthan.org"
										key={i}
									/>
								);
							})}
						</div>
					</WrapperBox>
				</CompetitionSubWrap>

				{/* Road Map */}
				<CompetitionSubWrap className="mb-24">
					<Steps />
				</CompetitionSubWrap>
			</ContainerWrapper>
			{/* Ribbons */}

			<div className="ribbon origin-center mx-auto">
				<div className="bg-customRed -rotate-[6deg] translate-y-3 relative z-10">
					<Marquee direction="left" speed={70}>
						<p className="text-lg md:text-2xl font-bold text-white p-2 md:p-3">
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
							<span>PERIOD OFFER ★ </span>
						</p>
					</Marquee>
				</div>

				<div className="bg-yuvaBlue rotate-[6deg] -translate-y-3 -top-5 md:-top-10 relative z-0">
					<Marquee direction="right" speed={70}>
						<p className="text-lg md:text-2xl font-bold text-white p-2 md:p-3 ">
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
							<span>APPLY NOW ★ </span>
						</p>
					</Marquee>
				</div>
			</div>

			<ContainerWrapper>
				{/* our partners */}
				<CompetitionSubWrap className="mb-6">
					<WrapperBox>
						<h1 className="text-start text-lg font-bold md:text-3xl lg:text-4xl lg:w-3/4 font-unbounded">
							Our <span className="text-yuvaBlue font-unbounded">Partners</span>{" "}
						</h1>{" "}
						<div className="grid grid-cols-1  md:grid-cols-2 gap-6 ">
							{ourPartnerImages.map((img, i) => {
								return (
									<div
										className="w-full h-44 flex justify-center items-center border-2 border-yuvaBlue rounded-md justify-self-center"
										key={i}
									>
										<img
											loading="lazy"
											src={img}
											className="w-1/2 md:w-[50%] h-1/2 md:h-[65%] rounded-md justify-self-center"
											alt="event image"
										/>
									</div>
								);
							})}
						</div>
					</WrapperBox>
				</CompetitionSubWrap>

				{/* faq */}
				<CompetitionSubWrap>
					<Faqs />
				</CompetitionSubWrap>
			</ContainerWrapper>
		</div>
	);
};

export default UnEvent;
