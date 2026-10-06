export type LineOfBusiness = "commercial" | "medicare_advantage" | "medicaid";

export type ProgramQualification = "none" | "performance_waiver" | "rural_access";

export type ReviewRoute = "plan_um" | "delegated_specialty" | "no_clinical_review" | "resolve_inputs";

export type AuthorizationDisposition =
  | "PA_REQUIRED"
  | "PA_WAIVED"
  | "PA_NOT_REQUIRED"
  | "UNRESOLVED";

export type ClaimsArtifact =
  | "PRIOR_AUTHORIZATION_RECORD"
  | "ADVANCE_NOTIFICATION_RECORD"
  | "NO_AUTHORIZATION_ARTIFACT"
  | "NOT_DETERMINED";

export type DecisionAuthority =
  | "Member and eligibility"
  | "Benefit coverage"
  | "Procedure policy"
  | "Provider program"
  | "UM orchestration"
  | "Claims control";

export type AuthorizationAssessmentInput = {
  scenarioId: string;
  scenarioName: string;
  lineOfBusiness: LineOfBusiness;
  planId: string;
  serviceCode: string;
  serviceDescription: string;
  memberEligible: boolean;
  benefitCovered: boolean;
  policyEffective: boolean;
  policyRequiresAuthorization: boolean;
  providerTinMatches: boolean;
  qualification: ProgramQualification;
  qualificationActive: boolean;
  programIncludesService: boolean;
  delegatedSpecialtyReview: boolean;
  advanceNotificationRequired: boolean;
};

export type DecisionTraceStep = {
  order: number;
  authority: DecisionAuthority;
  question: string;
  finding: string;
  effect: "continue" | "control" | "decision";
};

export type AuthorizationAssessment = {
  disposition: AuthorizationDisposition;
  dispositionLabel: string;
  summary: string;
  reviewRoute: ReviewRoute;
  reviewRouteLabel: string;
  claimsArtifact: ClaimsArtifact;
  claimsArtifactLabel: string;
  trace: DecisionTraceStep[];
  unresolvedFacts: string[];
  controls: string[];
  measurementPlan: string[];
};

/**
 * Synthetic scenarios demonstrate the decision boundaries. They are not payer
 * policies, coverage guidance, or replicas of any employer's rules.
 */
export const syntheticAuthorizationScenarios: AuthorizationAssessmentInput[] = [
  {
    scenarioId: "qualified-provider-notification",
    scenarioName: "Qualified provider; review waived; notification preserved",
    lineOfBusiness: "commercial",
    planId: "SYN-COM-ALPHA",
    serviceCode: "IMG-410",
    serviceDescription: "Advanced imaging service",
    memberEligible: true,
    benefitCovered: true,
    policyEffective: true,
    policyRequiresAuthorization: true,
    providerTinMatches: true,
    qualification: "performance_waiver",
    qualificationActive: true,
    programIncludesService: true,
    delegatedSpecialtyReview: true,
    advanceNotificationRequired: true,
  },
  {
    scenarioId: "standard-specialty-review",
    scenarioName: "Standard authorization through a specialty partner",
    lineOfBusiness: "medicare_advantage",
    planId: "SYN-MA-BRAVO",
    serviceCode: "IMG-410",
    serviceDescription: "Advanced imaging service",
    memberEligible: true,
    benefitCovered: true,
    policyEffective: true,
    policyRequiresAuthorization: true,
    providerTinMatches: true,
    qualification: "none",
    qualificationActive: false,
    programIncludesService: false,
    delegatedSpecialtyReview: true,
    advanceNotificationRequired: false,
  },
  {
    scenarioId: "rural-access-notification",
    scenarioName: "Rural access exemption with a claims control",
    lineOfBusiness: "medicaid",
    planId: "SYN-MCD-CHARLIE",
    serviceCode: "THER-220",
    serviceDescription: "Outpatient therapy service",
    memberEligible: true,
    benefitCovered: true,
    policyEffective: true,
    policyRequiresAuthorization: true,
    providerTinMatches: true,
    qualification: "rural_access",
    qualificationActive: true,
    programIncludesService: true,
    delegatedSpecialtyReview: false,
    advanceNotificationRequired: true,
  },
  {
    scenarioId: "policy-no-authorization",
    scenarioName: "Plan policy does not require authorization",
    lineOfBusiness: "commercial",
    planId: "SYN-COM-DELTA",
    serviceCode: "BH-115",
    serviceDescription: "Outpatient behavioral health service",
    memberEligible: true,
    benefitCovered: true,
    policyEffective: true,
    policyRequiresAuthorization: false,
    providerTinMatches: true,
    qualification: "none",
    qualificationActive: false,
    programIncludesService: false,
    delegatedSpecialtyReview: false,
    advanceNotificationRequired: false,
  },
  {
    scenarioId: "unresolved-policy",
    scenarioName: "Policy version is not effective for the service date",
    lineOfBusiness: "commercial",
    planId: "SYN-COM-ECHO",
    serviceCode: "SURG-330",
    serviceDescription: "Outpatient surgical service",
    memberEligible: true,
    benefitCovered: true,
    policyEffective: false,
    policyRequiresAuthorization: true,
    providerTinMatches: true,
    qualification: "performance_waiver",
    qualificationActive: true,
    programIncludesService: true,
    delegatedSpecialtyReview: false,
    advanceNotificationRequired: true,
  },
];

