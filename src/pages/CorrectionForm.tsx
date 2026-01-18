import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import Correction from "@/custom-components/correctionFormComponents/Correction";
import NipamInfo from "@/custom-components/correctionFormComponents/NipamInfo";
import OurEvents from "@/custom-components/correctionFormComponents/OurEvents";
import ParticipatingSchools from "@/custom-components/correctionFormComponents/ParticipatingSchools";
import YuvamanthanPartnerMarquee from "@/custom-components/correctionFormComponents/YuvamanthanPartnerMarquee";
import CorrectionFormApi from "@/services/correctionFormServices";
import { useQuery } from "@tanstack/react-query";

type Params = {
	id?: string;
	email?: string;
};

const CorrectionForm = () => {
	const params = useParams<Params>();
	const [formData, setFormData] = useState({});

	const { data } = useQuery({
		queryKey: ["correctionFormGetPrefillData", "id", "email"],
		queryFn: () =>
			CorrectionFormApi.getFormData({
				id: params.id!,
				email: params.email!,
			}),
	});

	useEffect(() => {
		if (data) {
			setFormData(data.data.student);
		}
	}, [data]);

	return (
		<ContainerWrapper className="space-y-14 ">
			<section
				id="form&info"
				className="md:flex justify-between space-y-5 sm:space-y-0"
			>
				<Correction data={formData} />
				<NipamInfo />
			</section>

			<section className="text-center space-y-10">
				<h1 className="text-3xl font-bold">
					PARTICIPATING <span className="text-yuvaBlue">SCHOOLS</span>
				</h1>

				<ParticipatingSchools />
			</section>

			<section className="text-center space-y-10">
				<h2 className="text-3xl font-bold">
					YUVAMANTHAN'S <span className="text-yuvaBlue">PARTNERS</span>
				</h2>

				<YuvamanthanPartnerMarquee blurCss="from-primaryBg" />
			</section>

			<section className="text-center space-y-10">
				<h2 className="text-3xl font-bold">
					OUR <span className="text-yuvaBlue">EVENTS</span>
				</h2>

				<OurEvents />
			</section>
		</ContainerWrapper>
	);
};

export default CorrectionForm;
