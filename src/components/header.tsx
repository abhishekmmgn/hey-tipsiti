import Image from "next/image";
import Link from "next/link";
import History from "./history";
import tipsitiImageDark from "../../public/tipsiti-logo-dark.png";
import tipsitiImageLight from "../../public/tipsiti-logo-light.png";
import Share from "./share";
import Itinerary from "@/components/trip/itinerary";
import createClientForServer from "@/lib/supabase/server";
import { Button } from "./ui/button";
import Logout from "./logout";

function TipsitiImg() {
	return (
		<Link href="/">
			<Image
				src={tipsitiImageLight}
				alt="Tipsiti Logo"
				width={240}
				height={48}
				className="h-6 w-auto hidden dark:inline-block"
			/>
			<Image
				src={tipsitiImageDark}
				alt="Tipsiti Logo"
				width={240}
				height={48}
				className="h-6 w-auto dark:hidden"
			/>
		</Link>
	);
}
export async function DefaultHeader() {
	const supabase = await createClientForServer();
	const user = await supabase.auth.getUser();
	return (
		<>
			<div className="bg-background/90 backdrop-filter backdrop-blur-sm h-14 horizontal-padding fixed top-0 inset-x-0 z-30 w-full justify-between flex flex-row items-center">
				<TipsitiImg />
				{user.data.user ? (
					<div className="flex items-center gap-3">
						<Button size="sm" variant="outline" asChild>
							<Link href="/chat">Chat</Link>
						</Button>
						<Itinerary />
						<span className="hidden xs:flex">|</span>
						<Logout />
					</div>
				) : (
					<Button size="sm" asChild>
						<Link href="/login">Login</Link>
					</Button>
				)}
			</div>
		</>
	);
}

export async function ChatHeader() {
	const supabase = await createClientForServer();
	const user = await supabase.auth.getUser();
	return (
		<div className="bg-background/90 backdrop-filter backdrop-blur-sm h-14 horizontal-padding fixed top-0 inset-x-0 z-30 w-full justify-between flex flex-row items-center">
			{!user.error ? <History /> : <TipsitiImg />}
			<Share />
		</div>
	);
}

export async function BasicHeader() {
	return (
		<div className="bg-background/90 backdrop-filter backdrop-blur-sm h-14 horizontal-padding fixed top-0 inset-x-0 z-30 w-full justify-between flex flex-row items-center">
			<TipsitiImg />
		</div>
	);
}
