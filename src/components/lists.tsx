import { PlaceType } from "@/lib/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import React, { ReactNode } from "react";
import { PlaceCard } from "./cards/place-card";
import PreviewDialog from "./preview-dialog";

export function PlacesList({ places }: { places: PlaceType[] }) {
	return (
		<div>
			<ScrollArea className="w-60 xs:w-[360px] sm:w-[512px] md:w-[664px] sm:max-w-lg md:max-w-2xl whitespace-nowrap">
				<div className="flex gap-5 pb-3">
					{places.slice(0, 6)?.map((place) => (
						<PlaceCard {...place} isChatUI={true} key={place.id} />
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<PreviewDialog
				title="Places to visit"
				trigger={<p className="text-primary text-sm">See All</p>}
				isTriggerChild={false}
			>
				<div>
					<ScrollArea className="h-[80dvh]">
						<div className="sm:max-w-screen-md lg:max-w-screen-lg justify-center grid gap-6 md:grid-cols-2 xl:grid-cols-3">
							{places.map((place) => (
								<PlaceCard
									{...place}
									isChatUI={true}
									key={place.id}
									className="max-w-sm"
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</PreviewDialog>
		</div>
	);
}
