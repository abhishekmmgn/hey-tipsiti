import { BasicHeader } from "@/components/header";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<BasicHeader />
			<div className="mt-14 horizontal-padding grid pt-8 min-h-[calc(100dvh-56px)] lg:place-items-center lg:pt-0">
				{children}
			</div>
		</>
	);
}
