import LazyLoad from "react-lazy-load";

type UpcomingEventDataProp = {
	imageUrl?: string;
	imageAlt?: string;
};

const UpcomingEventData = ({ imageUrl, imageAlt }: UpcomingEventDataProp) => {
	return (
		<div className="w-full h-28 xl:h-44 rounded-lg overflow-hidden">
			<LazyLoad width={"100%"} height={176} threshold={0.5}>
				<div className="relative w-full">
					<img
						src={
							imageUrl ||
							"https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg"
						}
						alt={imageAlt || "yuvamanthan.org"}
						className="w-full h-full object-cover aspect-auto"
					/>
					<p className="absolute bottom-0 text-slate-50 px-3 py-2 leading-tight capitalize">
						{imageAlt}
					</p>
				</div>
			</LazyLoad>
		</div>
	);
};

export default UpcomingEventData;