export function evaluateAuthorization(
  input: AuthorizationAssessmentInput,
): AuthorizationAssessment {
  const trace: DecisionTraceStep[] = [];
  const unresolvedFacts: string[] = [];
  const controls: string[] = [
    "Keep benefit coverage separate from authorization requirements.",
    "Use effective-dated policy and qualification records.",
    "Retain the source, rule version, inputs, and result for reconstruction.",
  ];

  const addTrace = (
    authority: DecisionAuthority,
    question: string,
    finding: string,
    effect: DecisionTraceStep["effect"],
  ) => {
    trace.push({ order: trace.length + 1, authority, question, finding, effect });
  };

  addTrace(
    "Member and eligibility",
    "Is the member eligible for the selected plan on the service date?",
    input.memberEligible ? `Eligible in ${lineOfBusinessLabel(input.lineOfBusiness)}.` : "Eligibility is not confirmed.",
    input.memberEligible ? "continue" : "control",
  );

  if (!input.memberEligible) {
    unresolvedFacts.push("Confirm member eligibility and the in-force plan for the service date.");
  }

  addTrace(
    "Benefit coverage",
    "Is the service a covered benefit under this plan?",
    input.benefitCovered
      ? `${input.serviceDescription} is marked covered in this synthetic scenario.`
      : "Benefit coverage is not confirmed.",
    input.benefitCovered ? "continue" : "control",
  );

  if (!input.benefitCovered) {
    unresolvedFacts.push("Resolve benefit coverage before determining the authorization path.");
  }

  addTrace(
    "Procedure policy",
    "Is the correct policy version effective for the service date?",
    input.policyEffective
      ? `The ${input.planId} policy version is effective.`
      : "No effective policy version is available for the service date.",
    input.policyEffective ? "continue" : "control",
  );

  if (!input.policyEffective) {
    unresolvedFacts.push("Resolve the effective policy version for the plan, service, and date.");
  }

  if (unresolvedFacts.length > 0) {
    addTrace(
      "UM orchestration",
      "Can the workflow issue a governed determination?",
      "No. One or more controlling inputs are unresolved, so the workflow fails closed.",
      "decision",
    );

    return buildAssessment({
      disposition: "UNRESOLVED",
      reviewRoute: "resolve_inputs",
      claimsArtifact: "NOT_DETERMINED",
      trace,
      unresolvedFacts,
      controls: [...controls, "Route unresolved or conflicting inputs to a named operational owner."],
    });
  }

  addTrace(
    "Procedure policy",
    "Does plan policy require prior authorization for this service?",
    input.policyRequiresAuthorization
      ? "The effective procedure policy requires prior authorization."
      : "The effective procedure policy does not require prior authorization.",
    input.policyRequiresAuthorization ? "continue" : "decision",
  );

  let disposition: AuthorizationDisposition;
  let reviewRoute: ReviewRoute;

  if (!input.policyRequiresAuthorization) {
    disposition = "PA_NOT_REQUIRED";
    reviewRoute = "no_clinical_review";
  } else {
    const qualificationApplies =
      input.qualification !== "none" &&
      input.qualificationActive &&
      input.providerTinMatches &&
      input.programIncludesService;

    addTrace(
      "Provider program",
      "Does an active provider-program qualification apply to this TIN, plan, and service?",
      qualificationApplies
        ? `${qualificationLabel(input.qualification)} applies to the submitted provider TIN and service.`
        : providerProgramFinding(input),
      qualificationApplies ? "decision" : "continue",
    );

    if (qualificationApplies) {
      disposition = "PA_WAIVED";
      reviewRoute = "no_clinical_review";
    } else {
      disposition = "PA_REQUIRED";
      reviewRoute = input.delegatedSpecialtyReview ? "delegated_specialty" : "plan_um";
      addTrace(
        "UM orchestration",
        "Where should the authorization request route?",
        input.delegatedSpecialtyReview
          ? "Route to the delegated specialty review partner."
          : "Route to the plan utilization-management workflow.",
        "decision",
      );
    }
  }

  const claimsArtifact = determineClaimsArtifact(
    disposition,
    input.advanceNotificationRequired,
  );

  addTrace(
    "Claims control",
    "What downstream artifact must claims processing be able to find?",
    claimsArtifactLabel(claimsArtifact),
    "decision",
  );

  if (disposition === "PA_WAIVED" && input.advanceNotificationRequired) {
    controls.push(
      "Preserve an advance-notification path even though clinical authorization review is removed.",
    );
  }

  return buildAssessment({
    disposition,
    reviewRoute,
    claimsArtifact,
    trace,
    unresolvedFacts,
    controls,
  });
}

