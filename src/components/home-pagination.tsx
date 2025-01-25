"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const TOTAL_PAGES = 5;

export default function HomePagination() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const currentPage = Number(searchParams.get("page")) || 1;

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		router.replace(`${pathname}?${params.toString()}`);
	};
	return (
		<Pagination className="col-span-full max-w-xl">
			<PaginationContent>
				{currentPage !== 1 && (
					<PaginationItem
						onClick={(e) => {
							e.stopPropagation();
							createPageURL(currentPage - 1);
						}}
					>
						<PaginationPrevious />
					</PaginationItem>
				)}
				{Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
					<PaginationItem
						key={idx.toString()}
						onClick={(e) => {
							e.stopPropagation();
							createPageURL(idx + 1);
						}}
					>
						<PaginationLink isActive={currentPage === idx + 1}>
							{idx + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				{currentPage !== 5 && (
					<PaginationItem
						onClick={(e) => {
							e.stopPropagation();
							createPageURL(currentPage + 1);
						}}
					>
						<PaginationNext />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
