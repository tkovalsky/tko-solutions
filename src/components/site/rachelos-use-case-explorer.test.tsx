import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RachelOSUseCaseExplorer } from "./rachelos-use-case-explorer";
import { rachelosUseCases } from "@/lib/rachelos-use-cases";

vi.mock("@/components/site/mermaid-diagram", () => ({ MermaidDiagram: ({ textAlternative }: { textAlternative: string }) => <figure aria-label="Workflow diagram">{textAlternative}</figure> }));

beforeEach(() => window.history.replaceState(null, "", "/selected-work/from-crm-to-operating-system"));
afterEach(cleanup);

describe("RachelOS problem walkthroughs", () => {
  it("lets a visitor inspect steps and resets the walkthrough when changing problems", async () => {
    render(<RachelOSUseCaseExplorer />);
    expect(screen.getByRole("button", { name: /Previous/ })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /Next step/ }));
    expect(screen.getByRole("heading", { name: "The work becomes visible" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Next step/ }));
    expect(screen.getByRole("button", { name: /Next step/ })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /Everything depends on one person/ }));
    await waitFor(() => expect(window.location.hash).toBe("#use-case-key-person-dependency"));
    expect(screen.getByRole("heading", { name: "The context is scattered" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Previous/ })).toBeDisabled();
    expect(screen.getByRole("link", { name: "Discuss this workflow with Todd" })).toHaveAttribute("href", "/contact?useCase=key-person-dependency&cta=rachelos_use_case_key-person-dependency");
  });

  it("opens a shared problem and follows subsequent hash navigation", () => {
    window.history.replaceState(null, "", "?utm_source=linkedin#use-case-human-controlled-ai");
    render(<RachelOSUseCaseExplorer />);
    expect(screen.getByRole("heading", { name: /How can we use AI/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /AI needs an accountable reviewer/ })).toHaveAttribute("aria-pressed", "true");
    act(() => {
      window.history.replaceState(null, "", "?utm_source=linkedin#use-case-missed-follow-up");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByRole("heading", { name: /Why do leads fall through/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Everything depends on one person/ }));
    expect(window.location.search).toBe("?utm_source=linkedin");
    expect(screen.getByRole("link", { name: "Discuss this workflow with Todd" })).toHaveAttribute("href", "/contact?useCase=key-person-dependency&cta=rachelos_use_case_key-person-dependency&utm_source=linkedin");
  });

  it("ignores unknown deep links and does not represent the example as live execution", () => {
    window.history.replaceState(null, "", "#use-case-unrecognized");
    render(<RachelOSUseCaseExplorer />);
    expect(screen.getByRole("heading", { name: /Why do leads fall through/ })).toBeInTheDocument();
    expect(screen.getByText(/Illustrative example. No live client data/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Send|^Approve/ })).not.toBeInTheDocument();
  });

  it("uses cleared images or a labeled diagram without requesting quarantined captures", () => {
    render(<RachelOSUseCaseExplorer />);
    for (const useCase of rachelosUseCases) {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(useCase.title) }));
      fireEvent.click(screen.getByText("See it inside RachelOS"));
      if (useCase.proof.image) {
        expect(existsSync(join(process.cwd(), "public", useCase.proof.image))).toBe(true);
        expect(screen.getByRole("img", { name: useCase.proof.alt })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Open the redacted/ })).toHaveAttribute("href", useCase.proof.image);
      } else {
        expect(screen.getByLabelText("Illustrative relationship handoff")).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /Open the redacted/ })).not.toBeInTheDocument();
      }
    }
  });
});

it("supports keyboard inspection of four architecture panels without replacing the business walkthrough", () => {
  render(<RachelOSUseCaseExplorer />);
  expect(screen.getAllByRole("tab")).toHaveLength(4);
  const first = screen.getByRole("tab", { name: /Computed Relationship Context/ });
  fireEvent.keyDown(first, { key: "End" });
  expect(screen.getByRole("tab", { name: /Structured Knowledge Capture/ })).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Documentation and guides");
  fireEvent.click(screen.getByRole("tab", { name: /Exact-Message Human Approval Gate/ }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent("sends no messages");
  expect(screen.getByRole("button", { name: /Follow-up keeps slipping/ })).toBeInTheDocument();
});
