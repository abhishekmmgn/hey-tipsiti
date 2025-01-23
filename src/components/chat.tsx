"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { Message as PreviewMessage } from "@/components/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";
import { ScrollArea } from "@/components/ui/scroll-area";
import MultimodalInput from "@/components/multimodal-input";

type Props = {
	id: string;
	initialMessages: Array<Message>;
	paramsMessage: string | undefined;
};

export function Chat({ id, initialMessages, paramsMessage }: Props) {
	const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
		useChat({
			id,
			body: { id },
			initialMessages,
			maxSteps: 10,
			onFinish: () => {
				window.history.replaceState({}, "", `/chat/${id}`);
			},
		});

	const [messagesContainerRef, messagesEndRef] =
		useScrollToBottom<HTMLDivElement>();

	return (
		<div className="flex flex-row justify-center pb-4 md:pb-8 pt-4 h-dvh">
			<div className="w-full horizontal-padding flex flex-col justify-between items-center gap-4 max-w-screen-md mx-auto">
				<ScrollArea className="w-full">
					<div
						ref={messagesContainerRef}
						className="grid gap-4 h-full w-full items-center"
					>
						{messages.map((message) => (
							<PreviewMessage
								key={message.id}
								chatId={id}
								role={message.role}
								content={message.content}
								attachments={message.experimental_attachments}
								toolInvocations={message.toolInvocations}
							/>
						))}
						<div ref={messagesEndRef} className="shrink-0" />
					</div>
				</ScrollArea>
				<MultimodalInput
					input={input}
					setInput={setInput}
					handleSubmit={handleSubmit}
					isLoading={isLoading}
					stop={stop}
					messages={messages}
					append={append}
					className="w-full mx-auto"
					paramsMessage={paramsMessage}
				/>
			</div>
		</div>
	);
}
