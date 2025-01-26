"use client";

import type { HotelCardType } from "@/lib/types";
import { useChat } from "ai/react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Image from "next/image";
import { Star } from "lucide-react";
import one from "../../../public/hotels/1.webp";
import two from "../../../public/hotels/2.webp";
import three from "../../../public/hotels/3.jpeg";
import four from "../../../public/hotels/4.jpeg";
import five from "../../../public/hotels/5.jpeg";
import six from "../../../public/hotels/6.webp";

const SAMPLE: { hotels: HotelCardType[] } = {
	hotels: [
		{
			id: "h-002",
			hotelName: "Ona Alborada",
			location: "Costa Del Silencio, Spain",
			priceInUSD: 123,
			reviews: 5,
			specs: "1 bedroom  - 2 twin beds, Living Room - 1 sofa bed",
		},
	],
};

export default function ListHotels({
	chatId,
	results = SAMPLE,
}: {
	chatId: string;
	results?: typeof SAMPLE;
}) {
	const { append } = useChat({
		id: chatId,
		body: { id: chatId },
		maxSteps: 5,
	});

	const images = [one, two, three, four, five, six];
	return (
		<div className="p-3 border bg-tertiary rounded-lg pr-0 sm:p-4 sm:pb-0">
			<ScrollArea className="w-72 h-full xs:w-full xs:h-96">
				<div className="flex gap-5 xs:flex-col">
					{results.hotels.map((hotel, index) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div
							key={hotel.id}
							className="p-3 border flex flex-col gap-4 rounded-lg cursor-pointer xs:flex-row w-72 xs:w-full last:mr-4 last:xs:mb-4
							hover:bg-secondary/50
							"
							onClick={() => {
								append({
									role: "user",
									content: `Please show rooms in ${hotel.hotelName}`,
								});
							}}
						>
							<div className="w-full relative aspect-[4/3] rounded-lg xs:w-1/2 sm:w-2/5">
								<Image
									src={index < images.length ? images[index] : images[0]}
									alt="Hotel Image"
									fill
									sizes="364px"
									className="object-cover object-top bg-secondary rounded-lg"
								/>
							</div>
							<div className="w-full xs:w-1/2 sm:w-3/5 flex flex-col justify-between">
								<div className="space-y-1">
									<div className="flex justify-between items-center gap-2">
										<p className="text-lg font-semibold">{hotel.hotelName}</p>
										<div className="flex items-center gap-1 text-tertiary-foreground">
											{hotel.reviews}
											<Star className="size-4" />
										</div>
									</div>
									<p className="text-wrap text-secondary-foreground">
										{hotel.specs}
									</p>
								</div>
								<div className="space-y-1.5 text-tertiary-foreground">
									<p>{hotel.location}</p>
									<p className="text-green-500">
										${hotel.priceInUSD.toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" className="xs:hidden" />
				<ScrollBar orientation="vertical" className="hidden xs:static" />
			</ScrollArea>
		</div>
	);
}
