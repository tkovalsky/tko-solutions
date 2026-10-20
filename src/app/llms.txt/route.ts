import { buildLlmsText } from "@/lib/llms";

// Static at build time: the content is derived from the offer registry and published guides.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
