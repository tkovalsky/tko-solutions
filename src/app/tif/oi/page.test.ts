import { describe, expect, it, vi } from "vitest";
import OiPage from "./page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

describe("OiPage", () => {
  it("redirects to Today", () => {
    expect(() => OiPage()).toThrow("REDIRECT:/tif/oi/today");
  });
});
