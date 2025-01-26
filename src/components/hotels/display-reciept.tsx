import { Hotel } from "lucide-react";
import { Separator } from "../ui/separator";

const SAMPLE = {
	roomNumber: "A1",
	hotelName: "Ona Alborada",
	location: "Costa Del Silencio, Spain",
	roomDetails: "1 bedroom  - 2 twin beds, Living Room - 1 sofa bed",
};

export function DisplayReceipt({ receipt = SAMPLE }) {
	return (
		<div className="p-4 bg-violet-300 flex flex-col gap-4 rounded-lg">
			<div className="w-full flex justify-between gap-5">
				<div className="space-y-0.5">
					<p className="text-xl font-semibold text-violet-800">
						Hotel {receipt.hotelName}
					</p>
					<p className="font-medium text-violet-600">{receipt.location}</p>
				</div>
				<Hotel className="mt-2 size-5 text-violet-500" />
			</div>
			<Separator className="bg-violet-400" />
			<div className="flex items-center gap-4">
				<div className="flex flex-col gap-1">
					<div className="text sm:text-base text-sm font-medium text-violet-600">
						Room Number
					</div>
					<div className="sm:text-base text-sm text-violet-700">
						{receipt.roomNumber}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="text sm:text-base text-sm font-medium text-violet-600">
						Room Details
					</div>
					<div className="sm:text-base text-sm text-violet-700">
						{receipt.roomDetails}
					</div>
				</div>
			</div>
		</div>
	);
}
