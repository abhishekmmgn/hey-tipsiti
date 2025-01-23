import { CoreMessage } from "ai";
import { notFound } from "next/navigation";
import { Chat as PreviewChat } from "@/components/chat";
import { getChatById } from "@/db/queries";
import { Chat } from "@/db/schema";
import { convertToUIMessages } from "@/lib/utils";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
	const { id } = await params;

	const chatFromDb = await getChatById({ id });

	if (!chatFromDb) {
		notFound();
	}

	// type casting and converting messages to UI messages
	const chat: Chat = {
		...chatFromDb,
		messages: convertToUIMessages(chatFromDb?.messages as Array<CoreMessage>),
	};

	return (
		<PreviewChat
			id={chat.id}
			initialMessages={chat.messages}
			paramsMessage={undefined}
		/>
	);
}
