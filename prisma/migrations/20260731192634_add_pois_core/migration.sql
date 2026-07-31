/*
  Warnings:

*/
-- CreateEnum
CREATE TYPE "OiOpportunityType" AS ENUM ('fte', 'consulting', 'fractional', 'assessment', 'partnership', 'rfp');

-- CreateEnum
CREATE TYPE "OiSignalTier" AS ENUM ('tier_1', 'tier_2', 'tier_3');

-- CreateEnum
CREATE TYPE "OiSignalType" AS ENUM ('senior_role_posting', 'domain_role_posting', 'rfp_published', 'leadership_appointment', 'leadership_departure', 'concentrated_hiring', 'stated_operational_problem', 'transformation_announcement', 'stalled_program', 'acquisition_merger', 'funding_round', 'vendor_selection', 'earnings_statement', 'regulatory_deadline', 'technology_modernization', 'partnership_announcement', 'conference_presentation', 'partner_change', 'general_news', 'operator_note', 'referral');

-- CreateEnum
CREATE TYPE "OiSignalStatus" AS ENUM ('captured', 'classified', 'promoted', 'watched', 'dismissed');

-- CreateEnum
CREATE TYPE "OiInitiativeStatus" AS ENUM ('hypothesized', 'evidenced', 'active', 'delayed', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "OiInitiativeCategory" AS ENUM ('prior_authorization', 'utilization_management', 'interoperability', 'workflow_modernization', 'care_management', 'claims_operations', 'program_recovery', 'ai_adoption', 'operating_model', 'regulatory_compliance', 'post_merger_integration', 'platform_implementation', 'other');

-- CreateEnum
CREATE TYPE "OiStakeholderRole" AS ENUM ('economic_buyer', 'executive_sponsor', 'operational_owner', 'technical_owner', 'hiring_manager', 'recruiter', 'champion', 'influencer', 'procurement', 'partner', 'blocker', 'unknown');

-- CreateEnum
CREATE TYPE "OiAuthorityLevel" AS ENUM ('none', 'low', 'medium', 'high', 'unknown');

-- CreateEnum
CREATE TYPE "OiRelationshipType" AS ENUM ('cold', 'warm_referral', 'warm_history', 'existing_client');

-- CreateEnum
CREATE TYPE "OiContactPointType" AS ENUM ('email', 'phone', 'linkedin', 'other');

-- CreateEnum
CREATE TYPE "OiContactProvenance" AS ENUM ('pattern_inferred', 'provider_discovered', 'publicly_listed', 'directly_provided', 'verified_deliverable');

-- CreateEnum
CREATE TYPE "OiContactStatus" AS ENUM ('active', 'bounced', 'invalid', 'opted_out', 'replaced');

-- CreateEnum
CREATE TYPE "OiNextActionType" AS ENUM ('approve_initiative', 'close_research_gap', 'identify_stakeholder', 'select_stakeholder', 'select_offer', 'complete_role_profile', 'prepare_outreach', 'review_draft', 'send_outreach', 'submit_application', 'follow_up', 'log_conversation', 'bid_no_bid_decision', 'find_partner', 'send_proposal', 'review_stale', 'record_outcome');

-- CreateEnum
CREATE TYPE "OiNextActionStatus" AS ENUM ('open', 'completed', 'snoozed', 'cancelled');

-- CreateEnum
CREATE TYPE "OiActivityType" AS ENUM ('outreach_sent', 'application_submitted', 'reply_received', 'no_reply', 'call_scheduled', 'call_completed', 'conversation', 'intro_requested', 'intro_received', 'referral_made', 'interview', 'proposal_sent', 'assessment_delivered', 'status_change', 'note', 'correction');

-- CreateEnum
CREATE TYPE "OiActivitySentiment" AS ENUM ('positive', 'neutral', 'deflecting', 'rejection', 'unknown');

-- CreateEnum
CREATE TYPE "OiOutreachChannel" AS ENUM ('email', 'linkedin_dm', 'application_note', 'intro_request', 'call_script', 'follow_up');

-- CreateEnum
CREATE TYPE "OiDraftStatus" AS ENUM ('draft', 'operator_review', 'approved_for_manual_use', 'changes_requested', 'discarded');

-- CreateEnum
CREATE TYPE "OiOutcomeType" AS ENUM ('engagement_won', 'role_accepted', 'proposal_declined', 'role_rejected', 'no_response', 'disqualified', 'withdrawn', 'expired');

-- CreateEnum
CREATE TYPE "OiOfferKind" AS ENUM ('assessment', 'diagnostic', 'recovery', 'build', 'fractional', 'workshop', 'subcontract');

-- CreateEnum
CREATE TYPE "OiBidDecision" AS ENUM ('undecided', 'bid_prime', 'bid_sub', 'no_bid');

-- CreateEnum
CREATE TYPE "OiDecisionType" AS ENUM ('promote_signal', 'dismiss_signal', 'qualify_opportunity', 'disqualify_opportunity', 'select_stakeholder', 'select_offer', 'select_playbook', 'approve_artifact', 'send_outreach', 'submit_application', 'bid_no_bid', 'send_proposal', 'pause_opportunity', 'close_opportunity');

-- CreateEnum
CREATE TYPE "OiDecisionConfidence" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "OiPlaybookScope" AS ENUM ('healthcare_executive', 'job_application', 'consulting_assessment', 'warm_referral', 'cold_outreach', 'partnership', 'program_recovery');

-- CreateEnum
CREATE TYPE "OiArtifactKind" AS ENUM ('executive_brief', 'research_summary', 'email_draft', 'linkedin_draft', 'talking_points', 'meeting_prep', 'proposal_outline', 'intro_request', 'application_note', 'follow_up_draft');

-- CreateEnum
CREATE TYPE "OiArtifactStatus" AS ENUM ('draft', 'operator_review', 'approved_for_manual_use', 'changes_requested', 'discarded');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OiOpportunityStatus" ADD VALUE 'identified';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'qualifying';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'researching';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'dismissed';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'outreach_ready';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'contacted';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'conversation';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'nurturing';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'diagnostic_scoped';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'proposal_sent';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'capability_shared';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'agreement_discussion';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'application_ready';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'applied';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'recruiter_screen';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'hiring_manager';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'interview_loop';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'offer';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'no_response';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'rfp_intake';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'seeking_partner';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'bid_as_prime';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'bid_as_sub';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'no_bid';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'submitted';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'shortlisted';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'won';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'accepted';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'lost';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'declined';
ALTER TYPE "OiOpportunityStatus" ADD VALUE 'rejected';

-- DropForeignKey
ALTER TABLE "OiSource" DROP CONSTRAINT "OiSource_opportunityId_fkey";

-- DropIndex
DROP INDEX IF EXISTS "OiPursuit_personId_mode_key";

-- AlterTable
ALTER TABLE "OiEvidence" ADD COLUMN     "initiativeId" TEXT,
ALTER COLUMN "opportunityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OiOpportunity" ADD COLUMN     "closedReason" TEXT,
ADD COLUMN     "conversionProbability" INTEGER,
ADD COLUMN     "disqualifiedReason" TEXT,
ADD COLUMN     "estimatedHours" DECIMAL(6,2),
ADD COLUMN     "estimatedValueHigh" INTEGER,
ADD COLUMN     "estimatedValueLow" INTEGER,
ADD COLUMN     "firstSignalAt" TIMESTAMP(3),
ADD COLUMN     "initiativeId" TEXT,
ADD COLUMN     "lastActivityAt" TIMESTAMP(3),
ADD COLUMN     "offerId" TEXT,
ADD COLUMN     "playbookId" TEXT,
ADD COLUMN     "type" "OiOpportunityType",
ADD COLUMN     "valueApprovedAt" TIMESTAMP(3),
ADD COLUMN     "valueBasis" TEXT;

UPDATE "OiOpportunity" SET "type" = 'consulting' WHERE "type" IS NULL;

ALTER TABLE "OiOpportunity" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "OiOpportunityFact" ADD COLUMN     "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "aiModel" TEXT,
ADD COLUMN     "initiativeId" TEXT,
ADD COLUMN     "personId" TEXT,
ADD COLUMN     "promptVersion" TEXT,
ALTER COLUMN "opportunityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OiOpportunityScore" ADD COLUMN     "accessScore" INTEGER,
ADD COLUMN     "conversionProbability" INTEGER,
ADD COLUMN     "disqualifyingRules" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "estimatedHours" DECIMAL(6,2),
ADD COLUMN     "estimatedValue" INTEGER,
ADD COLUMN     "evidenceScore" INTEGER,
ADD COLUMN     "expectedValue" INTEGER,
ADD COLUMN     "fitScore" INTEGER,
ADD COLUMN     "isDisqualified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priorityEfficiency" DECIMAL(12,2),
ADD COLUMN     "urgencyScore" INTEGER;

-- Backfill required score components for existing immutable score snapshots.
-- The historical total is preserved; new component slots start neutral.
UPDATE "OiOpportunityScore"
SET
  "accessScore" = 0,
  "evidenceScore" = 0,
  "fitScore" = 0,
  "urgencyScore" = 0
WHERE
  "accessScore" IS NULL
  OR "evidenceScore" IS NULL
  OR "fitScore" IS NULL
  OR "urgencyScore" IS NULL;

ALTER TABLE "OiOpportunityScore"
ALTER COLUMN "accessScore" SET NOT NULL,
ALTER COLUMN "evidenceScore" SET NOT NULL,
ALTER COLUMN "fitScore" SET NOT NULL,
ALTER COLUMN "urgencyScore" SET NOT NULL;

-- AlterTable
ALTER TABLE "OiOrganization" ADD COLUMN     "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "headquarters" TEXT,
ADD COLUMN     "isWatched" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sizeBand" TEXT,
ADD COLUMN     "tier" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "OiPerson" ADD COLUMN     "doNotContact" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "linkedinUrl" TEXT;

-- AlterTable
ALTER TABLE "OiPursuit" ADD COLUMN     "opportunityId" TEXT;

-- AlterTable
ALTER TABLE "OiResearchGap" ADD COLUMN     "blocksOutreach" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "initiativeId" TEXT,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "suggestedSources" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "opportunityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OiSource" ALTER COLUMN "opportunityId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OiSignal" (
    "id" TEXT NOT NULL,
    "tier" "OiSignalTier" NOT NULL,
    "signalType" "OiSignalType" NOT NULL,
    "status" "OiSignalStatus" NOT NULL DEFAULT 'captured',
    "summary" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3),
    "confidence" INTEGER NOT NULL DEFAULT 50,
    "domainTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dismissedReason" TEXT,
    "dismissedAt" TIMESTAMP(3),
    "sourceId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiInitiative" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "OiInitiativeStatus" NOT NULL DEFAULT 'hypothesized',
    "category" "OiInitiativeCategory" NOT NULL,
    "hypothesis" TEXT NOT NULL,
    "hypothesisBasis" "OiFactBasis" NOT NULL DEFAULT 'inferred',
    "confidence" INTEGER NOT NULL DEFAULT 45,
    "domainTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "likelyOwnerRoles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "estimatedStartAt" TIMESTAMP(3),
    "urgencyBasis" TEXT,
    "lastEvidenceAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "aiModel" TEXT,
    "promptVersion" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiInitiative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiInitiativeSignal" (
    "initiativeId" TEXT NOT NULL,
    "signalId" TEXT NOT NULL,
    "contribution" TEXT,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "addedBy" TEXT NOT NULL DEFAULT 'system',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiInitiativeSignal_pkey" PRIMARY KEY ("initiativeId","signalId")
);

