import { Hotel } from "lucide-react";
import { Separator } from "../ui/separator";
import type { HotelConfirmationType } from "@/lib/types";

const SAMPLE: {
	details: HotelConfirmationType;
} = {
	details: {
		roomNumber: "A1",
		hotelName: "Ona Alborada",
		location: "Costa Del Silencio, Spain",
		roomDetails: "1 bedroom  - 2 twin beds, Living Room - 1 sofa bed",
	},
};

export function DisplayReceipt({ booking }: { booking: typeof SAMPLE }) {
	console.log(booking);
	return (
		<div className="p-4 bg-violet-300 flex flex-col gap-4 rounded-lg">
			<div className="w-full flex justify-between gap-5">
				<div className="space-y-0.5">
					<p className="text-xl font-semibold text-violet-800">
						{booking.details.hotelName}
					</p>
					<p className="font-medium text-violet-600">
						{booking.details.location}
					</p>
				</div>
				<Hotel className="mt-2 size-5 text-violet-500" />
			</div>
			<Separator className="bg-violet-400" />
			<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
				<div className="flex flex-col gap-1">
					<div className="font-medium text-sm sm:text-base text-violet-700">
						Room Number
					</div>
					<div className="text-lg text-violet-600">
						{booking.details.roomNumber}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="font-medium text-sm sm:text-base text-violet-700">
						Room Details
					</div>
					<div className="text-lg text-violet-600">
						{booking.details.roomDetails}
					</div>
				</div>
			</div>
		</div>
	);
}
