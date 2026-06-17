type FaqItem = {
  q: string;
  a: string;
};

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold">
            {item.q}
            <span className="mt-1 text-muted transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-[65ch] text-base leading-7 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

