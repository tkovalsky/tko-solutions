import { truthFramework, systemFlow } from "@/lib/content";

export function TruthFramework() {
  return (
    <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-7">
      {truthFramework.map((item, index) => (
        <li
          key={item}
          className="min-h-36 border border-border bg-white p-5 lg:min-h-52"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-6 text-base font-semibold leading-6 text-foreground">
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function SystemFlow() {
  return (
    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
      {systemFlow.map((item, index) => (
        <div key={item} className="border border-border bg-white p-5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-8 text-xl font-semibold">{item}</h3>
        </div>
      ))}
    </div>
  );
}

