import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { TripCardType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function TripCard(props: TripCardType) {
	return (
		<Link href={`/chat/${props.uid}`}>
			<Card className="shadow-none">
				<CardContent className="border-t relative aspect-[5/4] rounded-t-xl">
					<Image
						src={props.image}
						alt="Trip Image"
						fill
						className="object-cover object-top bg-secondary rounded-t-xl"
					/>
				</CardContent>
				<CardHeader className="">
					<CardTitle className="">{props.title}</CardTitle>
					<CardDescription className="line-clamp-2">
						{props.description}
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<p className="text-muted-foreground text-xs">
						Created by {props.creator.name}
					</p>
				</CardFooter>
			</Card>
		</Link>
	);
}
