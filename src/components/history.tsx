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
import { Chat } from "@/db/schema";
import { ScrollArea } from "./ui/scroll-area";

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
				className="p-1.5 h-fit"
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

					<div className="text-sm flex flex-row items-center justify-between">
						<div className="flex flex-row gap-2">
							<div className="dark:text-zinc-300">History</div>

							<div className="dark:text-zinc-400 text-zinc-500">
								{history === undefined ? "loading" : history.length} chats
							</div>
						</div>
					</div>

					<div className="p-1 mt-10 flex flex-col gap-1">
						<Button
							className="font-normal text-sm flex flex-row justify-between"
							asChild
						>
							<Link href="/chat">
								<div>Start a new chat</div>
								<PencilEditIcon size={14} />
							</Link>
						</Button>
						<div className="h-[calc(100dvh-124px)]">
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
													className={`w-${item} h-[20px] rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse`}
												/>
											</div>
										))}
									</div>
								) : null}
								<div className="space-y-0.5">
									{history &&
										history.map((chat: Chat) => (
											<Button
												variant="ghost"
												className={`w-full text-left justify-start ${chat.id === id ? "bg-tertiary text-primary" : "hover:text-secondary-foreground"}`}
												asChild
												key={chat.id}
											>
												<Link
													href={`/chat/${chat.id}`}
													className="text-ellipsis overflow-hidden text-left py-2 pl-2 rounded-lg"
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
			</Sheet >
		</>
	);
}
