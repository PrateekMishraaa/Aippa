import armyPublic from "/armyPublic.webp";
import balBharti from "/balBharti.webp";
import dpsSchool from "/Dps.webp";
import kvsSchool from "/kvs.webp";
import xavierSchool from "/Xavier.webp";

const ParticipatingSchools = () => {
	return (
		<div className="flex flex-wrap gap-10 justify-center ">
			{[armyPublic, balBharti, dpsSchool, kvsSchool, xavierSchool].map(
				(img, index) => (
					<div
						key={index}
						className="relative w-96 h-60 max-w-sm rounded-md overflow-hidden shadow-lg shadow-slate-500"
					>
						<img className="w-full h-full object-cover" src={img} alt={img} />
					</div>
				)
			)}
		</div>
	);
};

export default ParticipatingSchools;
