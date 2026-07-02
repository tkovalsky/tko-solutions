import type { Prisma } from "@prisma/client";

export type LeadSubmissionPayload = {
  problem: string;
  systems: string;
  notWorking: string;
  aiDeployed: "yes" | "no" | "unsure";
  decision: string;
  name: string;
  email: string;
};

export type InboundLeadSubmission = {
  name?: string;
  email: string;
  company?: string;
  role?: string;
  source: string;
  landingPage: string;
  payload: Prisma.InputJsonObject;
  submittedAt: Date;
};

export type PersistedInboundLead = {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  role: string | null;
  source: string | null;
  landingPage: string | null;
  payload: Prisma.JsonValue;
  notifiedAt: Date | null;
  lastSubmittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
