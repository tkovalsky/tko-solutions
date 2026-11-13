import { SolutionPage, solutionMetadata } from "@/components/site/solution-page";
import { getSolution } from "@/lib/solutions";

const solution = getSolution("operational-intelligence")!;

export const metadata = solutionMetadata(solution);

export default function OperationalIntelligencePage() {
  return <SolutionPage solution={solution} />;
}
