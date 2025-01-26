"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

type Props = {
	id: string;
	places: string[];
	hotels: string[];
	flights: string[];
	name: string;
	description: null | string;
};
export default function ItineraryCard(props: Props) {
	return (
		<Card className="w-full flex flex-col bg-secondary hover:bg-secondary/80">
			<CardHeader className="space-y-0.5">
				<CardTitle className="text-lg">{props.name}</CardTitle>
				<CardDescription className="text-base">
					{props.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 text-secondary-foreground sm:flex-row sm:flex-wrap sm:gap-6 md:gap-8">
				<div className="space-y-1.5">
					<p className="text-sm">{props.hotels.length} hotels</p>
					<p className="text-orange-600 dark:text-orange-500">
						{props.hotels.toString()}
					</p>
				</div>
				<div className="space-y-1.5">
					<p className="text-sm">{props.flights.length} flights</p>
					<p className="text-orange-600 dark:text-orange-500">
						{props.flights.toString()}
					</p>
				</div>
				<div className="space-y-1.5">
					<p className="text-sm">{props.places.length} places</p>
					<p className="text-orange-600 dark:text-orange-500">
						{props.places.toString()}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
