import type { Metadata } from "next";
import localFont from "next/font/local";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Self-hosted via next/font/local for zero layout shift, no external requests,
// and full next/font optimization (subsetting + preloading).
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

// Characterful humanist serif for headlines - does most of the hand-crafted work.
const fraunces = localFont({
  src: "./fonts/Fraunces-Variable.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
});

const title = `${BRAND_NAME} - Never Miss Another Lead`;
const description =
  "AI-powered missed-call text-back for home services. When you miss a call, our AI texts the caller back, qualifies the lead, and books the appointment automatically.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s · ${BRAND_NAME}`,
  },
  description,
  applicationName: BRAND_NAME,
  keywords: [
    "missed call text back",
    "AI lead qualification",
    "home services software",
    "plumbing leads",
    "HVAC leads",
    "appointment booking AI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-bg-primary font-sans text-text">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
