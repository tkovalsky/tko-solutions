"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function QueueWalkthroughModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "notification-error" | "error">("idle");

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]') ?? []);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      firm: formData.get("firm"),
      market: formData.get("market"),
      transactionSize: formData.get("transactionSize"),
      inquiryType: "PCOS_QUEUE_WALKTHROUGH",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      const result = await res.json();
      setStatus(result.notificationSent ? "success" : "notification-error");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-block w-full md:w-auto">
        {children}
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Request a private queue walkthrough" className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              aria-label="Close walkthrough request"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-foreground"
            >
              ✕
            </button>
            <div className="p-6 md:p-8">
              <div className="space-y-2 mb-6">
                <h2 className="text-xl font-bold text-foreground">Schedule a Queue Walk-Through</h2>
                <p className="text-sm text-slate-600">
                  See the live production queue in Delray Beach. No sales pitch, just a 15-minute architectural review of the governed AI engine.
                </p>
              </div>

              {status === "success" ? (
                <div className="py-6 text-center space-y-4">
                  <h3 className="text-lg font-medium text-green-600">Request Received</h3>
                  <p className="text-sm text-slate-600">
                    Todd will reach out shortly to coordinate a 15-minute window to show you the live queue.
                  </p>
                  <Button onClick={() => setOpen(false)} className="mt-4 w-full">Close</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="flex min-h-12 w-full rounded-md border border-input-border bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Principal / Managing Partner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="flex min-h-12 w-full rounded-md border border-input-border bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="todd@firm.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="firm" className="text-sm font-medium">Firm</label>
                    <input
                      id="firm"
                      name="firm"
                      required
                      className="flex min-h-12 w-full rounded-md border border-input-border bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Boutique Brokerage / Advisory"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="market" className="text-sm font-medium">Primary Market</label>
                    <input
                      id="market"
                      name="market"
                      required
                      className="flex min-h-12 w-full rounded-md border border-input-border bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Greenwich, Manhattan, Chicago"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="transactionSize" className="text-sm font-medium">Typical Transaction Size</label>
                    <input
                      id="transactionSize"
                      name="transactionSize"
                      required
                      className="flex min-h-12 w-full rounded-md border border-input-border bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., $5M to $25M"
                    />
                  </div>

                  {status === "notification-error" && (
                    <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">Your request was saved, but the email notification could not be confirmed. Please email <a href="mailto:todd@tko.solutions" className="font-semibold underline">todd@tko.solutions</a> directly so it is not missed.</p>
                  )}

                  {status === "error" && (
                    <p className="text-sm text-red-500">Something went wrong. Please try emailing directly at todd@tko.solutions.</p>
                  )}

                  <div className="pt-4">
                    <Button type="submit" disabled={status === "submitting"} className="w-full">
                      {status === "submitting" ? "Requesting..." : "Request Access"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
