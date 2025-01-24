import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Auth Code Error",
};

export default async function AuthCodeErrorPage() {
	return (
		<div className="w-full max-w-md mx-auto space-y-3">
			<div className="space-y-3 text-center lg:-mt-72">
				<h1 className="text-center capitalize">Auth Code Error</h1>
				<p className="text-center text-tertiary-foreground">
					The email link is invalid or expired.
				</p>
			</div>
		</div>
	);
}
