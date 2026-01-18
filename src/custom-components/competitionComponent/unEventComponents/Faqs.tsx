import WrapperBox from "@/custom-components/WrapperBox";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
const accordianText = [
	{
		title: "What is YMUN?",
		description:
			"Yuvamanthan United Nations Model is an interactive simulation where students step into the roles of diplomats to represent countries, debate global issues, and propose solutions.",
	},
	{
		title: "What is YMUN?",
		description:
			"Yuvamanthan United Nations Model is an interactive simulation where students step into the roles of diplomats to represent countries, debate global issues, and propose solutions.",
	},
	{
		title: "What is AIPPA?",
		description:
			"Yuvamanthan United Nations Model is an interactive simulation where students step into the roles of diplomats to represent countries, debate global issues, and propose solutions.",
	},
];
function Faqs() {
	return (
		<WrapperBox>
			<h1 className="text-yuvaBlue text-center  text-lg font-bold md:text-3xl font-unbounded">
				FAQ'S
			</h1>
			{accordianText.map(({ title, description }, index) => {
				return (
					<Accordion type="single" collapsible key={index}>
						<AccordionItem value="item-1">
							<AccordionTrigger className="bg-gray-200 text-md lg:text-xl rounded-xl p-2 py-3 px-6 font-bold">
								{`${index + 1}.`} {"  "} {title}
							</AccordionTrigger>
							<AccordionContent className=" rounded-md p-2 mt-2">
								{description}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				);
			})}
		</WrapperBox>
	);
}

export default Faqs;
