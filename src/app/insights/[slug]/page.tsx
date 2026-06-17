import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Insight",
};

export function generateStaticParams() {
  return [];
}

export default function InsightPage() {
  notFound();
}

