import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/landing/smooth-scroll";
import { Providers } from "@/components/landing/providers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ASK Security — Web3 Security Audits",
    template: "%s — ASK Security",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "web3 security audit",
    "smart contract audit",
    "blockchain security",
    "solidity audit",
    "rust audit",
    "bridge audit",
    "validator infrastructure review",
    "on-chain monitoring",
    "penetration testing web3",
    "ASK Security",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "ASK Security — Web3 Security Audits",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "ASK Security — Web3 Security Audits",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
