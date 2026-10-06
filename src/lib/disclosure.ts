export type DisclosureLevel = "generic" | "programs" | "full";

// The single source of truth for organizational and program disclosure.
export const DISCLOSURE_LEVEL: DisclosureLevel = "generic";

export const disclosure = {
  get level(): DisclosureLevel {
    return DISCLOSURE_LEVEL;
  },
  get isGeneric() {
    return this.level === "generic";
  },
  get isPrograms() {
    return this.level === "programs" || this.level === "full";
  },
  get isFull() {
    return this.level === "full";
  },

  // Name resolvers
  get employerName() {
    return this.isFull ? "UnitedHealthcare" : "a national payer";
  },
  get employerPossessive() {
    return this.isFull ? "UnitedHealthcare's" : "a national payer's";
  },
  get agencyName() {
    return this.isFull ? "Cognizant" : "a global consultancy";
  },
  
  // Programs
  get programNational() {
    return this.isPrograms ? "National Gold Card" : "National";
  },
  get programState() {
    return this.isPrograms ? "State Gold Card" : "State / regulatory";
  },
  get programRural() {
    return this.isPrograms ? "Rural Waiver" : "Rural";
  },
  get programPediatric() {
    return this.isPrograms ? "Pediatric" : "Pediatric"; // Pediatric is not announced yet, so in generic we just say Pediatric, but wait, if it's generic, we shouldn't even show Pediatric maybe?
  },
  
  get showPediatric() {
    // Pediatric isn't announced yet. 
    return this.isPrograms;
  },
  
  get genericGoldCardDescription() {
    return this.isPrograms ? "Gold Card programs" : "gold card programs";
  }
};
