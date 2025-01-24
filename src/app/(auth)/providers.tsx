"use client";

import { Button } from "@/components/ui/button";
import { googleLogin } from "./actions";
import { useState } from "react";

export function LoginWithProviders({ type }: { type: "login" | "register" }) {
	const text = type === "login" ? "Login" : "Continue";
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		const error = await googleLogin();
		console.log(error);
		if (error) {
			setError(error);
		}
	};
	return (
		<div className="space-y-2">
			<Button variant="outline" className="gap-1" onClick={handleLogin}>
				{text} with Google
			</Button>
			{error && (
				<p className="text-sm text-destructive leading-tight">{error}</p>
			)}
		</div>
	);
}

export function ProviderSeparator() {
	return (
		<div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
			<span className="relative z-10 bg-background px-2 text-tertiary-foreground">
				OR
			</span>
		</div>
	);
}
