import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Providers from "@/components/providers";

export const metadata: Metadata = {
	title: "Tipsit AI",
	description: "Tipsit AI- Let's plan your trip.",
};

const interSans = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${interSans.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<Providers>
						{children}
						<Toaster position="top-center" />
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
