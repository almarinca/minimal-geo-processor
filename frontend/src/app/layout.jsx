"use client";
import localFont from "next/font/local";
import "./globals.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nav } from "@/components/Nav/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryClientProvider client={queryClient}>
          <Nav/>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
