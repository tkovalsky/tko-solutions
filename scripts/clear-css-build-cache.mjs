// The webpack persistent cache in .next/cache/webpack does not track the component files that
// Tailwind v4 scans for class names, so a cached build (local, or Vercel's restored build cache)
// can ship CSS without classes added or changed since the cache was written. Verified 2026-11-12:
// a class added to a new component was missing after a cached `next build` and present after
// this directory was removed. Clearing only the webpack cache keeps the rest of .next/cache.
import { rmSync } from "node:fs";

rmSync(".next/cache/webpack", { recursive: true, force: true });
