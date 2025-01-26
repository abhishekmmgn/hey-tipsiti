"use client";

const SAMPLE = {
	hotelName: "Ona Alborada",
	guestName: "Katy Perry",
	location: "Costa Del Silencio, Spain",
	totalPriceInUSD: 123,
	roomDetails: "1 bedroom  - 2 twin beds, Living Room - 1 sofa bed",
	roomNumber: "A1",
};

export default function CreateBooking({ booking = SAMPLE }) {
	return (
		<div className="rounded-lg bg-tertiary p-4">
			<div>
				<div className="flex flex-col justify-between gap-4">
					<div className="text font-medium">
						<span className="text-foreground/50">
							Continue purchasing this booking of{" "}
						</span>
						{booking.roomNumber} at
						{booking.hotelName}
						<span className="text-foreground/50"> at </span>{" "}
						<span className="text-emerald-600 font-medium">
							${booking.totalPriceInUSD} USD
							<span className="text-foreground/50 ">?</span>
						</span>
					</div>

					<div className="flex flex-row flex-wrap gap-x-6 gap-y-3">
						<div className="flex flex-col gap-1">
							<div className="font-medium sm:text-base text-sm">Guest Name</div>
							<div className="text-tertiary-foreground sm:text-base text-sm">
								{booking.guestName}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<div className="text sm:text-base text-sm font-medium">
								Location
							</div>
							<div className="sm:text-base text-sm text-tertiary-foreground">
								{booking.location}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<div className="text font-medium sm:text-base text-sm">
								Room Details
							</div>
							<div className="text-tertiary-foreground sm:text-base text-sm">
								{booking.roomDetails}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
