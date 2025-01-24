import { ChatHeader } from "@/components/header";

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<ChatHeader />
			{children}
		</>
	);
}
