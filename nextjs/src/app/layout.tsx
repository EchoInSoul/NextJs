import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "@/components/layout";
import { ThemeProvider } from "@/core/theme/provider";
import { InjectProvider } from "@/core/inject/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZeroPoint Blog",
  description: "A modern blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <InjectProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </InjectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
