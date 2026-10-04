import { describe, expect, it } from "vitest";
import { DISCLOSURE_LEVEL } from "./disclosure";
import { storyCopy } from "../content/healthcare/story";

describe("Disclosure level guards", () => {
  it("never leaks restricted names in generic mode", () => {
    // We only enforce this if the current mode is generic
    if (DISCLOSURE_LEVEL === "generic") {
      const restrictedTerms = [
        "UnitedHealthcare",
        "UHC",
        "Optum",
        "Cognizant",
      ];

      // Recursively check all strings in the story copy
      const checkStrings = (obj: unknown) => {
        if (typeof obj === "string") {
          for (const term of restrictedTerms) {
            expect(obj).not.toContain(term);
          }
        } else if (typeof obj === "object" && obj !== null) {
          for (const key of Object.keys(obj)) {
            checkStrings((obj as Record<string, unknown>)[key]);
          }
        }
      };

      checkStrings(storyCopy);
      
      // Also check that showPediatric is false or we don't leak Pediatric name?
      // Actually, pediatric is restricted entirely unless announced. 
      // We will handle it by just checking `showPediatric` or checking if 'Pediatric' string is leaked.
      // Wait, 'Pediatric' is restricted? The build plan says "Pediatric" shouldn't appear at all in generic mode.
      const pediatricTerms = ["Pediatric"];
      const checkPediatric = (obj: unknown) => {
        if (typeof obj === "string") {
          for (const term of pediatricTerms) {
             expect(obj).not.toContain(term);
          }
        } else if (typeof obj === "object" && obj !== null) {
          for (const key of Object.keys(obj)) {
            checkPediatric((obj as Record<string, unknown>)[key]);
          }
        }
      };
      checkPediatric(storyCopy);
    }
  });
});
