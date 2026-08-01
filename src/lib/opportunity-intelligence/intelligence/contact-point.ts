export function isContactPointOutreachEligible(point: { provenance?: string | null; status?: string | null }) {
  return point.status !== "opted_out" && point.status !== "invalid" && point.provenance !== "pattern_inferred";
}
