import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ProofMediaSlots } from "./proof-media-slots";

afterEach(cleanup);
describe("Proof walkthroughs", () => {
  it("shows working proof instead of missing-recording placeholders or invented video URLs", () => {
    const { container } = render(<ProofMediaSlots />);
    expect(container.querySelectorAll("article")).toHaveLength(3);
    expect(container.querySelectorAll("video")).toHaveLength(1);
    expect(container.querySelectorAll("iframe")).toHaveLength(0);
    expect(screen.getByText(/Own the path from buyer research/)).toBeInTheDocument();
    expect(screen.getByText(/documented factual and quality failures/)).toBeInTheDocument();
    expect(screen.queryByText(/Recording not yet published/)).not.toBeInTheDocument();
    for (const video of container.querySelectorAll("video")) {
      expect(existsSync(join(process.cwd(), "public", video.getAttribute("src")!))).toBe(true);
      expect(existsSync(join(process.cwd(), "public", video.getAttribute("poster")!))).toBe(true);
      expect(video.autoplay).toBe(false);
    }
  });
  it("limits the healthcare surface to the synthetic lab and its interactive fallback", () => {
    const { container } = render(<ProofMediaSlots kind="healthcare" />);
    expect(container.querySelectorAll("article")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Run the interactive decision lab" })).toHaveAttribute("href", "/healthcare/impact-assessment#authorization-decision-lab");
    expect(screen.queryByText(/Own the path from buyer research/)).not.toBeInTheDocument();
  });
});
