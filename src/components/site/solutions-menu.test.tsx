import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SolutionsMenu } from "@/components/site/solutions-menu";
import { MobileNav } from "@/components/site/mobile-nav";
import { publicNavigation, solutionNavigation } from "@/lib/site";
import { solutions } from "@/lib/solutions";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

afterEach(() => {
  cleanup();
  pathname.current = "/";
});

describe("Solutions navigation", () => {
  it("lists every solution page, then the two vertical offers, and keeps them out of the top level", () => {
    expect(solutionNavigation.map((item) => item.href)).toEqual([...solutions.map((solution) => solution.path), "/healthcare/impact-assessment", "/private-client-os"]);
    expect(solutionNavigation.every((item) => item.summary)).toBe(true);
    expect(publicNavigation.map((item) => item.label)).toEqual(["Services & Pricing", "RachelOS Proof", "Guides", "About"]);
  });

  it("opens on click, exposes plain links, and closes on Escape with focus back on the button", async () => {
    const user = userEvent.setup();
    render(<SolutionsMenu items={solutionNavigation} />);
    const button = screen.getByRole("button", { name: "Solutions" });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("link", { name: /Delivery intelligence/ })).toBeNull();

    await user.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById(button.getAttribute("aria-controls")!)?.hidden).toBe(false);
    expect(screen.getAllByRole("link")).toHaveLength(solutionNavigation.length);
    expect(screen.getByRole("link", { name: /Delivery intelligence/ }).getAttribute("href")).toBe("/solutions/delivery-intelligence");

    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("link", { name: /Operational intelligence/ }));
    await user.keyboard("{Escape}");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button);
  });

  it("opens from the keyboard and closes on an outside click", async () => {
    const user = userEvent.setup();
    render(<><SolutionsMenu items={solutionNavigation} /><p>Outside</p></>);
    const button = screen.getByRole("button", { name: "Solutions" });
    button.focus();
    await user.keyboard("{Enter}");
    expect(button.getAttribute("aria-expanded")).toBe("true");
    await user.click(screen.getByText("Outside"));
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("marks the current solution page and flags the menu button as active", async () => {
    pathname.current = "/solutions/revenue-operations";
    const user = userEvent.setup();
    render(<SolutionsMenu items={solutionNavigation} />);
    const button = screen.getByRole("button", { name: "Solutions" });
    expect(button.dataset.active).toBe("true");
    await user.click(button);
    expect(screen.getByRole("link", { name: /Revenue operations/ }).getAttribute("aria-current")).toBe("page");
  });

  it("groups the solutions under a labeled list in the mobile panel", async () => {
    const user = userEvent.setup();
    render(<MobileNav solutions={solutionNavigation} items={publicNavigation} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const group = screen.getByRole("list", { name: "Solutions" });
    expect(group.querySelectorAll("a")).toHaveLength(solutionNavigation.length);
    expect(screen.getByRole("link", { name: "About" }).getAttribute("href")).toBe("/founder");
  });
});
