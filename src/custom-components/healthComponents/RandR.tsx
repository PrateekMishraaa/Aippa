const signUpIns = [
	"Accurate Information: Use accurate and up-to-date information when signing up.",
	`Mobile Number: Ensure you use the registered mobile number provided to the school.`,
	`Unique Login: Each parent should create a unique login to access their child’s information.
`,
];

const fillingMedicalForm = [
	`Accurate Medical History: Provide accurate and comprehensive medical history and current health status of your child.
`,
	`Attachments: If required, upload necessary medical documents or reports in the specified formats (PDF, JPG).
`,
	`Review Information: Double-check all entered information for accuracy before submitting.
`,
	`Confidentiality: All medical information will be kept confidential and used solely for the purpose of ensuring student health and safety.
`,
];

const generalGuideline = [
	`Timeliness: Complete and submit the form by the specified deadline [Insert Deadline Date].
`,
	`Support: For any issues during sign-up or form filling, contact our support team at [Insert Contact Information].
`,
	`Updates: Keep your contact information updated in case we need to reach you for any follow-up.
`,
	`Compliance: Ensure compliance with all school policies and guidelines while using the Student Dashboard.`,
];

function RandR() {
	return (
		<>
			<h2 className="text-xl font-bold">Sign-up Instructions:</h2>
			<ul>
				{signUpIns.map((item, index) => (
					<li className="list-disc" key={index}>
						{item}
					</li>
				))}
			</ul>

			<h2 className="text-xl font-bold">Filling the Medical Form:</h2>
			<ul>
				{fillingMedicalForm.map((item, index) => {
					return (
						<li className="list-disc" key={index}>
							{item}
						</li>
					);
				})}
			</ul>

			<h2 className="text-xl font-bold">General Guidelines:</h2>
			<ul>
				{generalGuideline.map((item, index) => {
					return (
						<li className="list-disc" key={index}>
							{item}
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default RandR;
