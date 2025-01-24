import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ItemCardType } from "@/lib/types";
import Image from "next/image";

export default function ItemCard(props: ItemCardType) {
	return (
		<Card className="shadow-none">
			<CardContent className="border-t relative aspect-[5/4] rounded-t-xl">
				<Image
					src={props.image}
					alt="Trip Image"
					fill
					sizes="364px"
					className="object-cover object-top bg-secondary rounded-t-xl"
				/>
			</CardContent>
			<CardHeader>
				<CardTitle>{props.name}</CardTitle>
				<CardDescription className="line-clamp-2 text-secondary-foreground">
					{props.description}
				</CardDescription>
			</CardHeader>
			<CardFooter className="text-tertiary-foreground text-sm flex-row flex-wrap gap-2">
				<p className="capitalize">{props.city}</p>•
				<p className="capitalize">{props.placeCategory}</p>
				{/* <p>
				•
					Added by <span className="capitalize"> {props.curatorName}</span>
				</p> */}
			</CardFooter>
		</Card>
	);
}
