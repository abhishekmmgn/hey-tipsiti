import {
	type CoreMessage,
	type CoreToolMessage,
	generateId,
	type Message,
	type ToolInvocation,
} from "ai";

import type { Chat } from "@/db/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function createTypewriterWords(text: string): Array<{ text: string }> {
	if (!text) return [{ text: "Search" }];
	const arr: Array<{ text: string }> = [];
	text.split(" ").map((word) => arr.push({ text: word }));
	return arr;
}

interface ApplicationError extends Error {
	info: string;
	status: number;
}

export const fetcher = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		const error = new Error(
			"An error occurred while fetching the data.",
		) as ApplicationError;

		error.info = await res.json();
		error.status = res.status;

		throw error;
	}

	return res.json();
};

export function getLocalStorage(key: string) {
	if (typeof window !== "undefined") {
		return JSON.parse(localStorage.getItem(key) || "[]");
	}
	return [];
}

export function generateUUID(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function addToolMessageToChat({
	toolMessage,
	messages,
}: {
	toolMessage: CoreToolMessage;
	messages: Array<Message>;
}): Array<Message> {
	return messages.map((message) => {
		if (message.toolInvocations) {
			return {
				...message,
				toolInvocations: message.toolInvocations.map((toolInvocation) => {
					const toolResult = toolMessage.content.find(
						(tool) => tool.toolCallId === toolInvocation.toolCallId,
					);

					if (toolResult) {
						return {
							...toolInvocation,
							state: "result",
							result: toolResult.result,
						};
					}

					return toolInvocation;
				}),
			};
		}

		return message;
	});
}

export function convertToUIMessages(
	messages: Array<CoreMessage>,
): Array<Message> {
	return messages.reduce((chatMessages: Array<Message>, message) => {
		if (message.role === "tool") {
			return addToolMessageToChat({
				toolMessage: message as CoreToolMessage,
				messages: chatMessages,
			});
		}

		let textContent = "";
		const toolInvocations: Array<ToolInvocation> = [];

		if (typeof message.content === "string") {
			textContent = message.content;
		} else if (Array.isArray(message.content)) {
			for (const content of message.content) {
				if (content.type === "text") {
					textContent += content.text;
				} else if (content.type === "tool-call") {
					toolInvocations.push({
						state: "call",
						toolCallId: content.toolCallId,
						toolName: content.toolName,
						args: content.args,
					});
				}
			}
		}

		chatMessages.push({
			id: generateId(),
			role: message.role,
			content: textContent,
			toolInvocations,
		});

		return chatMessages;
	}, []);
}
