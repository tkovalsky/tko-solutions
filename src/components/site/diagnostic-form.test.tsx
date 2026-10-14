import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DiagnosticForm } from "./diagnostic-form";
import { getConversionAttribution, trackConversion } from "@/lib/conversion-events";
vi.mock("@/lib/conversion-events", async (importOriginal) => ({ ...await importOriginal<typeof import("@/lib/conversion-events")>(), trackConversion: vi.fn() }));
afterEach(() => { cleanup(); vi.clearAllMocks(); window.sessionStorage.clear(); window.history.replaceState({}, "", "/"); });
describe("follow-up pilot intake", () => {
  it("submits the original campaign and landing path after navigating from proof into readiness intake", () => {
    window.history.replaceState({}, "", "/healthcare/readiness-preview?utm_source=linkedin&utm_medium=personal&utm_campaign=readiness&email=private@example.com");
    getConversionAttribution();
    window.history.replaceState({}, "", "/contact?offer=regulatory-implementation-readiness-sprint");
    const { container } = render(<DiagnosticForm action={vi.fn()} offerSlug="regulatory-implementation-readiness-sprint" />);
    const data = new FormData(container.querySelector("form")!);
    expect(data.get("landingPage")).toBe("/healthcare/readiness-preview");
    expect(data.get("utmSource")).toBe("linkedin");
    expect(data.get("utmMedium")).toBe("personal");
    expect(data.get("utmCampaign")).toBe("readiness");
    expect(data.get("offer")).toBe("regulatory-implementation-readiness-sprint");
    expect(data.get("landingPage")).not.toContain("private@example.com");
  });
  it("carries the readiness offer into an editable, accepted healthcare intake", () => {
    const { container } = render(<DiagnosticForm action={vi.fn()} offerSlug="regulatory-implementation-readiness-sprint" />);
    expect(screen.getByLabelText("Which sounds most like your business?")).toHaveValue("healthcare-readiness");
    const data = new FormData(container.querySelector("form")!);
    expect(data.get("offer")).toBe("regulatory-implementation-readiness-sprint");
    expect(data.get("source")).toBe("commercial_offer_regulatory-implementation-readiness-sprint");
    expect(screen.getByLabelText("Which mandate or platform transition needs readiness evidence?")).toHaveValue("");
    expect(screen.queryByLabelText("Annual revenue")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Target deadline or decision date")).toBeRequired();
    expect(screen.getByLabelText("Sponsor or accountable role")).toBeRequired();
    expect(screen.getByLabelText("Affected systems and teams")).toBeRequired();
    expect(screen.getByLabelText("Scope and the decision you need")).toBeRequired();
  });
  it("keeps the selected example in submitted context while allowing the visitor to edit it", () => {
    const { container } = render(<DiagnosticForm action={vi.fn()} useCaseId="human-controlled-ai" />);
    const context = screen.getByLabelText("What would you like to fix or build?");
    expect((context as HTMLTextAreaElement).value).toContain("human-controlled AI");
    expect(screen.getByLabelText("Which sounds most like your business?")).toHaveValue("ai-tools");
    fireEvent.change(context, { target: { value: "Our team needs a reviewer before an AI-assisted customer response." } });
    const formData = new FormData(container.querySelector("form")!);
    expect(formData.get("transformationContext")).toBe("Our team needs a reviewer before an AI-assisted customer response.");
    expect(formData.get("source")).toBe("rachelos_use_case_human-controlled-ai");
    expect(formData.get("currentPressure")).toBe("ai-tools");
  });
  it("does not accept an unknown use case or override pilot context", () => {
    const unknown = render(<DiagnosticForm action={vi.fn()} useCaseId="not-a-case" />);
    expect(screen.getByLabelText("What would you like to fix or build?")).toHaveValue("");
    expect(unknown.container.querySelector('input[name="source"]')).toHaveValue("diagnostic_fit_call");
    unknown.unmount();
    const pilot = render(<DiagnosticForm action={vi.fn()} useCaseId="human-controlled-ai" managedFollowUp />);
    expect(pilot.container.querySelector('input[name="source"]')).toHaveValue("managed_follow_up_pilot");
    expect(screen.getByLabelText("Which sounds most like your business?")).toHaveValue("");
  });
  it("retains pilot context and does not disqualify a small practice by revenue", () => {
    const { container } = render(<DiagnosticForm action={vi.fn()} managedFollowUp />);
    fireEvent.change(screen.getByLabelText(/Annual commission revenue/), { target: { value: "under-2m" } });
    fireEvent.change(screen.getByLabelText("When do you want this fixed?"), { target: { value: "now" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(trackConversion).toHaveBeenCalledWith("qualified_intake_indicator", { qualified: true });
    expect(container.querySelector('input[name="offer"]')).toHaveProperty("value", "managed-follow-up");
    expect(container.querySelector('input[name="source"]')).toHaveProperty("value", "managed_follow_up_pilot");
    expect(screen.getByLabelText("Team / brokerage")).toBeTruthy();
  });
  it("preserves the general intake qualification rule", () => {
    const { container } = render(<DiagnosticForm action={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Annual revenue"), { target: { value: "under-2m" } });
    fireEvent.change(screen.getByLabelText("When do you want this fixed?"), { target: { value: "now" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(trackConversion).toHaveBeenCalledWith("qualified_intake_indicator", { qualified: false });
    expect(container.querySelector('input[name="offer"]')).toBeNull();
  });
});
