import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function OiTodayPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p>Today arrives in POIS-110</p>
    </section>
  );
}
