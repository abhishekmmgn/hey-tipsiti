"use client";

import { useChat } from "ai/react";
import { format, differenceInHours } from "date-fns";

interface Room {
	roomNumber: string;
	roomDetails: string;
	priceInUSD: number;
	availableRooms: number;
}

const SAMPLE: { rooms: Room[] } = {
	rooms: [
		{
			roomNumber: "A1",
			roomDetails: "1BHK",
			priceInUSD: 589,
			availableRooms: 5,
		},
	],
};

export default function SelectRooms({
	chatId,
	availability = SAMPLE,
}: {
	chatId: string;
	availability?: typeof SAMPLE;
}) {
	const { append } = useChat({
		id: chatId,
		body: { id: chatId },
		maxSteps: 5,
	});

	return (
		<div className="rounded-lg bg-tertiary p-1.5 flex flex-col space-y-1">
			{availability.rooms.map((room) => (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					key={room.roomNumber}
					className="cursor-pointer flex flex-row border-b py-2 hover:rounded-lg group hover:bg-secondary/50 px-2"
					onClick={() => {
						append({
							role: "user",
							content: `I would like to go with the ${room.roomDetails} one!`,
						});
					}}
				>
					<div className="flex flex-col w-full gap-1 justify-between">
						<div>{room.roomDetails}</div>
						<div className="text-secondary-foreground">
							{room.availableRooms} available
						</div>
					</div>

					<div className="flex flex-col w-32 items-end gap-0.5">
						<div className="text-base sm:text-base text-emerald-600 dark:text-emerald-500">
							${room.priceInUSD}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
