import EmailPasswordForm from "../email-password-form";
import { LoginWithProviders, ProviderSeparator } from "../providers";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<main className="w-full max-w-md mx-auto space-y-6">
			<h1 className="text-center">Create your account</h1>
			{/* <div className="space-y-4"> */}
			<EmailPasswordForm type="signup" />
			{/* <ProviderSeparator />
				<LoginWithProviders type="register" />
			</div> */}
			<p className="text-center text-secondary-foreground">
				Already have an account?{" "}
				<Link href="/login" className="text-primary">
					Log in
				</Link>
			</p>
		</main>
	);
}
