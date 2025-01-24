"use client";

import createClientForClient from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Logout() {
	const router = useRouter();

	async function handleLogout() {
		const supabase = await createClientForClient();
		supabase.auth.signOut();
		router.push("/login");
	}
	return (
		<Button
			size="sm"
			variant="ghost"
			className="hidden xs:flex"
			onClick={() => handleLogout()}
		>
			Logout
		</Button>
	);
}
