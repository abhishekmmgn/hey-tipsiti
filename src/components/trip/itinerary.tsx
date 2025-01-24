"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Itinerary() {
	const pahtname = usePathname();
	if (pahtname.includes("chat")) {
		return null;
	}
	return (
		<Button size="sm" variant="outline" asChild>
			<Link href="/itineraries">Itineraries</Link>
		</Button>
	);
}
