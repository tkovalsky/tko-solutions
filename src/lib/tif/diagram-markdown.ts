export function extractMermaidSource(body: string) {
  const match = /```mermaid\s*\n([\s\S]*?)```/i.exec(body);
  return match?.[1].trim() ?? null;
}

export function diagramTextAlternative({
  title,
  purpose,
  businessProblem,
  claimBoundary,
}: {
  title: string;
  purpose: string;
  businessProblem: string;
  claimBoundary: string;
}) {
  return `${title}. ${purpose} Business problem: ${businessProblem} Claim boundary: ${claimBoundary}`;
}
