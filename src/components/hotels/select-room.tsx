"use client";

import { useChat } from "ai/react";
import cx from "classnames";

interface Seat {
	seatNumber: string;
	priceInUSD: number;
	isAvailable: boolean;
}

const SAMPLE: { seats: Seat[] } = {
	seats: [
		{ seatNumber: "1A", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "1B", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "1C", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "1D", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "1E", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "1F", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "2A", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "2B", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "2C", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "2D", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "2E", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "2F", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "3A", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "3B", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "3C", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "3D", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "3E", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "3F", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "4A", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "4B", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "4C", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "4D", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "4E", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "4F", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "5A", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "5B", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "5C", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "5D", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "5E", priceInUSD: 150, isAvailable: false },
		{ seatNumber: "5F", priceInUSD: 150, isAvailable: false },
	],
};

export function SelectSeats({
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

	console.log(availability);
	const seats: Seat[][] = [[]];
	availability.seats.forEach((seat, index) => {
		const rowIndex = Math.floor(index / 6);
		if (!seats[rowIndex]) {
			seats[rowIndex] = [];
		}
		seats[rowIndex].push(seat);
	});
	return (
		<div className="py-4 px-4 sm:px-0 grid gap-4 sm:gap-8 bg-tertiary rounded-lg">
			<div className="w-full mx-auto grid gap-4 overflow-x-scroll sm:overflow-x-auto pr-4 sm:px-0 sm:w-auto">
				<div className="mx-auto flex text-tertiary-foreground">
					<div className="flex">
						<div className="w-10 sm:w-14 text-center">A</div>
						<div className="w-10 sm:w-14 text-center">B</div>
						<div className="w-10 sm:w-14 text-center">C</div>
					</div>
					<div className="w-10 sm:w-14 text-center"> </div>
					<div className="flex">
						<div className="w-10 sm:w-14 text-center">D</div>
						<div className="w-10 sm:w-14 text-center">E</div>
						<div className="w-10 sm:w-14 text-center">F</div>
					</div>
				</div>
				{seats.map((row, index) => (
					<div key={`row-${index}`} className="mx-auto flex gap-4">
						{row.map((seat, seatIndex) => (
							<>
								{seatIndex === 3 ? (
									<div className="w-5 sm:w-10 flex flex-row items-center justify-center  text-tertiary-foreground">
										{index + 1}
									</div>
								) : null}
								{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
								<div
									key={seat.seatNumber}
									onClick={() => {
										append({
											role: "user",
											content: `I'd like to go with seat ${seat.seatNumber}`,
										});
									}}
									className={cx(
										"cursor-pointer group relative size-8 sm:size-10 flex-shrink-0 flex rounded-sm flex-row items-center justify-center",
										{
											"bg-blue-500 hover:bg-pink-500": seat.isAvailable,
											"bg-gray-500 cursor-not-allowed": !seat.isAvailable,
										},
									)}
								>
									<div className="text-xs text-white">${seat.priceInUSD}</div>
									<div
										className={cx(
											"absolute -top-1 h-2 w-full scale-125 rounded-sm",
											{
												"bg-blue-600 group-hover:bg-pink-600": seat.isAvailable,
												"bg-zinc-600 cursor-not-allowed": !seat.isAvailable,
											},
										)}
									/>
								</div>
							</>
						))}
					</div>
				))}
			</div>
			<div className="flex flex-row gap-4 justify-center">
				<div className="flex flex-row items-center gap-2">
					<div className="size-4 bg-blue-500 rounded-sm" />
					<div className="text text-tertiary-foreground font-medium text-sm">
						Available
					</div>
				</div>
				<div className="flex flex-row items-center gap-2">
					<div className="size-4 bg-gray-500 rounded-sm" />
					<div className="text text-tertiary-foreground font-medium text-sm">
						Unavailable
					</div>
				</div>
			</div>
		</div>
	);
}
