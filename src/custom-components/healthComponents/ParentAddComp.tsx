import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

//eslint-disable-next-line
function ParentAddComp({ data }: { data: any[] }) {
	return (
		<div>
			<h2 className="text-xl font-bold mb-2">
				{data.length > 1 ? "Children : " : "Child : "}
			</h2>

			{/* Children Details */}
			<div className="flex flex-wrap justify-start items-center gap-3">
				<Link to="/health/add-form">
					<Button variant={"outline"}>Add children(s)</Button>
				</Link>{" "}
				:
				{Array.isArray(data) && data.length > 0 ? (
					data.map((child) => (
						<Link
							to={`/health/details/${child.healthRecord.general_info.name}/${child.id}`}
							key={child.id}
						>
							<Button variant="outline">
								{child.healthRecord.general_info.name}
							</Button>
						</Link>
					))
				) : (
					<p className="text-sm">No children added</p>
				)}
			</div>
		</div>
	);
}

export default ParentAddComp;
