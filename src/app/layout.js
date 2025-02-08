import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { supabase } from "../lib/db";
import { Analytics } from "@vercel/analytics/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "🌐 Wise Short: Shorten URL for Free!",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const { data, error } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Analytics />
        <Header session={data.session} />
        {children}
      </body>
    </html>
  );
}
