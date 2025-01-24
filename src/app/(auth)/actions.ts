"use server";

import createClientForServer from "@/lib/supabase/server";
import {
	emailPasswordFormSchema,
	type EmailPasswordFormValues,
	type FormActionResponse,
} from "./form-schema";
import { redirect } from "next/navigation";
import { saveUser } from "@/db/queries";

export async function signupAction(
	formData: EmailPasswordFormValues,
): Promise<FormActionResponse<EmailPasswordFormValues>> {
	const validatedFields = emailPasswordFormSchema.safeParse(formData);

	// validate form
	if (!validatedFields.success) {
		return {
			message: "",
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const supabase = await createClientForServer();
	const { data, error } = await supabase.auth.signUp(formData);

	if (error) {
		return {
			message: error.message,
			success: false,
		};
	}

	console.log(data, error);
	const user = data.user;
	if (user) {
		saveUser({
			id: user.id,
			email: formData.email,
		});
	}
	redirect("/verify-email");
}

export async function loginAction(
	formData: EmailPasswordFormValues,
): Promise<FormActionResponse<EmailPasswordFormValues>> {
	const validatedFields = emailPasswordFormSchema.safeParse(formData);

	// validate form
	if (!validatedFields.success) {
		return {
			message: "",
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const supabase = await createClientForServer();
	const { data, error } = await supabase.auth.signInWithPassword(formData);
	if (error) {
		return {
			message: error.message,
			success: false,
		};
	}
	redirect("/");
}

export async function googleLogin() {
	const AUTH_CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

	const supabase = await createClientForServer();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: AUTH_CALLBACK_URL,
		},
	});
	if (error) {
		console.log(error);
		return error.message;
	}
	// saveUser({
	// 	id: ,
	// 	email: ,
	// });
	redirect("/");
}
