import { describe, expect, it } from "vitest";
import { diagramTextAlternative, extractMermaidSource } from "./diagram-markdown";

describe("diagram markdown", () => {
  it("extracts a Mermaid block without accepting an unclosed fence", () => {
    expect(extractMermaidSource("# Diagram\n```mermaid\nflowchart LR\n A-->B\n```\n")).toBe("flowchart LR\n A-->B");
    expect(extractMermaidSource("```mermaid\nflowchart LR")).toBeNull();
  });

  it("keeps the problem and boundary in its non-visual alternative", () => {
    expect(diagramTextAlternative({ title: "Decision flow", purpose: "Shows ownership.", businessProblem: "Exceptions wait.", claimBoundary: "Not a policy." })).toContain("Claim boundary: Not a policy.");
  });
});
