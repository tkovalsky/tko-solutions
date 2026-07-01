import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AssetGenerationStatus, RegenerateAssetForm } from "./regenerate-asset-form";

describe("RegenerateAssetForm", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function showModal(this: HTMLDialogElement) {
      this.open = true;
      this.querySelector<HTMLElement>("[autofocus]")?.focus();
    });
    HTMLDialogElement.prototype.close = vi.fn(function close(this: HTMLDialogElement) {
      this.open = false;
    });
  });

  it("shows a manual edit warning before regenerating an edited asset", async () => {
    render(<RegenerateAssetForm opportunitySlug="edited-asset" label="Regenerate Asset" hasManualEdits />);

    await userEvent.click(screen.getByRole("button", { name: "Regenerate Asset" }));

    expect(screen.getByRole("heading", { name: "Manual Edits Detected" })).toBeInTheDocument();
    expect(
      screen.getByText("This asset has been modified since generation. Regenerating may overwrite your changes."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("cancel preserves content by leaving the regenerate form unconfirmed", async () => {
    render(<RegenerateAssetForm opportunitySlug="edited-asset" label="Regenerate Asset" hasManualEdits />);

    await userEvent.click(screen.getByRole("button", { name: "Regenerate Asset" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByDisplayValue("false")).toBeInTheDocument();
  });

  it("confirm proceeds with regeneration", async () => {
    const requestSubmit = vi.spyOn(HTMLFormElement.prototype, "requestSubmit").mockImplementation(() => {});
    render(<RegenerateAssetForm opportunitySlug="edited-asset" label="Regenerate Asset" hasManualEdits />);

    await userEvent.click(screen.getByRole("button", { name: "Regenerate Asset" }));
    await userEvent.click(screen.getByRole("button", { name: "Regenerate Anyway" }));

    expect(requestSubmit).toHaveBeenCalledTimes(1);
    expect(screen.getByDisplayValue("true")).toBeInTheDocument();
  });
});

describe("AssetGenerationStatus", () => {
  it("displays generated status for clean generated assets", () => {
    render(<AssetGenerationStatus isManuallyEdited={false} generatedAtLabel="Jun 30, 2026" />);

    expect(screen.getByText("Generated")).toBeInTheDocument();
    expect(screen.getByText("Last Generated: Jun 30, 2026")).toBeInTheDocument();
    expect(screen.queryByText(/Last Edited:/)).not.toBeInTheDocument();
  });

  it("displays manual edit status for edited generated assets", () => {
    render(
      <AssetGenerationStatus
        isManuallyEdited
        generatedAtLabel="Jun 30, 2026"
        lastEditedAtLabel="Jul 1, 2026"
      />,
    );

    expect(screen.getByText("Manually Edited")).toBeInTheDocument();
    expect(screen.getByText("Last Generated: Jun 30, 2026")).toBeInTheDocument();
    expect(screen.getByText("Last Edited: Jul 1, 2026")).toBeInTheDocument();
  });
});
