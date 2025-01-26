"use client";

import type { PlaceType } from "@/lib/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark, X } from "lucide-react";
import { useState } from "react";

export default function PlaceCard(
	props: PlaceType & {
		isChatUI: boolean;
		className?: string;
		chatId?: string;
	},
) {
	const [saved, setSaved] = useState(false);

	function saveItem() {
		// addtoItenerary(props.id);
		setSaved(true);
	}

	function removeItem() {
		// removeFromItinerary(props.id);
		setSaved(false);
	}
	return (
		<Card className={cn("h-fit w-full max-w-80 border", props.className)}>
			<CardContent className="relative aspect-square rounded-t-xl">
				<Image
					src={props.image}
					alt={props.name}
					fill
					sizes="320px"
					className="object-cover object-top bg-secondary rounded-t-xl"
				/>
			</CardContent>
			<CardHeader className="space-y-3">
				<div className="space-y-1.5">
					<CardTitle>{props.name}</CardTitle>
					<CardDescription className="line-clamp-3 text-wrap text-secondary-foreground">
						{props.description}
					</CardDescription>
				</div>
				<div className="flex items-center gap-2 text-sm text-tertiary-foreground">
					<p className="capitalize">{props.city.name}</p>•
					<p>Popular for {props.placeCategory}</p>
				</div>
			</CardHeader>
			{props.isChatUI && (
				<CardFooter className="text-tertiary-foreground text-xs">
					{saved === undefined ? (
						<Button variant="ghost" className="w-full">
							Loading...
						</Button>
					) : saved ? (
						<Button variant="outline" className="w-full" onClick={removeItem}>
							<X />
							Remove from itinerary
						</Button>
					) : (
						<Button className="w-full" onClick={saveItem}>
							<Bookmark />
							Save to itinerary
						</Button>
					)}
				</CardFooter>
			)}
		</Card>
	);
}
