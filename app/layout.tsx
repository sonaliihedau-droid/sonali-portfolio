import type { Metadata } from "next";
import { Geist, Geist_Mono, La_Belle_Aurore, Manrope, Reenie_Beanie } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Handwriting, for tags and notes drawn onto project pages.
const reenieBeanie = Reenie_Beanie({
  variable: "--font-reenie",
  weight: "400",
  subsets: ["latin"],
});

// Flowing script, for project headings.
const laBelleAurore = La_Belle_Aurore({
  variable: "--font-la-belle-aurore",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonali — Illustration & Design",
  description: "Portfolio of illustrator and designer Sonali.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${reenieBeanie.variable} ${laBelleAurore.variable} h-full antialiased [scrollbar-gutter:stable]`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
