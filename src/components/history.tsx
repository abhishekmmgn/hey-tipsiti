"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import cx from "classnames";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { fetcher } from "@/lib/utils";
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

	if (!pathname.includes("/chat")) {
		return null;
	}
	const [isHistoryVisible, setIsHistoryVisible] = useState(false);

	const { data: history, isLoading } = useQuery({
		queryKey: ["history"],
		queryFn: async () => {
			const data = await fetcher(
				`${process.env.NEXT_PUBLIC_SITE_URL}/api/history`,
			);

			const formattedData: Array<{ id: string; message: string }> = [];
			data.map((chat: Chat) => {
				formattedData.push({
					id: chat.id,
					message: chat.messages[0].content,
				});
			});
			return formattedData;
		},
	});
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
				<SheetContent side="left" className="p-3 w-80 bg-tertiary">
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
						<ScrollArea className="mt-2 w-full h-full flex flex-col space-y-1">
							{!isLoading && history?.length === 0 ? (
								<div className="text-tertiary-foreground mt-80 w-full flex flex-row justify-center items-center text-sm gap-2">
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
								{history?.map((item) => (
									<Button
										asChild
										variant="ghost"
										className={`max-w-72 justify-start ${item.id === id ? "bg-secondary text-primary" : "hover:text-secondary-foreground hover:bg-secondary"}`}
										key={item.id}
									>
										<Link
											href={`/chat/${item.id}`}
											className="text-ellipsis overflow-clip text-left py-2 pl-2 rounded-lg"
										>
											{item.message}
										</Link>
									</Button>
								))}
							</div>
						</ScrollArea>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
