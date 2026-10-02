"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function QueueWalkthroughModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
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
      setStatus("success");
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              ✕
            </button>
            <div className="p-6 md:p-8">
              <div className="space-y-2 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Schedule a Queue Walk-Through</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  See the live production queue in Delray Beach. No sales pitch, just a 15-minute architectural review of the governed AI engine.
                </p>
              </div>

              {status === "success" ? (
                <div className="py-6 text-center space-y-4">
                  <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Request Received</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
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
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent dark:border-slate-700 dark:focus:ring-slate-600" 
                      placeholder="Principal / Managing Partner"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="firm" className="text-sm font-medium">Firm</label>
                    <input 
                      id="firm" 
                      name="firm" 
                      required 
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent dark:border-slate-700 dark:focus:ring-slate-600" 
                      placeholder="Boutique Brokerage / Advisory"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="market" className="text-sm font-medium">Primary Market</label>
                    <input 
                      id="market" 
                      name="market" 
                      required 
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent dark:border-slate-700 dark:focus:ring-slate-600" 
                      placeholder="e.g., Greenwich, Manhattan, Chicago"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="transactionSize" className="text-sm font-medium">Typical Transaction Size</label>
                    <input 
                      id="transactionSize" 
                      name="transactionSize" 
                      required 
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent dark:border-slate-700 dark:focus:ring-slate-600" 
                      placeholder="e.g., $5M to $25M"
                    />
                  </div>

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
