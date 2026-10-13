import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SelectedWorkPage, { generateMetadata } from "./page";
import ContactPage from "@/app/contact/page";

vi.mock("@/app/contact/actions", () => ({ submitDiagnosticIntake: vi.fn() }));
afterEach(cleanup);

describe("RachelOS demonstration journey", () => {
  it("puts exploration before the build narrative and preserves both entry points", async () => {
    const { container } = render(await SelectedWorkPage({ params: Promise.resolve({ slug: "from-crm-to-operating-system" }) }));
    expect(screen.getByRole("link", { name: "Explore a Business Problem" })).toHaveAttribute("href", "#use-cases");
    expect(screen.getByRole("link", { name: "Read the Build Story" })).toHaveAttribute("href", "#build-story");
    const sections = Array.from(container.querySelectorAll("section[id]"));
    expect(sections.findIndex((section) => section.id === "use-cases")).toBeLessThan(sections.findIndex((section) => section.id === "build-story"));
    expect(screen.getByRole("heading", { name: "How it was built" })).toBeInTheDocument();
  });

  it("describes the problem-led experience in metadata", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "from-crm-to-operating-system" }) });
    expect(metadata.description).toMatch(/missed follow-up, key-person dependency, and human-controlled AI/);
    expect(metadata.alternates?.canonical).toBe("/selected-work/from-crm-to-operating-system");
  });

  it("carries a known problem into editable intake rather than an offer", async () => {
    const { container } = render(await ContactPage({ searchParams: Promise.resolve({ useCase: "key-person-dependency" }) }));
    expect(screen.getByText("Your RachelOS example: Everything depends on one person")).toBeInTheDocument();
    expect(screen.getByLabelText("Which sounds most like your business?")).toHaveValue("knowledge-risk");
    expect(container.querySelector('input[name="offer"]')).toBeNull();
  });

  it("ignores unknown problem input and preserves the managed follow-up journey", async () => {
    const invalid = render(await ContactPage({ searchParams: Promise.resolve({ useCase: "unknown" }) }));
    expect(screen.queryByText(/Your RachelOS example/)).not.toBeInTheDocument();
    invalid.unmount();
    render(await ContactPage({ searchParams: Promise.resolve({ useCase: "human-controlled-ai", offer: "managed-follow-up" }) }));
    expect(screen.queryByText(/Your RachelOS example/)).not.toBeInTheDocument();
    expect(screen.getByLabelText("Team / brokerage")).toBeInTheDocument();
  });
});
