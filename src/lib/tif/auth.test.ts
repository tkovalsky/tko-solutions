import { afterEach, describe, expect, it } from "vitest";
import { validateTifAccessKey } from "./auth";

const originalAccessKey = process.env.TIF_ACCESS_KEY;

afterEach(() => {
  process.env.TIF_ACCESS_KEY = originalAccessKey;
});

describe("TIF auth", () => {
  it("validates the configured access key", () => {
    process.env.TIF_ACCESS_KEY = "test-secret";

    expect(validateTifAccessKey("test-secret")).toBe(true);
    expect(validateTifAccessKey(" wrong ")).toBe(false);
    expect(validateTifAccessKey(undefined)).toBe(false);
  });

  it("fails closed when no access key is configured", () => {
    delete process.env.TIF_ACCESS_KEY;

    expect(validateTifAccessKey("test-secret")).toBe(false);
  });
});
