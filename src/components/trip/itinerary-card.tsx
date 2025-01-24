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
import { useEffect, useState } from "react";

export function ItineraryCard(
	props: PlaceType & {
		isChatUI: boolean;
		className?: string;
	},
) {
	const [saved, setSaved] = useState<undefined | boolean>(undefined);

	function saveItem() {
		const placesArr = localStorage.getItem("places")?.split(",") || [];
		const cleanArr = placesArr.filter(Boolean);
		localStorage.setItem("places", [...cleanArr, props.id].toString());
		// save to DB here
		setSaved(true);
	}

	function removeItem() {
		const placesArr = localStorage.getItem("places")?.split(",");
		if (!placesArr) return;
		const filteredArr = placesArr.filter((p) => p !== props.id);
		localStorage.setItem("places", filteredArr.toString());
		// remove from DB here
		setSaved(false);
	}

	useEffect(() => {
		const placesArr = localStorage.getItem("places")?.split(",");
		if (placesArr) {
			const isSaved = placesArr.includes(props.id);
			setSaved(isSaved);
		} else {
			setSaved(false);
		}
	}, [props.id]);

	return (
		<Card className={cn("h-fit w-full max-w-72 border", props.className)}>
			<CardContent className="relative aspect-[5/4] rounded-t-xl">
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
					<CardDescription className="line-clamp-3 text-secondary-foreground">
						{props.description}
					</CardDescription>
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<p className="capitalize">{props.city.name}</p>•
					<p>Popular for {props.placeCategory}</p>
				</div>
			</CardHeader>
			{props.isChatUI && (
				<CardFooter className="text-muted-foreground text-xs">
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
