import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Robert Himam — Backend & Fullstack Engineer",
  description:
    "Backend / Fullstack Engineer with 8+ years building scalable microservices, financial systems, and high-performance APIs. Based in Sidoarjo, Indonesia.",
  openGraph: {
    title: "Robert Himam — Backend & Fullstack Engineer",
    description: "8+ years building scalable microservices and high-performance APIs.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-stone-50 text-stone-900 antialiased">{children}</body>
    </html>
  );
}
