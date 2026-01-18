import HomeData from "@/constants/homePage";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import ContentData from "@/custom-components/ContentData";
import UpcomingEventData from "@/custom-components/UpcomingEventData";
import WrapperBox from "@/custom-components/WrapperBox";
import aippa from "/aippa.webp";
import useAuth from "@/context/AuthContext";
import useHooks from "@/context/HookContext";
import { useEffect, useState } from "react";
import NipamCounter from "@/custom-components/correctionFormComponents/NipamCounter";
import YuvamanthanPartnerMarquee from "@/custom-components/correctionFormComponents/YuvamanthanPartnerMarquee";
import OurEvents from "@/custom-components/correctionFormComponents/OurEvents";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";

const Home = () => {
	const { navigate } = useHooks();
	const { isLoggedIn } = useAuth();
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);

	const [parentName, setParentName] = useState<string>("parent");
	const [childName, setChildName] = useState<string>("");
	const [gender, setGender] = useState<string>("him");

	useEffect(() => {
		if (loggedInUser) {
			setParentName(loggedInUser?.father_name);
			setChildName(loggedInUser?.first_name);
			setGender(loggedInUser?.gender === "male" ? "him" : "her");
		} else {
			setParentName("parent");
			setChildName("");
			setGender("him");
		}
	}, [loggedInUser]);

	return (
		<ContainerWrapper>
			<div className="flex gap-5">
				{/* left side  */}
				<div className="w-full xl:w-9/12 flex flex-col gap-y-5">
					<WrapperBox title="About AIPPA">
						<ContentData imageUrl={aippa} className="md:items-center">
							<p>
								<strong className="capitalize text-lg">
									dear {parentName}
								</strong>
								, <br />
								We are excited to introduce this platform, designed to support
								and enhance the growth and development of your child
								{childName && (
									<>
										,{" "}
										<strong className="capitalize text-yuvaBlue">
											{childName}
										</strong>
									</>
								)}{" "}
								and all children like {gender}.
							</p>

							<p>
								AIPPA stands for all{" "}
								<strong className="capitalize text-yuvaBlue">
									india progressive parent's association
								</strong>
								. We are a community of people committed to making Africa a more
								prosperous and equal place.
							</p>

							<div className="xl:hidden ">
								{!isLoggedIn && (
									<>
										<div className="flex flex-wrap gap-y-2 items-center justify-between">
											<p className="text-2xl font-bold">
												Unlock additional features.
											</p>
											<Button className="bg-yuvaBlue hover:bg-yuvaBlue/90">
												Sign in
											</Button>
										</div>
									</>
								)}
							</div>
						</ContentData>
					</WrapperBox>

					<WrapperBox title="YUVAMANTHAN'S PARTNERS" className="space-y-0">
						<YuvamanthanPartnerMarquee blurCss="from-white" />
					</WrapperBox>

					<WrapperBox>
						<NipamCounter />
					</WrapperBox>

					{/* mobile view marquee of upcoming events and projects */}
					<WrapperBox
						title="upcoming events and projects"
						className="xl:hidden"
					>
						<div>
							<div>
								<Marquee pauseOnHover className="[--duration:20s] ">
									{HomeData.upcomingEvents.map(({ imageUrl, title }, i) => (
										<div key={i} className="relative w-48">
											<img src={imageUrl} alt={title} className="w-full " />
											<p className="absolute bottom-3 px-3 text-slate-100 text-xs">
												{title}
											</p>
										</div>
									))}
								</Marquee>
							</div>

							<div>
								<Marquee reverse pauseOnHover className="[--duration:20s] ">
									{HomeData.upcomingProjects.map(({ imageUrl, title }, i) => (
										<div key={i} className="relative w-48">
											<img src={imageUrl} alt={title} className="w-full " />
											<p className="absolute bottom-3 px-3 text-slate-100 text-xs">
												{title}
											</p>
										</div>
									))}
								</Marquee>
							</div>
						</div>
					</WrapperBox>

					<WrapperBox title="SOME PARTICIPATING SCHOOLS">
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-center gap-5">
							{HomeData.participatingSchoolsLogo.map(
								({ imageUrl, title }, i) => (
									<div key={i} className="relative flex flex-col items-center">
										<div className="w-24 h-24 sm:w-32 sm:h-32 md:w-38 md:h-38">
											<img
												src={imageUrl}
												alt={title}
												className="w-full h-auto aspect-square"
											/>
										</div>

										<p className="font-semibold text-center px-3 py-1  text-slate-900 text-xs rounded">
											{title}
										</p>
									</div>
								)
							)}
						</div>
					</WrapperBox>

					<WrapperBox title="OUR EVENTS">
						<OurEvents />
					</WrapperBox>
				</div>

				{/* right side */}
				<div className="hidden xl:block w-3/12 space-y-5">
					{!isLoggedIn && (
						<WrapperBox
							title="Unlock additional features."
							titleCss="text-slate-950 !text-2xl"
							className="bg-yuvaBlue/50"
						>
							<p className="text-lg text-slate-950">
								Know the features you care about. Features which really matters.
							</p>

							<div className="pt-10 xl:pt-16 flex justify-between items-center">
								<button
									className="bg-yuvaBlue text-white px-5 py-2 rounded-full"
									onClick={() => navigate("/sign-in")}
								>
									Sign in
								</button>
								<p className="text-slate-950">Learn more</p>
							</div>
						</WrapperBox>
					)}

					<WrapperBox title="upcoming events" titleCss="!text-2xl">
						<div className="hideScrollBar h-[240px] xl:h-[375px] overflow-y-scroll  space-y-2 xl:pace-y-5 ">
							{HomeData.upcomingEvents.map(({ imageUrl, title }, i) => (
								<UpcomingEventData
									imageUrl={imageUrl}
									imageAlt={title}
									key={i}
								/>
							))}
						</div>
					</WrapperBox>

					<WrapperBox title="upcoming projects" titleCss="!text-2xl">
						<div className="hideScrollBar h-[240px] xl:h-[375px] overflow-y-scroll space-y-2 xl:space-y-5">
							{HomeData.upcomingProjects.map(({ imageUrl, title }, i) => (
								<UpcomingEventData
									imageUrl={imageUrl}
									imageAlt={title}
									key={i}
								/>
							))}
						</div>
					</WrapperBox>
				</div>
			</div>
		</ContainerWrapper>
	);
};

export default Home;
