import type { PlaceType } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { ReactNode } from "react";
import PlaceCard from "@/components/trip/place-card";
import PreviewDialog from "./preview-dialog";

export function PlacesList({
	chatId,
	places,
}: { chatId: string; places: PlaceType[] }) {
	if (places.length === 0) return <p>No places found</p>;
	return (
		<div>
			<ScrollArea className="w-72 xs:w-[360px] sm:w-[512px] md:w-[664px] sm:max-w-lg md:max-w-2xl whitespace-nowrap">
				<div className="h-full w-max flex gap-5 pb-3">
					{places.slice(0, 6)?.map((place) => (
						<PlaceCard
							{...place}
							isChatUI={true}
							key={place.id}
							chatId={chatId}
						/>
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
									chatId={chatId}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</PreviewDialog>
		</div>
	);
}
