import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionPage, solutionMetadata } from "@/components/site/solution-page";
import { getSolution, solutions } from "@/lib/solutions";

type Params = { params: Promise<{ slug: string }> };

// Only the /solutions/* entries; the operational-intelligence pillar has its own top-level route.
const nested = solutions.filter((solution) => solution.path.startsWith("/solutions/"));

export const dynamicParams = false;

export function generateStaticParams() {
  return nested.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  return solution && nested.includes(solution) ? solutionMetadata(solution) : {};
}

export default async function SolutionRoute({ params }: Params) {
  const solution = getSolution((await params).slug);
  if (!solution || !nested.includes(solution)) notFound();
  return <SolutionPage solution={solution} />;
}
