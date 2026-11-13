// Campaign labels (utm_*) are short tokens, never free text. Anything else, including an email
// address or a sentence, becomes "" so it is dropped rather than stored or sent to analytics.
// Shared by the browser attribution code and the server intake so both apply the same rule.
export function campaignToken(value: unknown): string {
  return typeof value === "string" && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(value) ? value : "";
}
