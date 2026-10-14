import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { VideoEmbed } from "./video-embed";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("recognizes media loaded before event handlers attach", () => {
  vi.spyOn(HTMLMediaElement.prototype, "readyState", "get").mockReturnValue(2);
  render(<VideoEmbed title="Already loaded" src="/videos/demo.webm" />);
  expect(screen.queryByRole("status")).toBeNull();
});

it("renders native playback with accessible controls and loading/error feedback", () => {
  render(<VideoEmbed title="Walkthrough" src="/videos/demo.webm" poster="/videos/demo.webp" autoPlay muted loop />);
  const video = screen.getByLabelText("Walkthrough");
  expect(video.tagName).toBe("VIDEO");
  expect(video).toHaveAttribute("poster", "/videos/demo.webp");
  expect(video).toHaveAttribute("controls");
  expect(video).toHaveAttribute("playsinline");
  expect(screen.getByRole("status")).toHaveTextContent("Loading");
  fireEvent.loadedData(video);
  expect(screen.queryByRole("status")).toBeNull();
  fireEvent.error(video);
  expect(screen.getByRole("status")).toHaveTextContent("unavailable");
});

it("retains remote embeds and the unpublished placeholder", () => {
  const view = render(<VideoEmbed title="Remote" src="https://www.youtube.com/embed/example" />);
  expect(screen.getByTitle("Remote").tagName).toBe("IFRAME");
  view.rerender(<VideoEmbed title="Upcoming" />);
  expect(screen.getByText(/Recording not yet published/)).toBeInTheDocument();
});

it("resets loading feedback when the source changes", () => {
  const view = render(<VideoEmbed title="Walkthrough" src="/videos/one.webm" />);
  fireEvent.loadedData(screen.getByLabelText("Walkthrough"));
  view.rerender(<VideoEmbed title="Walkthrough" src="/videos/two.webm" />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading");
});
