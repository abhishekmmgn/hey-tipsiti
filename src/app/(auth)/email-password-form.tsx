"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginAction, signupAction } from "./actions";
import {
	emailPasswordFormSchema,
	type EmailPasswordFormValues,
	type FormActionResponse,
} from "./form-schema";
import { Button } from "@/components/ui/button";

export default function EmailPasswordForm({
	type,
}: {
	type: "login" | "signup";
}) {
	const [rootError, setRootError] = useState<string | null>(null);

	const form = useForm<EmailPasswordFormValues>({
		resolver: zodResolver(emailPasswordFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: EmailPasswordFormValues) {
		let response: FormActionResponse<EmailPasswordFormValues>;
		if (type === "login") {
			response = await loginAction(values);
		} else {
			response = await signupAction(values);
		}
		console.log(response);
		if (response.success) {
			form.reset();
		} else if (response.errors) {
			for (const error in response.errors) {
				form.setError(error as keyof EmailPasswordFormValues, {
					message:
						response.errors[error as keyof EmailPasswordFormValues]?.toString(),
				});
			}
		} else if (response.message) {
			setRootError(response.message);
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="gap-y-4 grid">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									autoComplete="email"
									placeholder="Enter your email address"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter a unique password"
									autoComplete="password"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Password must contain at least one letter and one number
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{rootError && (
					<p className="text-sm text-destructive leading-tight">{rootError}</p>
				)}
				<Button
					type="submit"
					aria-disabled={form.formState.isSubmitting}
					className="mt-1 w-full max-w-lg"
				>
					{form.formState.isSubmitting ? "Submitting..." : "Done"}
				</Button>
			</form>
		</Form>
	);
}
