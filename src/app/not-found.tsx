import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: false } };

export default function NotFound() {
  return <section className="mx-auto max-w-3xl px-6 py-28 text-center"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">404 / Not found</p><h1 className="mt-5 text-5xl font-semibold tracking-tight">This page is not available.</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">Review TKO&apos;s transformation recovery services or the available evidence behind the work.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Link href="/selected-work" className="border border-primary bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">Selected Work</Link><Link href="/services" className="border border-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-foreground">Services</Link></div></section>;
}
