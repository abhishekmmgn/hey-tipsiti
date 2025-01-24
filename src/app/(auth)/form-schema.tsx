import { z } from "zod";

export interface FormActionResponse<T> {
	success: boolean;
	message: string;
	errors?: {
		[K in keyof T]?: string[];
	};
	data?: T;
}

// ----------------------------- EMAIL PASSWORD FORM -----------------------------

export const emailPasswordFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.regex(
			/^(?=.*[a-zA-Z])(?=.*\d)/,
			"Password must contain at least one letter and one number",
		)
		.min(8, "Password must be at least 8 characters")
		.max(40, "Password must not exceed 40 characters"),
});

export type EmailPasswordFormValues = z.infer<typeof emailPasswordFormSchema>;
