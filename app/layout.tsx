import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doable",
  description: "Get things done",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
