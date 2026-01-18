import ipLogo from "/ipLogo.webp";
import cbseLogo from "/cbseLogo.webp";
import kvsSchool from "/kvsSchool.webp";
import nvLogo from "/nvLogo.webp";
import NipamCounter from "./NipamCounter";

const schoolLogos = [
	{ img: ipLogo, name: "Indira Gandhi Polytechnic" },
	{ img: cbseLogo, name: "Central Board of Secondary Education" },
	{ img: kvsSchool, name: "KVS School" },
	{ img: nvLogo, name: "Netaji Vidyanagar Polytechnic" },
];

function NipamInfo() {
	return (
		<div className="w-full md:w-6/12 rounded-md ">
			{/* nipam upper box */}
			<div className="w-full sm:w-11/12 m-auto  border-2 border-yuvaBlue rounded-lg p-6 space-y-6">
				<header className="text-center font-extrabold text-4xl text-customBlue ">
					N.I.P.A.M
				</header>
				<p className="text-center font-semibold text-lg text-black opacity-70">
					National Intellectual Property Awareness Mission (NIPAM), under the
					aegis of Office of the Controller General of Patents, Designs &
					Trademarks, Ministry of Commerce & Industry is a beacon entrusted with
					the mission of democratising awareness of intellectual property and
					its rights.
				</p>
				<div id="nipmaBtn" className="flex justify-center">
					<a
						href="https://www.yuvamanthan.org/nipam"
						target="_blank"
						className="bg-yuvaBlue w-11/12 rounded-md text-center text-white font-semibold text-xl p-2 "
					>
						Learn More
					</a>
				</div>
			</div>
			{/* custom border */}
			<div className="relative m-auto w-full sm:w-3/4 p-4 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-fadedBorder before:to-transparent mb-6"></div>{" "}
			{/* school logo */}
			<div className=" flex flex-wrap justify-between items-center w-11/12 m-auto px-5">
				{schoolLogos.map((logo, index) => (
					<div
						key={index}
						className={`flex-shrink-0 w-28 h-28 sm:w-24 sm:h-24 flex justify-center items-center`}
					>
						<img src={logo.img} className="w-full h-full " alt={logo.name} />
					</div>
				))}
			</div>
			{/* custom border */}
			<div className="relative m-auto w-3/4 p-4 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-fadedBorder before:to-transparent mb-6"></div>{" "}
			{/* counter */}
			<NipamCounter />
		</div>
	);
}

export default NipamInfo;
