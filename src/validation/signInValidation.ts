import { z } from "zod";

// Define the validation schema
const signInSchema = z.object({
	user: z
		.string()
		.min(1, { message: "Identifier is required" }) // Ensure identifier is not empty
		.refine(
			(val) =>
				/^[a-zA-Z0-9_]+$/.test(val) ||
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
			{
				message: "Identifier must be a valid username or email",
			}
		), // Example: validates if it's a valid email
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }) // Minimum length requirement for password
		.max(20, { message: "Password must be no more than 20 characters" }), // Maximum length requirement
});

export default signInSchema;
