import Image from "next/image";
import Link from "next/link";
import History from "./history";
import { Button } from "./ui/button";
import tipsitiImageDark from "../../public/tipsiti-logo-dark.png";
import tipsitiImageLight from "../../public/tipsiti-logo-light.png";
import Share from "./share";

export default async function Navbar() {
	return (
		<>
			<div className="bg-background/90 backdrop-filter backdrop-blur-sm h-14 horizontal-padding fixed top-0 inset-x-0 z-30 w-full justify-between flex flex-row items-center">
				<div className="flex gap-3 items-center">
					<History />
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
				</div>
				<div className="flex items-center gap-5">
					<Share />
					{/* <Button className="py-1.5 px-2 h-fit font-normal" asChild>
						<Link href="/login">Login</Link>
					</Button> */}
				</div>
			</div>
		</>
	);
}
