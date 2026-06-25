import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameStateProvider } from "@/context/GameStateContext";
import LayoutShell from "@/components/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JS/TS Quest - Gamified Coding Practice",
  description: "Learn JavaScript and TypeScript through a gamified RPG adventure! Master the scrolls of code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GameStateProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </GameStateProvider>
      </body>
    </html>
  );
}

