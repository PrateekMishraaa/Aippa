// import React from "react";
import ContainerWrapper from "@/custom-components/ContainerWrapper";
import WrapperBox from "@/custom-components/WrapperBox";
import ContentData from "@/custom-components/ContentData";
import SafetyPage from "@/constants/safetyPage";

function Safety() {
	return (
		<ContainerWrapper>
			<WrapperBox title="Safety">
				{SafetyPage.safety.map(({ imageUrl, description }) => {
					return (
						<ContentData imageUrl={imageUrl} imageAlt={imageUrl} key={imageUrl}>
							<p className="text-slate-950">{description}</p>
						</ContentData>
					);
				})}
			</WrapperBox>
		</ContainerWrapper>
	);
}

export default Safety;
