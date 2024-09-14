import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Grow App",
	description: "Welcome to Grow Community's web app!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={`${inter.className}`}>
					<Toaster />
					{children}
					<MobileBottomNav />
				</body>
			</AuthProvider>
		</html>
	);
}
