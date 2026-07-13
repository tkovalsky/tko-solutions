import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
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
    default: "TKO Solutions | Operational Recovery for Complex Workflows",
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
    title: "TKO Solutions | Operational Recovery for Complex Workflows",
    description: site.description,
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "TKO Solutions: Make hidden work visible. Recover the next decision." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TKO Solutions | Healthcare Workflow Modernization",
    description: site.description,
    images: ["/og.png"],
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
    logo: absoluteUrl("/og.png"),
    knowsAbout: [
      "Operational Knowledge Systems",
      "Healthcare Workflow Modernization",
      "Administrative Burden Reduction",
      "Prior Authorization",
      "Utilization Management",
      "Care Management",
      "Transformation Recovery",
      "Operational Visibility",
      "Healthcare AI Adoption",
      "Human-in-the-Loop AI",
      "Workflow Governance",
      "Operating Model Design",
      "Operational Truth Diagnostics",
      "Decision Layer Build",
    ],
  };
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Todd Kovalsky",
    jobTitle: "Founder and Operator",
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    url: absoluteUrl("/about"),
    sameAs: process.env.NEXT_PUBLIC_LINKEDIN_URL ? [process.env.NEXT_PUBLIC_LINKEDIN_URL] : undefined,
    knowsAbout: [
      "Healthcare Workflow Modernization",
      "Prior Authorization",
      "Transformation Governance",
      "Operational Intelligence",
      "Human-in-the-Loop AI",
    ],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={personJsonLd} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
