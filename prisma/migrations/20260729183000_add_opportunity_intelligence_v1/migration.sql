CREATE TYPE "OiOrganizationKind" AS ENUM (
  'payer',
  'health_tech',
  'health_system',
  'consulting',
  'other'
);

CREATE TYPE "OiSeniority" AS ENUM (
  'director',
  'vice_president',
  'senior_vice_president',
  'c_suite',
  'other'
);

CREATE TYPE "OiPursuitMode" AS ENUM (
  'consulting',
  'employment',
  'both'
);

CREATE TYPE "OiPursuitStatus" AS ENUM (
  'prospect',
  'research_ready',
  'contact_ready',
  'contacted',
  'conversation',
  'paused',
  'closed'
);

CREATE TABLE "OiOrganization" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "website" TEXT,
  "kind" "OiOrganizationKind" NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "OiOrganization_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OiPerson" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "seniority" "OiSeniority" NOT NULL,
  "publicProfileUrl" TEXT,
  "sourceUrl" TEXT,
  "sourceLabel" TEXT,
  "sourcePublishedAt" TIMESTAMP(3),
  "sourceConfidence" INTEGER NOT NULL DEFAULT 0,
  "isLookalikeAnchor" BOOLEAN NOT NULL DEFAULT false,
  "domainTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "budgetAuthority" INTEGER NOT NULL DEFAULT 0,
  "hiringAuthority" INTEGER NOT NULL DEFAULT 0,
  "transformationRelevance" INTEGER NOT NULL DEFAULT 0,
  "relationshipStrength" INTEGER NOT NULL DEFAULT 0,
  "notes" TEXT,
  "organizationId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "OiPerson_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OiPursuit" (
  "id" TEXT NOT NULL,
  "mode" "OiPursuitMode" NOT NULL,
  "status" "OiPursuitStatus" NOT NULL DEFAULT 'prospect',
  "targetMonthlyValue" INTEGER NOT NULL DEFAULT 20000,
  "problemHypothesis" TEXT NOT NULL,
  "fitHypothesis" TEXT NOT NULL,
  "evidenceSummary" TEXT NOT NULL,
  "nextAction" TEXT NOT NULL,
  "professionalEmail" TEXT,
  "emailSource" TEXT,
  "emailVerifiedAt" TIMESTAMP(3),
  "doNotContact" BOOLEAN NOT NULL DEFAULT false,
  "score" INTEGER NOT NULL,
  "scoreBreakdown" JSONB NOT NULL,
  "scorePolicyVersion" TEXT NOT NULL DEFAULT 'oi-v1',
  "scoredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastContactedAt" TIMESTAMP(3),
  "nextFollowUpAt" TIMESTAMP(3),
  "personId" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "OiPursuit_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "OiOrganization_name_key" ON "OiOrganization"("name");
CREATE INDEX "OiOrganization_kind_idx" ON "OiOrganization"("kind");
CREATE UNIQUE INDEX "OiPerson_organizationId_name_title_key"
  ON "OiPerson"("organizationId", "name", "title");
CREATE INDEX "OiPerson_isLookalikeAnchor_idx" ON "OiPerson"("isLookalikeAnchor");
CREATE INDEX "OiPerson_seniority_idx" ON "OiPerson"("seniority");
CREATE UNIQUE INDEX "OiPursuit_personId_mode_key" ON "OiPursuit"("personId", "mode");
CREATE INDEX "OiPursuit_status_score_idx" ON "OiPursuit"("status", "score");
CREATE INDEX "OiPursuit_organizationId_idx" ON "OiPursuit"("organizationId");
CREATE INDEX "OiPursuit_nextFollowUpAt_idx" ON "OiPursuit"("nextFollowUpAt");

ALTER TABLE "OiPerson"
  ADD CONSTRAINT "OiPerson_organizationId_fkey"
  FOREIGN KEY ("organizationId") REFERENCES "OiOrganization"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "OiPursuit"
  ADD CONSTRAINT "OiPursuit_personId_fkey"
  FOREIGN KEY ("personId") REFERENCES "OiPerson"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "OiPursuit"
  ADD CONSTRAINT "OiPursuit_organizationId_fkey"
  FOREIGN KEY ("organizationId") REFERENCES "OiOrganization"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
