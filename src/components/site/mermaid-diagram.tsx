"use client";

import { useEffect, useId, useState } from "react";

type MermaidDiagramProps = {
  source: string;
  title: string;
  textAlternative: string;
};

export function MermaidDiagram({ source, title, textAlternative }: MermaidDiagramProps) {
  const instanceId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            primaryColor: "#eff6ff",
            primaryTextColor: "#172033",
            primaryBorderColor: "#2563eb",
            lineColor: "#475569",
            secondaryColor: "#f8fafc",
            tertiaryColor: "#ffffff",
            fontFamily: "var(--font-geist-sans), Arial, sans-serif",
          },
        });
        const rendered = await mermaid.render(`mermaid-${instanceId}`, source);
        if (active) setSvg(rendered.svg);
      } catch (renderError) {
        if (active) setError(renderError instanceof Error ? renderError.message : "The diagram source could not be rendered.");
      }
    }

    render();
    return () => {
      active = false;
    };
  }, [instanceId, source]);

  const shellClassName = expanded
    ? "fixed inset-0 z-50 flex flex-col bg-white p-5 md:p-10"
    : "rounded-xl border border-border bg-white";

  return (
    <section className={shellClassName} aria-label={`${title} diagram`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-ink">Inspect the operating model</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setZoom((value) => Math.max(0.7, value - 0.15))} className="rounded border border-input-border px-2 py-1 text-xs font-semibold">−</button>
          <span className="min-w-12 py-1 text-center text-xs text-muted">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoom((value) => Math.min(1.8, value + 0.15))} className="rounded border border-input-border px-2 py-1 text-xs font-semibold">+</button>
          <button type="button" onClick={() => setExpanded((value) => !value)} className="rounded border border-input-border px-2 py-1 text-xs font-semibold">{expanded ? "Close full screen" : "Full screen"}</button>
        </div>
      </div>
      <div className="overflow-auto p-4 md:p-8" style={{ minHeight: expanded ? "calc(100vh - 9rem)" : "24rem" }}>
        {error ? (
          <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">The visual could not render. The text alternative and reviewed source remain available below.</p>
        ) : svg ? (
          <div className="origin-top-left transition-transform" style={{ transform: `scale(${zoom})`, width: `${100 / zoom}%` }} dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <p className="text-sm text-muted">Rendering diagram…</p>
        )}
      </div>
      <details className="border-t border-border px-4 py-3 text-sm text-muted">
        <summary className="cursor-pointer font-semibold text-ink">Text alternative and Mermaid source</summary>
        <p className="mt-3 leading-6">{textAlternative}</p>
        <pre className="mt-4 overflow-auto rounded bg-slate-950 p-4 text-xs leading-5 text-slate-100"><code>{source}</code></pre>
      </details>
    </section>
  );
}
