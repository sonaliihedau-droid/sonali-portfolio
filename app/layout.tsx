import type { Metadata } from "next";
import { Geist, Geist_Mono, La_Belle_Aurore, Manrope, Reenie_Beanie, Special_Elite } from "next/font/google";
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

// Typewriter, for the home page headings and the navbar.
const specialElite = Special_Elite({
  variable: "--font-special-elite",
  weight: "400",
  subsets: ["latin"],
});

const description =
  "Portfolio of Sonali Hedau, an illustrator and visual communication designer who finds stories in the little details of the world.";

// The share image, tab icon and home-screen icon are the opengraph-image, icon and apple-icon
// files beside this layout.
export const metadata: Metadata = {
  title: "Sonali — Illustration & Design",
  description,
  openGraph: {
    type: "website",
    siteName: "Sonali Hedau",
    title: "Sonali Hedau — Illustration & Design",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonali Hedau — Illustration & Design",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${reenieBeanie.variable} ${laBelleAurore.variable} ${specialElite.variable} h-full antialiased [scrollbar-gutter:stable]`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