-- CreateTable
CREATE TABLE "OiOpportunitySource" (
    "opportunityId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiOpportunitySource_pkey" PRIMARY KEY ("opportunityId","sourceId")
);

INSERT INTO "OiOpportunitySource" ("opportunityId","sourceId","isPrimary","createdAt")
SELECT "opportunityId","id",TRUE,"createdAt" FROM "OiSource"
WHERE "opportunityId" IS NOT NULL ON CONFLICT DO NOTHING;

-- CreateTable
CREATE TABLE "OiStakeholder" (
    "id" TEXT NOT NULL,
    "role" "OiStakeholderRole" NOT NULL DEFAULT 'unknown',
    "authority" "OiAuthorityLevel" NOT NULL DEFAULT 'unknown',
    "relationshipType" "OiRelationshipType" NOT NULL DEFAULT 'cold',
    "warmPathNotes" TEXT,
    "referralSourceName" TEXT,
    "likelyMotivation" TEXT,
    "likelyObjection" TEXT,
    "relevanceToTodd" TEXT,
    "roleEvidenceUrl" TEXT,
    "roleEvidenceLabel" TEXT,
    "roleConfidence" INTEGER NOT NULL DEFAULT 50,
    "roleVerifiedAt" TIMESTAMP(3),
    "accessScore" INTEGER,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "selectedAt" TIMESTAMP(3),
    "opportunityId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiStakeholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiContactPoint" (
    "id" TEXT NOT NULL,
    "type" "OiContactPointType" NOT NULL,
    "value" TEXT NOT NULL,
    "provenance" "OiContactProvenance" NOT NULL,
    "status" "OiContactStatus" NOT NULL DEFAULT 'active',
    "sourceLabel" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "personId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiContactPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiNextAction" (
    "id" TEXT NOT NULL,
    "type" "OiNextActionType" NOT NULL,
    "status" "OiNextActionStatus" NOT NULL DEFAULT 'open',
    "description" TEXT NOT NULL,
    "rationale" TEXT,
    "estimatedMinutes" INTEGER NOT NULL DEFAULT 15,
    "dueAt" TIMESTAMP(3),
    "snoozedUntil" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "completedNote" TEXT,
    "isSystemGenerated" BOOLEAN NOT NULL DEFAULT true,
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiNextAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiActivity" (
    "id" TEXT NOT NULL,
    "type" "OiActivityType" NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "sentiment" "OiActivitySentiment" NOT NULL DEFAULT 'unknown',
    "channel" "OiOutreachChannel",
    "externalRef" TEXT,
    "outcomeNote" TEXT,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "reason" TEXT,
    "correctsActivityId" TEXT,
    "opportunityId" TEXT NOT NULL,
    "stakeholderId" TEXT,
    "artifactId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiRoleProfile" (
    "id" TEXT NOT NULL,
    "compMin" INTEGER,
    "compMax" INTEGER,
    "compCurrency" TEXT NOT NULL DEFAULT 'USD',
    "compSource" TEXT,
    "meetsCompFloor" BOOLEAN NOT NULL DEFAULT false,
    "totalCompEstimate" INTEGER,
    "isRemote" BOOLEAN,
    "location" TEXT,
    "travelPercent" INTEGER,
    "remoteCompatible" BOOLEAN NOT NULL DEFAULT true,
    "reportsToTitle" TEXT,
    "teamSize" TEXT,
    "scopeNotes" TEXT,
    "seniorityBand" TEXT,
    "applicationUrl" TEXT,
    "requisitionId" TEXT,
    "postedAt" TIMESTAMP(3),
    "closesAt" TIMESTAMP(3),
    "postingLastCheckedAt" TIMESTAMP(3),
    "postingIsOpen" BOOLEAN NOT NULL DEFAULT true,
    "resumeVariant" TEXT,
    "applicationNote" TEXT,
    "appliedAt" TIMESTAMP(3),
    "currentStage" TEXT,
    "nextInterviewAt" TIMESTAMP(3),
    "offerAmount" INTEGER,
    "offerReceivedAt" TIMESTAMP(3),
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiRoleProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiOutcome" (
    "id" TEXT NOT NULL,
    "type" "OiOutcomeType" NOT NULL,
    "proposedValue" INTEGER,
    "actualValue" INTEGER,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "monthlyValue" INTEGER,
    "contractStartAt" TIMESTAMP(3),
    "contractEndAt" TIMESTAMP(3),
    "closeReason" TEXT NOT NULL,
    "lesson" TEXT,
    "daysFromFirstSignal" INTEGER,
    "daysFromFirstOutreach" INTEGER,
    "originatingSignalType" "OiSignalType",
    "scorePolicyVersion" TEXT,
    "scoreAtClose" INTEGER,
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiOffer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "OiOfferKind" NOT NULL,
    "description" TEXT NOT NULL,
    "valueLow" INTEGER NOT NULL,
    "valueHigh" INTEGER NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "typicalWeeks" INTEGER,
    "domainTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "problemTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publicUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "idealBuyer" TEXT,
    "problemSolved" TEXT,
    "deliverables" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "typicalObjections" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "proofItemIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "positioningNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiProofItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "publicUrl" TEXT,
    "internalRef" TEXT,
    "domainTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "problemTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isApprovedForOutreach" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiProofItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiOpportunityProof" (
    "opportunityId" TEXT NOT NULL,
    "proofItemId" TEXT NOT NULL,
    "matchScore" INTEGER,
    "relevanceReason" TEXT,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiOpportunityProof_pkey" PRIMARY KEY ("opportunityId","proofItemId")
);

-- CreateTable
CREATE TABLE "OiDecision" (
    "id" TEXT NOT NULL,
    "type" "OiDecisionType" NOT NULL,
    "decision" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "confidence" "OiDecisionConfidence" NOT NULL,
    "expectedValue" INTEGER,
    "expectedEffortHours" DECIMAL(6,2),
    "expectedProbability" INTEGER,
    "expectedOutcome" TEXT,
    "scoreIdAtDecision" TEXT,
    "actualOutcome" TEXT,
    "actualValue" INTEGER,
    "actualEffortHours" DECIMAL(6,2),
    "lessonsLearned" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "valueDelta" INTEGER,
    "effortDelta" DECIMAL(6,2),
    "wasCorrect" BOOLEAN,
    "opportunityId" TEXT,
    "signalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiCampaign" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thesis" TEXT NOT NULL,
    "domainTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "targetAccountNames" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiCampaignOpportunity" (
    "campaignId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "addedBy" TEXT NOT NULL DEFAULT 'operator',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiCampaignOpportunity_pkey" PRIMARY KEY ("campaignId","opportunityId")
);

-- CreateTable
CREATE TABLE "OiPlaybook" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scope" "OiPlaybookScope" NOT NULL,
    "appliesToTypes" "OiOpportunityType"[] DEFAULT ARRAY[]::"OiOpportunityType"[],
    "appliesToRelationships" "OiRelationshipType"[] DEFAULT ARRAY[]::"OiRelationshipType"[],
    "domainTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "researchSteps" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "decisionPoints" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "proofGuidance" TEXT,
    "offerGuidance" TEXT,
    "draftGuidance" TEXT,
    "followUpRhythmDays" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "commonObjections" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiPlaybook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiArtifact" (
    "id" TEXT NOT NULL,
    "kind" "OiArtifactKind" NOT NULL,
    "status" "OiArtifactStatus" NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "aiModel" TEXT,
    "promptVersion" TEXT,
    "contextSnapshot" JSONB NOT NULL,
    "citedEvidenceIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "citedProofIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "unsupportedClaims" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "validationPassed" BOOLEAN NOT NULL DEFAULT false,
    "approvedAt" TIMESTAMP(3),
    "operatorEditedAt" TIMESTAMP(3),
    "opportunityId" TEXT NOT NULL,
    "stakeholderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiWeeklyReview" (
    "id" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "metrics" JSONB NOT NULL,
    "whatChanged" TEXT,
    "whatStalled" TEXT,
    "wrongPredictions" TEXT,
    "timeSpentNotes" TEXT,
    "lessons" TEXT,
    "nextWeekFocus" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiWeeklyReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OiSignal_organizationId_tier_status_idx" ON "OiSignal"("organizationId", "tier", "status");

-- CreateIndex
CREATE INDEX "OiSignal_status_createdAt_idx" ON "OiSignal"("status", "createdAt");

-- CreateIndex
CREATE INDEX "OiSignal_occurredAt_idx" ON "OiSignal"("occurredAt");

-- CreateIndex
CREATE INDEX "OiInitiative_organizationId_status_idx" ON "OiInitiative"("organizationId", "status");

-- CreateIndex
CREATE INDEX "OiInitiative_status_confidence_idx" ON "OiInitiative"("status", "confidence");

-- CreateIndex
CREATE INDEX "OiInitiative_category_idx" ON "OiInitiative"("category");

-- CreateIndex
CREATE INDEX "OiInitiative_lastEvidenceAt_idx" ON "OiInitiative"("lastEvidenceAt");

-- CreateIndex
CREATE INDEX "OiInitiativeSignal_signalId_idx" ON "OiInitiativeSignal"("signalId");

-- CreateIndex
CREATE INDEX "OiOpportunitySource_sourceId_idx" ON "OiOpportunitySource"("sourceId");

-- CreateIndex
CREATE INDEX "OiStakeholder_opportunityId_isSelected_idx" ON "OiStakeholder"("opportunityId", "isSelected");

-- CreateIndex
CREATE INDEX "OiStakeholder_personId_idx" ON "OiStakeholder"("personId");

-- CreateIndex
CREATE INDEX "OiStakeholder_role_idx" ON "OiStakeholder"("role");

-- CreateIndex
CREATE UNIQUE INDEX "OiStakeholder_opportunityId_personId_key" ON "OiStakeholder"("opportunityId", "personId");

-- CreateIndex
CREATE INDEX "OiContactPoint_personId_status_idx" ON "OiContactPoint"("personId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "OiContactPoint_personId_type_value_key" ON "OiContactPoint"("personId", "type", "value");

-- CreateIndex
CREATE INDEX "OiNextAction_status_dueAt_idx" ON "OiNextAction"("status", "dueAt");

-- CreateIndex
CREATE INDEX "OiNextAction_opportunityId_status_idx" ON "OiNextAction"("opportunityId", "status");

-- CreateIndex
CREATE INDEX "OiActivity_opportunityId_occurredAt_idx" ON "OiActivity"("opportunityId", "occurredAt");

-- CreateIndex
CREATE INDEX "OiActivity_type_occurredAt_idx" ON "OiActivity"("type", "occurredAt");

-- CreateIndex
CREATE INDEX "OiActivity_stakeholderId_idx" ON "OiActivity"("stakeholderId");

-- CreateIndex
CREATE INDEX "OiActivity_artifactId_idx" ON "OiActivity"("artifactId");

-- CreateIndex
CREATE UNIQUE INDEX "OiRoleProfile_opportunityId_key" ON "OiRoleProfile"("opportunityId");

-- CreateIndex
CREATE INDEX "OiRoleProfile_meetsCompFloor_idx" ON "OiRoleProfile"("meetsCompFloor");

-- CreateIndex
CREATE INDEX "OiRoleProfile_closesAt_idx" ON "OiRoleProfile"("closesAt");

-- CreateIndex
CREATE UNIQUE INDEX "OiOutcome_opportunityId_key" ON "OiOutcome"("opportunityId");

-- CreateIndex
CREATE INDEX "OiOutcome_type_createdAt_idx" ON "OiOutcome"("type", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "OiOffer_slug_key" ON "OiOffer"("slug");

-- CreateIndex
CREATE INDEX "OiOffer_kind_isActive_idx" ON "OiOffer"("kind", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "OiProofItem_slug_key" ON "OiProofItem"("slug");

-- CreateIndex
CREATE INDEX "OiProofItem_kind_isApprovedForOutreach_idx" ON "OiProofItem"("kind", "isApprovedForOutreach");

-- CreateIndex
CREATE INDEX "OiOpportunityProof_proofItemId_idx" ON "OiOpportunityProof"("proofItemId");

-- CreateIndex
CREATE INDEX "OiDecision_type_createdAt_idx" ON "OiDecision"("type", "createdAt");

-- CreateIndex
CREATE INDEX "OiDecision_opportunityId_createdAt_idx" ON "OiDecision"("opportunityId", "createdAt");

-- CreateIndex
CREATE INDEX "OiDecision_resolvedAt_idx" ON "OiDecision"("resolvedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OiCampaign_slug_key" ON "OiCampaign"("slug");

-- CreateIndex
CREATE INDEX "OiCampaign_isActive_idx" ON "OiCampaign"("isActive");

-- CreateIndex
CREATE INDEX "OiCampaignOpportunity_opportunityId_idx" ON "OiCampaignOpportunity"("opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "OiPlaybook_slug_key" ON "OiPlaybook"("slug");

-- CreateIndex
CREATE INDEX "OiPlaybook_scope_isActive_idx" ON "OiPlaybook"("scope", "isActive");

-- CreateIndex
CREATE INDEX "OiArtifact_opportunityId_kind_status_idx" ON "OiArtifact"("opportunityId", "kind", "status");

-- CreateIndex
CREATE UNIQUE INDEX "OiArtifact_opportunityId_kind_stakeholderId_version_key" ON "OiArtifact"("opportunityId", "kind", "stakeholderId", "version");

-- CreateIndex
CREATE INDEX "OiWeeklyReview_completedAt_idx" ON "OiWeeklyReview"("completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OiWeeklyReview_periodStart_periodEnd_key" ON "OiWeeklyReview"("periodStart", "periodEnd");

-- CreateIndex
CREATE INDEX "OiEvidence_initiativeId_idx" ON "OiEvidence"("initiativeId");

-- CreateIndex
CREATE INDEX "OiOpportunity_type_status_idx" ON "OiOpportunity"("type", "status");

-- CreateIndex
CREATE INDEX "OiOpportunity_initiativeId_idx" ON "OiOpportunity"("initiativeId");

-- CreateIndex
CREATE INDEX "OiOpportunity_playbookId_idx" ON "OiOpportunity"("playbookId");

-- CreateIndex
CREATE INDEX "OiOpportunity_lastActivityAt_idx" ON "OiOpportunity"("lastActivityAt");

-- CreateIndex
CREATE INDEX "OiOpportunityFact_initiativeId_field_ordinal_idx" ON "OiOpportunityFact"("initiativeId", "field", "ordinal");

-- CreateIndex
CREATE INDEX "OiOpportunityFact_personId_field_ordinal_idx" ON "OiOpportunityFact"("personId", "field", "ordinal");

-- CreateIndex
CREATE INDEX "OiOpportunityScore_priorityEfficiency_idx" ON "OiOpportunityScore"("priorityEfficiency");

-- CreateIndex
CREATE INDEX "OiOrganization_domain_idx" ON "OiOrganization"("domain");

-- CreateIndex
CREATE INDEX "OiOrganization_isWatched_idx" ON "OiOrganization"("isWatched");

-- CreateIndex
CREATE INDEX "OiPerson_doNotContact_idx" ON "OiPerson"("doNotContact");

-- CreateIndex
CREATE INDEX "OiPursuit_opportunityId_idx" ON "OiPursuit"("opportunityId");

-- CreateIndex
CREATE INDEX "OiResearchGap_initiativeId_status_idx" ON "OiResearchGap"("initiativeId", "status");

-- CreateIndex
CREATE INDEX "OiResearchGap_blocksOutreach_status_idx" ON "OiResearchGap"("blocksOutreach", "status");

-- CreateIndex
CREATE INDEX "OiSource_retrievedAt_idx" ON "OiSource"("retrievedAt");

-- Exactly one open next action per opportunity.
CREATE UNIQUE INDEX "OiNextAction_one_open_per_opportunity"
  ON "OiNextAction" ("opportunityId") WHERE "status" = 'open';

-- At most one selected stakeholder per opportunity.
CREATE UNIQUE INDEX "OiStakeholder_one_selected_per_opportunity"
  ON "OiStakeholder" ("opportunityId") WHERE "isSelected";

-- Facts, evidence, and gaps must each have exactly one parent.
ALTER TABLE "OiOpportunityFact" ADD CONSTRAINT "fact_has_parent"
  CHECK (num_nonnulls("opportunityId", "initiativeId", "personId") = 1);

ALTER TABLE "OiEvidence" ADD CONSTRAINT "evidence_has_parent"
  CHECK (num_nonnulls("opportunityId", "initiativeId") = 1);

ALTER TABLE "OiResearchGap" ADD CONSTRAINT "gap_has_parent"
  CHECK (num_nonnulls("opportunityId", "initiativeId") = 1);

-- Value band sanity.
ALTER TABLE "OiOpportunity" ADD CONSTRAINT "value_band_ordered"
  CHECK ("estimatedValueLow" IS NULL OR "estimatedValueHigh" IS NULL
         OR "estimatedValueLow" <= "estimatedValueHigh");

-- AddForeignKey
ALTER TABLE "OiPursuit" ADD CONSTRAINT "OiPursuit_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunity" ADD CONSTRAINT "OiOpportunity_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "OiInitiative"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunity" ADD CONSTRAINT "OiOpportunity_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "OiOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunity" ADD CONSTRAINT "OiOpportunity_playbookId_fkey" FOREIGN KEY ("playbookId") REFERENCES "OiPlaybook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiSource" ADD CONSTRAINT "OiSource_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiEvidence" ADD CONSTRAINT "OiEvidence_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "OiInitiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunityFact" ADD CONSTRAINT "OiOpportunityFact_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "OiInitiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunityFact" ADD CONSTRAINT "OiOpportunityFact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "OiPerson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiResearchGap" ADD CONSTRAINT "OiResearchGap_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "OiInitiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiSignal" ADD CONSTRAINT "OiSignal_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "OiSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiSignal" ADD CONSTRAINT "OiSignal_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OiOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiInitiative" ADD CONSTRAINT "OiInitiative_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OiOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiInitiativeSignal" ADD CONSTRAINT "OiInitiativeSignal_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "OiInitiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiInitiativeSignal" ADD CONSTRAINT "OiInitiativeSignal_signalId_fkey" FOREIGN KEY ("signalId") REFERENCES "OiSignal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunitySource" ADD CONSTRAINT "OiOpportunitySource_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunitySource" ADD CONSTRAINT "OiOpportunitySource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "OiSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiStakeholder" ADD CONSTRAINT "OiStakeholder_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiStakeholder" ADD CONSTRAINT "OiStakeholder_personId_fkey" FOREIGN KEY ("personId") REFERENCES "OiPerson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiContactPoint" ADD CONSTRAINT "OiContactPoint_personId_fkey" FOREIGN KEY ("personId") REFERENCES "OiPerson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiNextAction" ADD CONSTRAINT "OiNextAction_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiActivity" ADD CONSTRAINT "OiActivity_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiActivity" ADD CONSTRAINT "OiActivity_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "OiStakeholder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiActivity" ADD CONSTRAINT "OiActivity_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "OiArtifact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiRoleProfile" ADD CONSTRAINT "OiRoleProfile_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOutcome" ADD CONSTRAINT "OiOutcome_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunityProof" ADD CONSTRAINT "OiOpportunityProof_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunityProof" ADD CONSTRAINT "OiOpportunityProof_proofItemId_fkey" FOREIGN KEY ("proofItemId") REFERENCES "OiProofItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiDecision" ADD CONSTRAINT "OiDecision_scoreIdAtDecision_fkey" FOREIGN KEY ("scoreIdAtDecision") REFERENCES "OiOpportunityScore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiDecision" ADD CONSTRAINT "OiDecision_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiDecision" ADD CONSTRAINT "OiDecision_signalId_fkey" FOREIGN KEY ("signalId") REFERENCES "OiSignal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiCampaignOpportunity" ADD CONSTRAINT "OiCampaignOpportunity_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "OiCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiCampaignOpportunity" ADD CONSTRAINT "OiCampaignOpportunity_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiArtifact" ADD CONSTRAINT "OiArtifact_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiArtifact" ADD CONSTRAINT "OiArtifact_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "OiStakeholder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
