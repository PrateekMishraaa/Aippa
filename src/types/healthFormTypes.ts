interface FitnessMetrics {
	bmi: string;
	muscularStrength: {
		corePartialCurlUp: string;
		upperBodyFlexedArmHang: string;
	};
	flexibility: {
		sitAndReach: string;
	};
	endurance: {
		meterRun600: string;
	};
	balance: {
		flamingoBalanceTest: string;
	};
	agility: {
		shuttleRun: string;
	};
	speed: {
		sprintDash: string;
	};
	power: {
		standingVerticalJump: string;
	};
	coordination: {
		plateTapping: string;
		alternativeHandWallTossTest: string;
	};
}

interface PostureEvaluation {
	headForward: string;
	sunkenChest: string;
	roundShoulders: string;
	kyphosis: string;
	lordosis: string;
	abdominalPtosis: string;
	bodyLean: string;
	tiltedHead: string;
	shouldersUneven: string;
	scoliosis: string;
	flatFeet: string;
	knockKnees: string;
	bowLegs: string;
}

interface VitalSigns {
	pulse: string;
	bloodPressure: {
		systolic: string;
		diastolic: string;
	};
}

interface DentalInfo {
	teeth: {
		occlusion: string;
		caries: string;
	};
	tonsils: string;
	gums: string;
}

interface VisionAndHearing {
	vision: {
		rightEye: string;
		leftEye: string;
	};
	ears: {
		left: string;
		right: string;
	};
}

interface FamilyInfo {
	mother: {
		name: string;
		aadharCardNo: string;
		yearOfBirth: string;
		bloodGroup: string;
		height: string;
		weight: string;
	};
	father: {
		name: string;
		aadharCardNo: string;
		yearOfBirth: string;
		bloodGroup: string;
		height: string;
		weight: string;
	};
}

interface GeneralInfo {
	name: string;
	dob: string;
	phoneNo: string;
	height: string;
	weight: string;
	aadharCardNo: string;
	gender: string;
	bloodGroup: string;
	address: string;
	cswn: string;
	familyIncome: string;
}

interface Circumference {
	hip: string;
	waist: string;
}

interface StudentHealthProfile {
	parentId: string;
	parentEmail: string;
	studentAdmissionNo: string;
	generalInfo: GeneralInfo;
	familyInfo: FamilyInfo;
	visionAndHearing: VisionAndHearing;
	dentalInfo: DentalInfo;
	circumference: Circumference;
	vitalSigns: VitalSigns;
	postureEvaluation: PostureEvaluation;
	fitnessMetrics: FitnessMetrics;
	activities: {
		strand1: string;
		strand2: string;
	};
}

export default StudentHealthProfile;
