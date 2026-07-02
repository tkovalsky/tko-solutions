import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { getInsight, getInsights, getRelatedInsights } from "@/lib/insights";

let contentDir: string;

afterEach(() => {
  if (contentDir) {
    rmSync(contentDir, { recursive: true, force: true });
  }
});

describe("insights content library", () => {
  it("parses frontmatter, derives slugs, filters unpublished content, and computes metadata", () => {
    contentDir = mkdtempSync(path.join(tmpdir(), "insights-"));
    writeInsight(
      "first-file.md",
      `---
title: "First Insight"
description: >-
  A first description
  that spans lines.
business_unit: healthcare
voice: tko-advisory
sources:
  - source-one
  - source-two
date: 2026-06-01
featured: false
---
# First Insight

${"word ".repeat(201)}
`,
    );
    writeInsight(
      "featured-file.md",
      `---
title: "Featured Insight"
description: "A featured description."
business_unit: healthcare
sources: [source-three]
date: 2026-05-01
slug: custom-featured
featured: true
---
## Featured

Short body.
`,
    );
    writeInsight(
      "unpublished.md",
      `---
title: "Unpublished Insight"
description: "Should not render."
date: 2026-07-01
published: false
---
Hidden body.
`,
    );

    const insights = getInsights(contentDir);

    expect(insights.map((insight) => insight.slug)).toEqual([
      "custom-featured",
      "first-file",
    ]);
    expect(insights[0]).toMatchObject({
      title: "Featured Insight",
      published: true,
      featured: true,
      sourceCount: 1,
      readingTime: 1,
    });
    expect(insights[1]).toMatchObject({
      slug: "first-file",
      description: "A first description that spans lines.",
      sourceCount: 2,
      readingTime: 2,
      wordCount: 203,
    });
    expect(getInsight("unpublished", contentDir)).toBeNull();
  });

  it("sorts non-featured articles by date descending and builds deterministic related insights", () => {
    contentDir = mkdtempSync(path.join(tmpdir(), "insights-"));
    writeInsight("current.md", markdown("Current", "current", "healthcare", "2026-06-01"));
    writeInsight("same-newer.md", markdown("Same Newer", "same-newer", "healthcare", "2026-06-15"));
    writeInsight("same-older.md", markdown("Same Older", "same-older", "healthcare", "2026-05-01"));
    writeInsight("other.md", markdown("Other", "other", "operations", "2026-06-20"));

    expect(getInsights(contentDir).map((insight) => insight.slug)).toEqual([
      "other",
      "same-newer",
      "current",
      "same-older",
    ]);
    expect(getRelatedInsights("current", contentDir).map((insight) => insight.slug)).toEqual([
      "same-newer",
      "same-older",
      "other",
    ]);
  });
});

function writeInsight(filename: string, content: string) {
  writeFileSync(path.join(contentDir, filename), content);
}

function markdown(title: string, slug: string, businessUnit: string, date: string) {
  return `---
title: "${title}"
description: "${title} description."
business_unit: ${businessUnit}
date: ${date}
slug: ${slug}
---
Body for ${title}.
`;
}
