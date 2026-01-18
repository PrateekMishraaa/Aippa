import { ReactNode } from "react";
import LazyLoad from "react-lazy-load";

type ContentDataProps = {
	children: ReactNode;
	imageUrl?: string;
	imageAlt?: string;
	className?: string;
};

const ContentData = ({
	children,
	imageUrl,
	imageAlt,
	className,
}: ContentDataProps) => {
	return (
		<div
			className={`flex flex-col md:flex-row gap-5 rounded-xl shadow-md md:shadow-none shadow-primaryBg ${className}`}
		>
			<div className="w-full md:w-96 h-64 rounded-xl overflow-hidden mb-4">
				<LazyLoad height={256} threshold={0.5}>
					<img
						src={
							imageUrl ||
							"https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg"
						}
						alt={imageAlt || "yuvamanthan.org"}
						className="w-full h-full object-cover"
					/>
				</LazyLoad>
			</div>

			<div className="flex-1 space-y-5 p-5 md:p-0 ">{children}</div>
		</div>
	);
};

export default ContentData;
