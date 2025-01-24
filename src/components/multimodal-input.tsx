"use client";

import type { ChatRequestOptions, CreateMessage, Message } from "ai";
import { Textarea } from "@/components/ui/textarea";
import { cn, createTypewriterWords } from "@/lib/utils";
import { TypewriterEffect } from "./typewriter-text";
import type React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { ArrowUpIcon, StopIcon } from "@/components/icons";
import useWindowSize from "@/hooks/use-window-size";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
	input: string;
	setInput: (value: string) => void;
	isLoading: boolean;
	stop: () => void;
	messages: Array<Message>;
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>;
	handleSubmit: (
		event?: {
			preventDefault?: () => void;
		},
		chatRequestOptions?: ChatRequestOptions,
	) => void;
	className?: string;
	paramsMessage: string | undefined;
};

export default function MultimodalInput({
	input,
	setInput,
	isLoading,
	stop,
	handleSubmit,
	className,
	paramsMessage,
	append,
}: Props) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const { width } = useWindowSize();

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(event.target.value);
	};

	const submitForm = useCallback(() => {
		handleSubmit(undefined, {});

		if (width && width > 768) {
			textareaRef.current?.focus();
		}
	}, [handleSubmit, width]);

	useEffect(() => {
		if (paramsMessage) {
			append({
				role: "user",
				content: paramsMessage,
			});
			params.delete("message");
		}
	}, []);

	function deleteParam() {
		params.delete("message");
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={cn(className, "relative sm:inset-x-auto")}
		>
			<Textarea
				ref={textareaRef}
				placeholder="Send a message..."
				value={input}
				onChange={handleInput}
				rows={3}
				className="resize-none h-24 overflow-hidden rounded-lg text-base border-none"
				onKeyDown={(event) => {
					if (event.key === "Enter" && !event.shiftKey) {
						event.preventDefault();

						if (isLoading) {
							toast.error("Please wait for the model to finish its response!");
						} else {
							submitForm();
						}
					}
				}}
			/>
			<div className="flex justify-end gap-2 absolute bottom-2 right-2">
				{isLoading ? (
					<Button
						className="rounded-full h-fit absolute bottom-2 right-2 shadow-none"
						onClick={(event) => {
							event.preventDefault();
							stop();
						}}
					>
						<StopIcon size={14} />
					</Button>
				) : (
					<Button
						className="rounded-full h-fit absolute bottom-2 right-2 shadow-none"
						onClick={(event) => {
							event.preventDefault();
							submitForm();
						}}
						disabled={input.length === 0}
					>
						<ArrowUpIcon size={14} />
					</Button>
				)}
			</div>
		</form>
	);
}

const typewriterPlaceholders = [
	"Help me plan a 3 days trip to SF",
	"Cafes in Spain",
	"A month long vacation in Bahamas",
	"Plan a couple trip to Bali",
	"Cheap hotels in Paris",
];

export function HomeMultimodalInput({ className }: { className?: string }) {
	const [text, setText] = useState("");
	const [wordCount, setWordCount] = useState(0);
	const [showTypewriter, setShowTypewriter] = useState(true);
	const [typewritersentence, setTypewriterSentence] = useState(
		typewriterPlaceholders[wordCount],
	);

	const router = useRouter();
	const searchParams = useSearchParams();

	function submitForm() {
		const params = new URLSearchParams(searchParams);
		if (text) {
			params.set("message", text);
			router.push(`/chat?${params.toString()}`);
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			submitForm();
		}
	};

	useEffect(() => {
		if (!text) {
			const intervalId = setInterval(() => {
				setShowTypewriter(false); // Unmount the component
				setWordCount((prev) => (prev + 1) % typewriterPlaceholders.length);
				const nextSentence =
					typewriterPlaceholders[
						(wordCount + 1) % typewriterPlaceholders.length
					];
				setTypewriterSentence(nextSentence);
				setTimeout(() => setShowTypewriter(true), 50);
			}, 5000);

			return () => clearInterval(intervalId);
		}
	}, [wordCount]);
	return (
		<form
			onSubmit={submitForm}
			className={cn(className, "relative sm:inset-x-auto")}
		>
			<Textarea
				placeholder={""}
				onChange={(e) => setText(e.target.value)}
				rows={3}
				defaultValue={text}
				className="resize-none h-24 overflow-hidden rounded-lg text-base border-none"
				onKeyDown={(event) => {
					if (event.key === "Enter" && !event.shiftKey) {
						event.preventDefault();
						submitForm();
					}
				}}
			/>
			{showTypewriter && !text && (
				<div className="absolute top-3 left-3">
					<TypewriterEffect
						cursorClassName="hidden"
						words={[...createTypewriterWords(typewritersentence)]}
					/>
				</div>
			)}
			<div className="flex justify-end gap-2 absolute bottom-2 right-2">
				<Button
					className="rounded-full h-fit absolute bottom-2 right-2 shadow-none"
					onClick={(event) => {
						event.preventDefault();
						submitForm();
					}}
					disabled={text.length === 0}
				>
					<ArrowUpIcon size={14} />
				</Button>
			</div>
		</form>
	);
}
