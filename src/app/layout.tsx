import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/landing/smooth-scroll";

export const metadata: Metadata = {
  title: "ASK Security — Web3 Security Audits",
  description:
    "Independent security audits for web3 protocols, infrastructure, and wallets — from code review to 24/7 post-deployment monitoring.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
