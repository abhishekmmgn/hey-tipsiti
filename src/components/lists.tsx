import { PlaceType } from "@/lib/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import React, { ReactNode } from "react";
import { PlaceCard, PlaceSkeletonCard } from "./cards/place-card";
import PreviewDialog from "./preview-dialog";

export function PlacesList({ places }: { places: PlaceType[] }) {
  return (
    <div>
      <ListWrapper>
        {places?.map((place) => (
          <PlaceCard {...place} isChatUI={true} key={place.id} />
        ))}
      </ListWrapper>
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

export function PlacesListSkeleton() {
  return (
    <ListWrapper>
      {Array.from({ length: 3 }).map((_, idx) => (
        <PlaceSkeletonCard key={idx} />
      ))}
    </ListWrapper>
  );
}

export function ListWrapper({ children }: { children: ReactNode }) {
  return (
    <ScrollArea className="w-full">
      <div className="flex w-max gap-5 pb-3 overflow-x-clip">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
