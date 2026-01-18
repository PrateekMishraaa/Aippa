import { useEffect, useState } from "react";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
import ContentData from "@/custom-components/ContentData";
import HealthData from "@/constants/healthPage";
import { useSelector } from "react-redux";
import { GetState } from "@/store/store";
import RandR from "@/custom-components/healthComponents/RandR";
import ParentAddComp from "@/custom-components/healthComponents/ParentAddComp";
import { useQuery } from "@tanstack/react-query";
import healthServiceApis from "@/services/healthService";
function Health() {
	const loggedInUser = useSelector(
		(state: GetState) => state.authSlice.isLoggedInUser
	);
	const [studentName, setStudentName] = useState<string>("bacho");
	const [getAllChildren, setGetAllChildren] = useState([]);

	useEffect(() => {
		if (loggedInUser) {
			setStudentName(loggedInUser.first_name);
		}
	}, [loggedInUser]);

	//  ---------- parent api call to fetch or add children --------------------
	const { data } = useQuery({
		queryKey: ["parentGetChildren", "parentId"],
		// todo: remove staticId(13) and add loggedInUser?.id
		queryFn: () => healthServiceApis.getHealthData(13),
		enabled: loggedInUser !== undefined,
	});

	useEffect(() => {
		if (data) {
			setGetAllChildren(data?.data?.data);
		}
	}, [data]);

	return (
		<ContainerWrapper className="space-y-5">
			<WrapperBox className="md:hidden">
				<h1 className="capitalize font-extrabold text-xl text-slate-950 font-unbounded">
					{studentName} ki sehat yaani <br />
					desh ki sehat
				</h1>
			</WrapperBox>

			<div className="relative hidden md:block">
				<img
					src="/bg-doctor.webp"
					alt="Health"
					className="w-auto h-auto drop-shadow-xl"
				/>

				<h1 className="uppercase absolute top-20 lg:top-28 xl:top-36 left-8 lg:left-10 xl:left-14 text-xl lg:text-3xl xl:text-4xl font-extrabold text-slate-100 font-unbounded">
					{studentName} ki sehat yaani <br />
					desh ki sehat
				</h1>

				<p className="absolute top-36 lg:top-48 xl:top-64 left-8 lg:left-10 xl:left-14 text-sm lg:text-lg text-slate-100">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
					Iste sapiente doloribus enim molestias inventore in.
				</p>
			</div>

			{loggedInUser && (
				<WrapperBox
					title={`Dear ${
						loggedInUser.father_name ? ` ${loggedInUser.father_name}` : "Parent"
					}!`}
				>
					<ParentAddComp data={getAllChildren} />
				</WrapperBox>
			)}

			<WrapperBox title="Rules and Regulations for Filling the Medical Form and Signing Up">
				<RandR />
			</WrapperBox>

			<WrapperBox title="Health">
				{HealthData.health.map(({ imageUrl, description }) => {
					return (
						<ContentData imageUrl={imageUrl} key={imageUrl}>
							<p className="text-slate-950">{description}</p>
						</ContentData>
					);
				})}
			</WrapperBox>
		</ContainerWrapper>
	);
}

export default Health;
