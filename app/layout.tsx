import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  // SignInButton,
  // SignUpButton,
  // SignedIn,
  // SignedOut,
  // UserButton,
} from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en" data-theme="silk">
        <body
          className={`${notoSans.variable} antialiased bg-base-300 h-screen`}
        >
          <Navbar />
          <main className="w-11/12 md:w-6/10 mx-auto bg-base-100 h-full p-2">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
