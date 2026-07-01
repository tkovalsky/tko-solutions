import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TIF Access",
  robots: { index: false, follow: false },
};

function safeNextPath(value: string | undefined) {
  if (!value) return "/tif";
  if (value !== "/tif" && !value.startsWith("/tif/")) return "/tif";
  if (value.startsWith("/tif/login")) return "/tif";
  return value;
}

export default async function TifLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const nextPath = safeNextPath(next);

  return (
    <main
      style={{
        fontFamily: "monospace",
        padding: "40px 20px",
        maxWidth: "360px",
        margin: "80px auto",
      }}
    >
      <h1 style={{ fontSize: "15px", letterSpacing: "0.05em", marginBottom: "24px" }}>
        TIF ACCESS
      </h1>
      {error && (
        <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>
          Invalid key.
        </p>
      )}
      <form method="POST" action="/api/tif/auth">
        <input type="hidden" name="next" value={nextPath} />
        <input
          type="password"
          name="key"
          placeholder="Access key"
          autoFocus
          style={{
            display: "block",
            width: "100%",
            padding: "8px 10px",
            marginBottom: "12px",
            fontFamily: "monospace",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontFamily: "monospace",
            fontSize: "14px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </form>
    </main>
  );
}
