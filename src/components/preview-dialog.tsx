"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PreviewDialog({
	trigger,
	isTriggerChild,
	title,
	children,
}: {
	trigger: React.ReactNode;
	isTriggerChild: boolean;
	title: string;
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const isMobile = useIsMobile();

	if (!isMobile) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild={isTriggerChild}>{trigger}</DialogTrigger>
				<DialogContent className="md:max-w-screen-md xl:max-w-screen-lg">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					{children}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild={isTriggerChild}>{trigger}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{title}</DrawerTitle>
				</DrawerHeader>
				<div className="w-full max-w-xl mx-auto">{children}</div>
				<DrawerFooter>
					<DrawerClose asChild className="mx-auto">
						<Button variant="outline" className="w-full max-w-lg">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
