import { z } from "zod";

const correctionForm = z
	.object({
		first_name: z.string().min(1, "First Name is required"),
		last_name: z.string().min(1, "Last Name is required"),
		father_name: z.string().min(1, "Father's Name is required"),
		contact: z
			.string()
			.min(10, "Contact Number is required")
			.max(13, "Contact Number should not exceed 13 characters")
			.regex(/^[0-9]+$/, "Contact Number must be numeric"), // Optional: You can enforce numeric values
		email: z
			.string()
			.email("Invalid email address")
			.min(1, "Email is required"),
		dob: z.string().min(1, "Date of Birth is required"),
		gender: z
			.string()
			.min(1, "Either male or female")
			.max(6, "Either male or female"),
		class: z
			.string()
			.regex(/^(6|7|8|9|10|11|12)$/, "Class Name must be 6 - 12")
			.min(1, "Class Name is required"),
		stream: z.string().optional(),
	})
	.refine(
		(data) => {
			// If the class is 11 or 12, stream must not be empty
			if (data.class === "11" || data.class === "12") {
				return data.stream && data.stream?.length > 0;
			}
			// If class is not 11 or 12, stream can be empty
			return true;
		},
		{
			message: "Stream is required for class 11 or 12",
			path: ["stream"],
		}
	);

export default correctionForm;
