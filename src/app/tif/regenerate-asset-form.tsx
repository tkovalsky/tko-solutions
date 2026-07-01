"use client";

import { useRef, useState } from "react";
import { generateAsset } from "./actions";

type RegenerateAssetFormProps = {
  opportunitySlug: string;
  label: string;
  hasManualEdits: boolean;
};

export function RegenerateAssetForm({
  opportunitySlug,
  label,
  hasManualEdits,
}: RegenerateAssetFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      <form
        ref={formRef}
        action={generateAsset}
        onSubmit={(event) => {
          if (!hasManualEdits || confirmed) {
            return;
          }

          event.preventDefault();
          dialogRef.current?.showModal();
          cancelButtonRef.current?.focus();
        }}
      >
        <input type="hidden" name="opportunitySlug" value={opportunitySlug} />
        <input type="hidden" name="regenerateAnyway" value={confirmed ? "true" : "false"} />
        <button
          type="submit"
          className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          {label}
        </button>
      </form>

      <dialog
        ref={dialogRef}
        className="max-w-md rounded-lg border border-border bg-white p-0 text-foreground shadow-xl backdrop:bg-foreground/30"
        aria-labelledby={`manual-edits-title-${opportunitySlug}`}
      >
        <div className="p-5">
          <h2 id={`manual-edits-title-${opportunitySlug}`} className="text-lg font-semibold">
            Manual Edits Detected
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            This asset has been modified since generation. Regenerating may overwrite your changes.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              ref={cancelButtonRef}
              type="button"
              autoFocus
              className="rounded-lg border border-input-border px-3 py-1.5 text-sm font-semibold text-foreground"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white"
              onClick={() => {
                setConfirmed(true);
                dialogRef.current?.close();
                window.setTimeout(() => formRef.current?.requestSubmit(), 0);
              }}
            >
              Regenerate Anyway
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function AssetGenerationStatus({
  isManuallyEdited,
  generatedAtLabel,
  lastEditedAtLabel,
}: {
  isManuallyEdited: boolean;
  generatedAtLabel: string;
  lastEditedAtLabel?: string;
}) {
  return (
    <div className="text-xs text-muted">
      <p className={`font-semibold ${isManuallyEdited ? "text-warning" : "text-success"}`}>
        {isManuallyEdited ? "Manually Edited" : "Generated"}
      </p>
      <p>Last Generated: {generatedAtLabel}</p>
      {isManuallyEdited && lastEditedAtLabel && <p>Last Edited: {lastEditedAtLabel}</p>}
    </div>
  );
}