function buildAssessment({
  disposition,
  reviewRoute,
  claimsArtifact,
  trace,
  unresolvedFacts,
  controls,
}: Omit<AuthorizationAssessment, "dispositionLabel" | "summary" | "reviewRouteLabel" | "claimsArtifactLabel" | "measurementPlan">): AuthorizationAssessment {
  return {
    disposition,
    dispositionLabel: dispositionLabel(disposition),
    summary: dispositionSummary(disposition, claimsArtifact),
    reviewRoute,
    reviewRouteLabel: reviewRouteLabel(reviewRoute),
    claimsArtifact,
    claimsArtifactLabel: claimsArtifactLabel(claimsArtifact),
    trace,
    unresolvedFacts,
    controls,
    measurementPlan: [
      "Case volume by decision path, plan, service, and provider segment",
      "Manual touches and active staff minutes per case",
      "Clean notification or authorization creation rate",
      "Claims fallout tied to missing, late, or mismatched control artifacts",
      "Exception, appeal, and rework volume by root cause",
    ],
  };
}

function determineClaimsArtifact(
  disposition: AuthorizationDisposition,
  advanceNotificationRequired: boolean,
): ClaimsArtifact {
  if (disposition === "PA_REQUIRED") return "PRIOR_AUTHORIZATION_RECORD";
  if (advanceNotificationRequired) return "ADVANCE_NOTIFICATION_RECORD";
  if (disposition === "UNRESOLVED") return "NOT_DETERMINED";
  return "NO_AUTHORIZATION_ARTIFACT";
}

function dispositionLabel(disposition: AuthorizationDisposition) {
  return {
    PA_REQUIRED: "Prior authorization required",
    PA_WAIVED: "Prior authorization review waived",
    PA_NOT_REQUIRED: "Prior authorization not required by policy",
    UNRESOLVED: "Determination withheld",
  }[disposition];
}

function dispositionSummary(
  disposition: AuthorizationDisposition,
  artifact: ClaimsArtifact,
) {
  if (disposition === "UNRESOLVED") {
    return "The workflow cannot safely choose a path until the controlling source is resolved.";
  }

  if (disposition === "PA_WAIVED" && artifact === "ADVANCE_NOTIFICATION_RECORD") {
    return "Clinical authorization review is removed, but the workflow still creates the notification record downstream claims processing expects.";
  }

  if (disposition === "PA_WAIVED") {
    return "Plan policy requires prior authorization, but an applicable provider qualification waives clinical review. No advance-notification record is required in this scenario.";
  }

  if (disposition === "PA_REQUIRED") {
    return "The request follows a clinical authorization path and must create a prior-authorization record for downstream use.";
  }

  return "The effective procedure policy does not require a clinical authorization path for this scenario.";
}

function reviewRouteLabel(route: ReviewRoute) {
  return {
    plan_um: "Plan utilization management",
    delegated_specialty: "Delegated specialty review",
    no_clinical_review: "No clinical review route",
    resolve_inputs: "Operational exception queue",
  }[route];
}

function claimsArtifactLabel(artifact: ClaimsArtifact) {
  return {
    PRIOR_AUTHORIZATION_RECORD: "Prior-authorization record",
    ADVANCE_NOTIFICATION_RECORD: "Advance-notification record",
    NO_AUTHORIZATION_ARTIFACT: "No authorization artifact required",
    NOT_DETERMINED: "Not determined until source conflict is resolved",
  }[artifact];
}

function lineOfBusinessLabel(lineOfBusiness: LineOfBusiness) {
  return {
    commercial: "Commercial",
    medicare_advantage: "Medicare Advantage",
    medicaid: "Medicaid",
  }[lineOfBusiness];
}

function qualificationLabel(qualification: ProgramQualification) {
  return {
    none: "No provider-program qualification",
    performance_waiver: "Performance-based waiver qualification",
    rural_access: "Rural access qualification",
  }[qualification];
}

function providerProgramFinding(input: AuthorizationAssessmentInput) {
  if (input.qualification === "none") return "No provider-program qualification is present.";
  if (!input.qualificationActive) return "The provider qualification is not active for the service date.";
  if (!input.providerTinMatches) return "The submitted provider TIN does not match the qualified entity.";
  if (!input.programIncludesService) return "The provider program does not include this service.";
  return "The qualification cannot be applied.";
}
