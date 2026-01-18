import undp from "/undp.webp";
import y20 from "/y20.webp";
import defence from "/defence.webp";
import youthAffairs from "/youthAffairs.webp";
import ugcGrant from "/ugcGrant.webp";
import cbseLogo from "/cbseLogo.webp";
import educationMinistry from "/educationMinistry.webp";
import Marquee from "@/components/ui/marquee";

interface PropsTypes {
	blurCss?: string;
}

const YuvamanthanPartnerMarquee = ({ blurCss }: PropsTypes) => {
	const marqueeImages = [
		{
			src: undp,
		},
		{
			src: y20,
		},
		{
			src: defence,
		},
		{
			src: youthAffairs,
		},
		{
			src: ugcGrant,
		},
		{
			src: cbseLogo,
		},
		{
			src: educationMinistry,
		},
	];
	return (
		<>
			<div className="relative ">
				<div
					className={`z-10 pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r ${blurCss}`}
				></div>
				<div
					className={`z-10 pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l ${blurCss}`}
				></div>
				<Marquee pauseOnHover className="[--duration:20s]">
					{marqueeImages.map((image, index) => (
						<div key={index} className="w-48 h-30">
							<img src={image.src} alt={image.src} className="w-full h-auto" />
						</div>
					))}
				</Marquee>
			</div>
		</>
	);
};

export default YuvamanthanPartnerMarquee;
