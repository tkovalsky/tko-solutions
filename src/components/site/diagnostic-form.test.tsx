import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DiagnosticForm } from "./diagnostic-form";
import { trackConversion } from "@/lib/conversion-events";
vi.mock("@/lib/conversion-events", () => ({ trackConversion: vi.fn() }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });
describe("follow-up pilot intake", () => {
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
