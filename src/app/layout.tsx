import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { ConversionTracker } from "@/components/site/conversion-tracker";
import { JsonLd } from "@/components/site/json-ld";
import { absoluteUrl, site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TKO Solutions | Prior Authorization Performance",
    template: "%s | TKO Solutions",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: "TKO Solutions | Prior Authorization Performance",
    description: site.description,
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TKO Solutions | Prior Authorization Performance",
    description: site.description,
    images: [site.socialImage],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    logo: absoluteUrl(site.socialImage),
    knowsAbout: [
      "Prior Authorization",
      "Utilization Management",
      "Prior Authorization Workflow Improvement",
      "Prior Authorization Denial Analysis",
      "Healthcare Operations",
      "Provider Operations",
      "Revenue Cycle Operations",
      "Workflow Measurement",
      "Exception and Escalation Design",
      "Automation Readiness",
    ],
  };
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Todd Kovalsky",
    jobTitle: "Founder & Principal, Prior Authorization Operations Advisor",
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    url: absoluteUrl("/founder"),
    sameAs: [site.linkedin],
    alumniOf: [
      { "@type": "Organization", name: "Apollo Global Management" },
      { "@type": "Organization", name: "Sapient" },
      { "@type": "Organization", name: "FolioDynamix" },
      { "@type": "Organization", name: "ELLKAY" },
      { "@type": "Organization", name: "Montclair State University" },
    ],
    knowsAbout: [
      "Prior Authorization",
      "Utilization Management",
      "Healthcare Operations",
      "Prior Authorization Workflow Improvement",
      "Workflow Measurement",
      "Exception and Escalation Design",
      "Automation Readiness",
      "Healthcare Interoperability (FHIR, CMS Cures Act)",
    ],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <ConversionTracker />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={personJsonLd} />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
