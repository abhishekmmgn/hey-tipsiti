import { DefaultHeader } from "@/components/header";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<DefaultHeader />
			<div className="mt-14 horizontal-padding vertical-padding grid">
				{children}
			</div>
		</>
	);
}
