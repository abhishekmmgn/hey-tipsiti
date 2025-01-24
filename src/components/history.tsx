"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import cx from "classnames";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { fetcher, getTitleFromChat } from "@/lib/utils";
import { InfoIcon, MenuIcon, PencilEditIcon } from "./icons";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import type { Chat } from "@/db/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function History() {
	const { id } = useParams();
	const pathname = usePathname();

	const [isHistoryVisible, setIsHistoryVisible] = useState(false);

	const { data: history, isLoading } = useQuery({
		queryKey: ["history"],
		queryFn: async () => {
			const data = await fetcher("/api/history");
			return data;
		},
	});
	if (!pathname.includes("/chat")) {
		return null;
	}
	return (
		<>
			<Button
				variant="ghost"
				className="p-1.5 h-fit w-fit"
				onClick={() => {
					setIsHistoryVisible(true);
				}}
			>
				<MenuIcon />
			</Button>
			<Sheet
				open={isHistoryVisible}
				onOpenChange={(state) => {
					setIsHistoryVisible(state);
				}}
			>
				<SheetContent side="left" className="p-3 w-80 bg-muted">
					<SheetHeader>
						<VisuallyHidden.Root>
							<SheetTitle className="text-left">History</SheetTitle>
							<SheetDescription className="text-left">
								{history === undefined ? "loading" : history.length} chats
							</SheetDescription>
						</VisuallyHidden.Root>
					</SheetHeader>

					<div className="px-1 text-sm w-full flex gap-3 items-center">
						<p className="text-secondary-foreground">History</p>
						<p className="text-tertiary-foreground">
							{history === undefined ? "loading" : history.length} chats
						</p>
					</div>

					<div className="mt-5 p-1 flex flex-col gap-1">
						<Button
							className="font-normal text-sm flex flex-row justify-between"
							asChild
						>
							<Link href="/chat">
								<div>Start a new chat</div>
								<PencilEditIcon size={14} />
							</Link>
						</Button>
						<div className="mt-2 h-[calc(100dvh-124px)]">
							<ScrollArea className="w-full h-full flex flex-col space-y-1">
								{!isLoading && history?.length === 0 ? (
									<div className="text-tertiary-foreground h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
										<InfoIcon />
										<div>No chats found</div>
									</div>
								) : null}
								{isLoading ? (
									<div className="flex flex-col">
										{[44, 32, 28, 52].map((item) => (
											<div key={item} className="p-2 my-[2px]">
												<div
													className={`w-${item} h-[20px] rounded-md animate-pulse`}
												/>
											</div>
										))}
									</div>
								) : null}
								<div className="space-y-0.5">
									{history?.map((chat: Chat) => (
										<Button
											asChild
											variant="ghost"
											className={`justify-start ${chat.id === id ? "bg-tertiary text-primary" : "hover:text-secondary-foreground hover:bg-secondary"}`}
											key={chat.id}
										>
											<Link
												href={`/chat/${chat.id}`}
												className="text-ellipsis overflow-clip text-left py-2 pl-2 rounded-lg"
											>
												{getTitleFromChat(chat)}
											</Link>
										</Button>
									))}
								</div>
							</ScrollArea>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
