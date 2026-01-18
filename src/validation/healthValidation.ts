import { z } from "zod";

// Blood group and gender validation schemas
const bloodGroupSchema = z.enum([
	"A+",
	"A-",
	"B+",
	"B-",
	"AB+",
	"AB-",
	"O+",
	"O-",
]);

const genderSchema = z.enum(["Male", "Female", "Other"]);

// General Information Schema
const generalInfoSchema = z.object({
	name: z.string().min(1, "Name is required"),
	dob: z.string().min(1, "Date of birth is required"), // Add further validation for date if needed
	phone_no: z
		.string()
		.regex(
			/^\+91 \d{10}$/,
			"Phone number must be in the format +91 XXXXXXXXXX"
		),
	height: z.string().min(1, "Height is required"), // "165 CM" format, no further parsing unless needed
	weight: z.string().min(1, "Weight is required"), // "71 KG" format, no further parsing unless needed
	aadhar_card_no: z
		.string()
		.length(16, "Aadhar card number must be exactly 12 digits")
		.regex(/^\d+$/, "Aadhar number must be numeric"),
	gender: genderSchema,
	blood_group: bloodGroupSchema,
	address: z.string().min(1, "Address is required"),
	cswn: z.string().min(1, "CSWN is required"),
	family_income: z.string().min(1, "Family income is required"),
});

// Family Information Schema
const familyInfoSchema = z.object({
	mother: z.object({
		name: z.string().min(1, "Mother's name is required"),
		aadhar_card_no: z
			.string()
			.length(12, "Aadhar card number must be exactly 12 digits")
			.regex(/^\d+$/, "Aadhar number must be numeric"),
		year_of_birth: z
			.number()
			.min(1900, "Year of birth must be a valid year")
			.max(new Date().getFullYear(), "Year of birth cannot be in the future"),
		blood_group: bloodGroupSchema,
		height: z.string().min(1, "Mother's height is required"),
		weight: z.string().min(1, "Mother's weight is required"),
	}),
	father: z.object({
		name: z.string().min(1, "Father's name is required"),
		aadhar_card_no: z
			.string()
			.length(12, "Aadhar card number must be exactly 12 digits")
			.regex(/^\d+$/, "Aadhar number must be numeric"),
		year_of_birth: z
			.number()
			.min(1900, "Year of birth must be a valid year")
			.max(new Date().getFullYear(), "Year of birth cannot be in the future"),
		blood_group: bloodGroupSchema,
		height: z.string().min(1, "Father's height is required"),
		weight: z.string().min(1, "Father's weight is required"),
	}),
});

// Vision and Hearing Schema
const visionAndHearingSchema = z.object({
	vision: z.object({
		right_eye: z.string().min(1, "Right eye vision is required"),
		left_eye: z.string().min(1, "Left eye vision is required"),
	}),
	ears: z.object({
		left: z.string().min(1, "Left ear hearing is required"),
		right: z.string().min(1, "Right ear hearing is required"),
	}),
});

// Dental Information Schema
const dentalInfoSchema = z.object({
	teeth: z.object({
		occlusion: z.string().min(1, "Teeth occlusion is required"),
		caries: z.string().min(1, "Teeth caries status is required"),
	}),
	tonsils: z.string().min(1, "Tonsils status is required"),
	gums: z.string().min(1, "Gums status is required"),
});

// Circumference Schema
const circumferenceSchema = z.object({
	hip: z.string().min(1, "Hip size is required"),
	waist: z.string().min(1, "Waist size is required"),
});

// Vital Signs Schema
const vitalSignsSchema = z.object({
	pulse: z.string().min(1, "Pulse must be a valid number"),
	blood_pressure: z.object({
		systolic: z
			.string()
			.min(1, "Systolic blood pressure must be a valid number"),
		diastolic: z
			.string()
			.min(1, "Diastolic blood pressure must be a valid number"),
	}),
});

// Posture Evaluation Schema
const postureEvaluationSchema = z.object({
	head_forward: z.string().min(1, "It should be a true or false"),
	sunken_chest: z.string().min(1, "It should be a true or false"),
	round_shoulders: z.string().min(1, "It should be a true or false"),
	kyphosis: z.string().min(1, "It should be a true or false"),
	lordosis: z.string().min(1, "It should be a true or false"),
	abdominal_ptosis: z.string().min(1, "It should be a true or false"),
	body_lean: z.string().min(1, "It should be a true or false"),
	tilted_head: z.string().min(1, "It should be a true or false"),
	shoulders_uneven: z.string().min(1, "It should be a true or false"),
	scoliosis: z.string().min(1, "It should be a true or false"),
	flat_feet: z.string().min(1, "It should be a true or false"),
	knock_knees: z.string().min(1, "It should be a true or false"),
	bow_legs: z.string().min(1, "It should be a true or false"),
});

// Fitness Metrics Schema
const fitnessMetricsSchema = z.object({
	bmi: z.number().min(1, "BMI must be a valid number"),
	muscular_strength: z.object({
		core_partial_curl_up: z
			.string()
			.min(1, "Core partial curl up must be a valid number"),
		upper_body_flexed_arm_hang: z
			.string()
			.min(1, "Upper body flexed arm hang must be a valid number"),
	}),
	flexibility: z.object({
		sit_and_reach: z.string().min(1, "Sit and reach must be a valid number"),
	}),
	endurance: z.object({
		meter_run_600: z.string().min(1, "Meter run 600 must be a valid number"),
	}),
	balance: z.object({
		flamingo_balance_test: z
			.string()
			.min(1, "Flamingo balance test must be a valid number"),
	}),
	agility: z.object({
		shuttle_run: z.string().min(1, "Shuttle run time must be a valid number"),
	}),
	speed: z.object({
		sprint_dash: z.string().min(1, "Sprint dash must be a valid number"),
	}),
	power: z.object({
		standing_vertical_jump: z
			.string()
			.min(1, "Standing vertical jump must be a valid number"),
	}),
	coordination: z.object({
		plate_tapping: z.string().min(1, "Plate tapping must be a valid number"),
		alternative_hand_wall_toss_test: z
			.string()
			.min(1, "Alternative hand wall toss test must be a valid number"),
	}),
});

// Activities Schema
const activitiesSchema = z.object({
	strand_1: z.string().min(1, "Strand 1 activity is required"),
	strand_2: z.string().min(1, "Strand 2 activity is required"),
});

// Complete Schema
const healthValidation = z.object({
	general_info: generalInfoSchema,
	family_info: familyInfoSchema,
	vision_and_hearing: visionAndHearingSchema,
	dental_info: dentalInfoSchema,
	circumference: circumferenceSchema,
	vital_signs: vitalSignsSchema,
	posture_evaluation: postureEvaluationSchema,
	fitness_metrics: fitnessMetricsSchema,
	activities: activitiesSchema,
});

export default healthValidation;
