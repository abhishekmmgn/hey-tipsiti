"use client";

import { usePathname } from "next/navigation";
import ResponsiveDialog from "./responsive-dialog";
import { Button } from "./ui/button";
import { Copy, ShareIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function Share() {
	const pathname = usePathname();

	if (pathname.startsWith("/chat")) {
		const url = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;
		return (
			<ResponsiveDialog
				title="Share Trip"
				isTriggerChild={true}
				trigger={
					<Button variant="outline" size="sm">
						Share
					</Button>
				}
			>
				<div className="w-full max-w-lg space-y-5 sm:max-w-xl">
					<div className="h-10 flex justify-between gap-3">
						<div className="h-10 border rounded-md w-full flex justify-between">
							<div className="rounded-l-md h-full text-secondary-foreground flex items-center pl-2">
								<p className="line-clamp-1 text-sm">{url}</p>
							</div>
							<div
								className="w-10 aspect-square border grid place-items-center bg-secondary cursor-pointer hover:bg-tertiary/60 rounded-r-md"
								onClick={() => navigator.clipboard.writeText(url)}
							>
								<Copy className="size-4 text-primary " />
							</div>
						</div>
						<div
							className="w-10 aspect-square border grid place-items-center bg-secondary cursor-pointer hover:bg-tertiary/60 rounded-md"
							onClick={() =>
								navigator.share({
									text: "Here's the trip I planned",
									url: url,
								})
							}
						>
							<ShareIcon className="size-4 text-primary " />
						</div>
					</div>
					{/* <div className="flex items-center justify-between gap-5">
            <Label htmlFor="public-chat">Make it public</Label>
            <Switch id="public-chat" />
          </div> */}
				</div>
			</ResponsiveDialog>
		);
	}
	return null;
}
