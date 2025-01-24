import { useEffect, useRef, type RefObject, useState } from "react";

export function useScrollToBottom<T extends HTMLElement>(): [
	RefObject<T | null>,
	RefObject<T | null>,
] {
	const containerRef = useRef<T>(null);
	const endRef = useRef<T>(null);
	const [userScrolled, setUserScrolled] = useState(false);

	useEffect(() => {
		const container = containerRef.current;
		const end = endRef.current;

		if (container && end) {
			// Handle scroll events
			const handleScroll = () => {
				if (!container) return;

				// Only check vertical scroll position
				const isAtBottom =
					Math.abs(
						container.scrollHeight -
							container.scrollTop -
							container.clientHeight,
					) < 10;

				setUserScrolled(!isAtBottom);
			};

			container.addEventListener("scroll", handleScroll);

			const observer = new MutationObserver((mutations) => {
				// Filter mutations to only respond to height changes
				const hasHeightChange = mutations.some((mutation) => {
					const target = mutation.target as HTMLElement;
					return (
						mutation.type === "childList" ||
						(mutation.type === "attributes" &&
							(mutation.attributeName === "style" ||
								mutation.attributeName === "class" ||
								target.offsetHeight !== target.scrollHeight))
					);
				});

				if (hasHeightChange && !userScrolled) {
					end.scrollIntoView({ behavior: "instant", block: "end" });
				}
			});

			observer.observe(container, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			});

			return () => {
				observer.disconnect();
				container.removeEventListener("scroll", handleScroll);
			};
		}
	}, [userScrolled]);

	return [containerRef, endRef];
}
