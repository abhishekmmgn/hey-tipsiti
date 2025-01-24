import { LoginWithProviders, ProviderSeparator } from "../providers";
import type { Metadata } from "next";
import Link from "next/link";
import EmailPasswordForm from "../email-password-form";

export const metadata: Metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<main className="w-full max-w-md mx-auto space-y-6">
			<h1 className="text-center">Login to your account</h1>
			{/* <div className="space-y-4"> */}
			<EmailPasswordForm type="login" />
			{/* <ProviderSeparator />
				<LoginWithProviders type="login" /> */}
			{/* </div> */}
			<p className="text-center text-secondary-foreground">
				Don't have an account?{" "}
				<Link href="/register" className="text-primary">
					Sign up
				</Link>
			</p>
		</main>
	);
}
