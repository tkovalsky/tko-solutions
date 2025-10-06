// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-semibold">
            TKO Solutions — Automation Strategy & Workflow Design
          </h1>
          <p className="mt-3 text-slate-300">
            We map messy processes, design clean workflows, and stand up
            no-code/AI prototypes so your team ships outcomes—without hiring developers.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#contact" className="rounded bg-amber-500 px-4 py-2 font-medium text-slate-900">
              Start the Diagnostic
            </a>
            <a href="#newsletter" className="rounded border border-slate-500 px-4 py-2">
              Get the Playbook
            </a>
          </div>
        </div>
      </header>

      <section id="what" className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-semibold">What we do</h2>
        <ul className="mt-4 list-disc pl-6 space-y-2">
          <li>Rapid interviews & current-state mapping</li>
          <li>Target workflow design (tools, triggers, checks, ownership)</li>
          <li>Gen-AI/no-code prototype (Zapier/Make/Airtable/Sheets/Notion)</li>
          <li>Handoff docs + SOPs; optional ongoing advisory</li>
        </ul>
      </section>

      <section id="packages" className="bg-white border-y">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Packages</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded border p-6">
              <h3 className="font-semibold">Diagnostic</h3>
              <p className="mt-2 text-sm text-slate-600">
                60–90 min discovery, 1–2 page blueprint, 3 quick wins, 30-day plan.
              </p>
              <p className="mt-4 font-semibold">$750</p>
            </div>
            <div className="rounded border p-6">
              <h3 className="font-semibold">Prototype Sprint</h3>
              <p className="mt-2 text-sm text-slate-600">
                MVP in 2–3 weeks using AI/no-code + SOPs and handoff.
              </p>
              <p className="mt-4 font-semibold">$3k–$5k</p>
            </div>
            <div className="rounded border p-6">
              <h3 className="font-semibold">Advisor Retainer</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ongoing reviews, prompt engineering, QA, roadmap.
              </p>
              <p className="mt-4 font-semibold">$1.5k–$3k/mo</p>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-semibold">Get the Automation Playbook</h2>
        <p className="mt-2 text-slate-600">
          Monthly tactics for CTO/CIO/COO/CPO leaders—what to automate first, and how.
        </p>
        <form
          className="mt-4 flex max-w-lg gap-2"
          action="https://buttondown.email/api/emails/embed-subscribe/YOUR_HANDLE"
          method="post"
          target="popupwindow"
          onSubmit={() => window.open('https://buttondown.email/YOUR_HANDLE','popupwindow')}
        >
          <input type="hidden" name="embed" value="1" />
          <input
            required
            type="email"
            name="email"
            placeholder="you@company.com"
            className="flex-1 rounded border px-3 py-2"
          />
          <button className="rounded bg-amber-500 px-4 py-2 font-medium text-slate-900">Subscribe</button>
        </form>
      </section>

      <section id="contact" className="bg-white border-y">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Start the Diagnostic</h2>
          <form className="mt-4 grid gap-3 max-w-xl" action="/api/contact" method="post">
            <input className="rounded border px-3 py-2" name="name" placeholder="Your name" required />
            <input className="rounded border px-3 py-2" type="email" name="email" placeholder="you@company.com" required />
            <input className="rounded border px-3 py-2" name="company" placeholder="Company" />
            <textarea className="rounded border px-3 py-2" name="message" rows={5} placeholder="What workflow’s hurting the most?"></textarea>
            <button className="rounded bg-slate-900 px-4 py-2 text-white">Send</button>
          </form>
          <p className="mt-3 text-xs text-slate-500">
            By submitting you agree to our{" "}
            <Link className="underline" href="/terms">Terms</Link> and{" "}
            <Link className="underline" href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-sm text-slate-500">
        © {new Date().getFullYear()} TKO Solutions
      </footer>
    </main>
  );
}