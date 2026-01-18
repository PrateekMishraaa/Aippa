import CareerLsmtResultType, {
	CareerRaisecResultType,
} from "@/types/careerResultTypes";

const lsmtResult: CareerLsmtResultType = [
	// note: lsmt result data starts here --------------------------------
	{
		test: "lsmt",
		category: "Highly Proficient",
		pathways: [
			"Advanced Opportunities: Students in this category, name, should be encouraged to take on leadership roles in group projects and extracurricular activities. he/she can also mentor peers who are in lower categories.",
			"Skill Enhancement: name should engage in advanced life skills workshops that focus on critical thinking, negotiation, and leadership to further refine his/her abilities.",
			"Real-World Application: Involve name in community service projects or internships that require high levels of decision-making and problem-solving skills.",
			"Leadership Projects: name can lead community service initiatives, such as organizing a local clean-up or charity event, where he/she can apply his/her leadership and organizational skills.",
			"Advanced Workshops: name should participate in workshops on negotiation strategies or advanced problem-solving techniques, allowing him/her to further enhance his/her critical thinking and collaboration skills.",
			"Mentorship Roles: name can act as a mentor for younger students, guiding them through projects or challenges, thereby reinforcing his/her own skills while helping others.",
		],
	},
	{
		test: "lsmt",
		category: "Proficient",
		pathways: [
			"Skill Development: Encourage name to participate in workshops that focus on enhancing interpersonal skills and emotional intelligence. This can include role-playing exercises and group discussions.",
			"Peer Collaboration: name should work in teams to solve complex problems, fostering collaboration and communication skills.",
			"Goal Setting: Help name set specific, measurable goals to improve life skills, with regular check-ins to monitor progress.",
			"Team Collaboration: Engage name in group projects where they need to collaborate and communicate effectively, such as creating a presentation on a social issue.",
			"Skill Development Workshops: name should attend workshops focused on emotional intelligence and conflict resolution to improve interpersonal skills.",
			"Goal Setting: Set personal goals related to life skills for name, such as improving public speaking abilities, and track progress through peer feedback.",
		],
	},
	{
		test: "lsmt",
		category: "Competent",
		pathways: [
			"Foundational Skills: Focus on building foundational life skills for name such as effective communication, self-awareness, and basic decision-making through structured programs",
			"Interactive Learning: Use interactive methods like games and simulations to help name practice skills in a safe environment.",
			"Feedback Mechanism: Establish a system for receiving constructive feedback from peers and teachers to enhance name's self-reflection and growth.",
			"Interactive Learning: name should participate in role-playing scenarios that simulate real-life situations, such as resolving a conflict or making a group decision.",
			"Feedback Sessions: Establish regular sessions where name can give and receive feedback on their communication and teamwork skills.",
			"Basic Skills Workshops: name should attend workshops that focus on foundational skills like time management and effective communication strategies.",
		],
	},
	{
		test: "lsmt",
		category: "Basic",
		pathways: [
			"Targeted Support: Provide targeted interventions to address specific areas of weakness for name, such as stress management and conflict resolution.",
			"Skill Workshops: Organize workshops for name that emphasize basic life skills, including time management and effective communication strategies.",
			"Encouragement and Motivation: Foster a supportive environment that encourages name to take small steps towards improvement, celebrating their progress along the way.",
			"Targeted Skill Sessions: name should join small group sessions focusing on specific skills like stress management or basic communication techniques.",
			"Peer Support Groups: Form peer support groups where name can share challenges and strategies for improvement in a safe environment.",
			"Skill-Building Activities: Engage name in simple activities like group discussions or ice-breaker games to build confidence in social interactions.",
		],
	},
	{
		test: "lsmt",
		category: "Emerging",
		pathways: [
			"Individualized Learning Plans: Develop personalized learning plans for name that focus on the most critical life skills needed for their personal and academic success.",
			"Mentorship Programs: Pair name with mentors who can provide guidance and support in developing essential skills.",
			"Basic Life Skills Training: Implement basic life skills training for name that covers essential topics such as self-management, interpersonal relationships, and problem-solving.",
			"Individualized Learning Plans: Work with educators to create personalized plans for name that focus on the most critical life skills needed for their development.",
			"Mentorship Programs: Pair name with mentors who can provide guidance and support in developing essential skills through structured activities.",
			"Basic Life Skills Training: Have name participate in workshops that cover essential life skills, such as self-management techniques and basic decision-making processes.",
		],
	},
	// note: lsmt result data ends here --------------------------------
];

export const raisecResult: CareerRaisecResultType = [
	{
		image: "/careerComponents/result/raisec/realistic.webp",
		title: "Realistic (R)",
		desc: "Realistic individuals, often referred to as <strong>Doers</strong>, are practical, hands-on people who enjoy physical activity, working with tools, and solving tangible problems",
		careersAvailable: [
			"Mechanical Engineer",
			"Carpenter",
			"Electrician",
			"Forestry Worker",
			"Chef",
		],
	},
	{
		image: "/careerComponents/result/raisec/investigative.webp",
		title: "Investigative (I)",
		desc: "Investigative individuals, known as <strong>Thinker</strong> are analytical, curious, and intellectual",
		careersAvailable: [
			"Scientist",
			"Data Analyst",
			"Software Developer",
			"Researcher",
			"Medical Doctor",
		],
	},
	{
		image: "/careerComponents/result/raisec/artistic.webp",
		title: "Artistic (A)",
		desc: "Artistic individuals, or <strong>Creators</strong> are creative, imaginative, and expressive",
		careersAvailable: [
			"Graphic Designer",
			"Writer",
			"Musician",
			"Film Director",
			"Fashion Designer",
		],
	},
	{
		image: "/careerComponents/result/raisec/social.webp",
		title: "Social (S)",
		desc: "Social individuals, known as <strong>Helpers</strong> are empathetic, compassionate, and enjoy working with people",
		careersAvailable: [
			"Teacher",
			"Counselor",
			"Nurse",
			"Social Worker",
			"Human Resources Specialist",
		],
	},
	{
		image: "/careerComponents/result/raisec/enterprising.webp",
		title: "Enterprising (E)",
		desc: "Enterprising individuals, or <strong>Persuaders</strong> are ambitious, energetic, and confident",
		careersAvailable: [
			"Entrepreneur",
			"Sales Manager",
			"Marketing Director",
			"Financial Advisor",
			"Real Estate Agent",
		],
	},
	{
		image: "/careerComponents/result/raisec/conventional.webp",
		title: "Conventional (C)",
		desc: "Conventional individuals, known as <strong>Organizers</strong> are detail-oriented, methodical, and enjoy working in structured environments",
		careersAvailable: [
			"Accountant",
			"Administrative Assistant",
			"Bank Teller",
			"Logistics Coordinator",
			"Data Entry Clerk",
		],
	},
];

export default lsmtResult;
