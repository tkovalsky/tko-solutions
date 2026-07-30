-- CreateEnum
CREATE TYPE "OiOpportunityStatus" AS ENUM ('reviewing', 'qualified', 'paused', 'closed');

-- CreateEnum
CREATE TYPE "OiSourceType" AS ENUM ('pasted_text', 'job_posting', 'company_announcement', 'referral', 'regulatory_event', 'other');

-- CreateEnum
CREATE TYPE "OiFactBasis" AS ENUM ('stated', 'inferred', 'operator');

-- CreateEnum
CREATE TYPE "OiResearchGapStatus" AS ENUM ('open', 'resolved', 'dismissed');

-- CreateTable
CREATE TABLE "OiOpportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "OiOpportunityStatus" NOT NULL DEFAULT 'reviewing',
    "operatorThesis" TEXT,
    "thesisBasis" "OiFactBasis",
    "organizationId" TEXT NOT NULL,
    "currentScoreId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiSource" (
    "id" TEXT NOT NULL,
    "sourceType" "OiSourceType" NOT NULL,
    "canonicalUrl" TEXT,
    "rawContent" TEXT NOT NULL,
    "normalizedContent" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "retrievedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "organizationId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiEvidence" (
    "id" TEXT NOT NULL,
    "startOffset" INTEGER NOT NULL,
    "endOffset" INTEGER NOT NULL,
    "excerpt" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiOpportunityFact" (
    "id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "normalizedValue" TEXT NOT NULL,
    "ordinal" INTEGER NOT NULL DEFAULT 0,
    "basis" "OiFactBasis" NOT NULL,
    "confidence" INTEGER NOT NULL,
    "isOperatorOverride" BOOLEAN NOT NULL DEFAULT false,
    "opportunityId" TEXT NOT NULL,
    "evidenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiOpportunityFact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiResearchGap" (
    "id" TEXT NOT NULL,
    "gapKey" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "OiResearchGapStatus" NOT NULL DEFAULT 'open',
    "resolution" TEXT,
    "operatorNotes" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OiResearchGap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OiOpportunityScore" (
    "id" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "completeness" INTEGER NOT NULL,
    "components" JSONB NOT NULL,
    "inputSnapshot" JSONB NOT NULL,
    "scorePolicyVersion" TEXT NOT NULL,
    "capabilityProfileVersion" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OiOpportunityScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OiOpportunity_currentScoreId_key" ON "OiOpportunity"("currentScoreId");

-- CreateIndex
CREATE INDEX "OiOpportunity_organizationId_status_idx" ON "OiOpportunity"("organizationId", "status");

-- CreateIndex
CREATE INDEX "OiOpportunity_createdAt_idx" ON "OiOpportunity"("createdAt");

-- CreateIndex
CREATE INDEX "OiSource_canonicalUrl_idx" ON "OiSource"("canonicalUrl");

-- CreateIndex
CREATE INDEX "OiSource_opportunityId_retrievedAt_idx" ON "OiSource"("opportunityId", "retrievedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OiSource_organizationId_contentHash_key" ON "OiSource"("organizationId", "contentHash");

-- CreateIndex
CREATE UNIQUE INDEX "OiSource_canonicalUrl_contentHash_key" ON "OiSource"("canonicalUrl", "contentHash");

-- CreateIndex
CREATE INDEX "OiEvidence_opportunityId_idx" ON "OiEvidence"("opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "OiEvidence_sourceId_startOffset_endOffset_key" ON "OiEvidence"("sourceId", "startOffset", "endOffset");

-- CreateIndex
CREATE INDEX "OiOpportunityFact_opportunityId_field_ordinal_idx" ON "OiOpportunityFact"("opportunityId", "field", "ordinal");

-- CreateIndex
CREATE INDEX "OiOpportunityFact_evidenceId_idx" ON "OiOpportunityFact"("evidenceId");

-- CreateIndex
CREATE UNIQUE INDEX "OiOpportunityFact_opportunityId_field_normalizedValue_basis_key" ON "OiOpportunityFact"("opportunityId", "field", "normalizedValue", "basis");

-- CreateIndex
CREATE INDEX "OiResearchGap_status_createdAt_idx" ON "OiResearchGap"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "OiResearchGap_opportunityId_gapKey_key" ON "OiResearchGap"("opportunityId", "gapKey");

-- CreateIndex
CREATE INDEX "OiOpportunityScore_opportunityId_createdAt_idx" ON "OiOpportunityScore"("opportunityId", "createdAt");

-- CreateIndex
CREATE INDEX "OiOpportunityScore_total_idx" ON "OiOpportunityScore"("total");

-- AddForeignKey
ALTER TABLE "OiOpportunity" ADD CONSTRAINT "OiOpportunity_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OiOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunity" ADD CONSTRAINT "OiOpportunity_currentScoreId_fkey" FOREIGN KEY ("currentScoreId") REFERENCES "OiOpportunityScore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiSource" ADD CONSTRAINT "OiSource_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OiOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiSource" ADD CONSTRAINT "OiSource_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiEvidence" ADD CONSTRAINT "OiEvidence_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiEvidence" ADD CONSTRAINT "OiEvidence_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "OiSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunityFact" ADD CONSTRAINT "OiOpportunityFact_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunityFact" ADD CONSTRAINT "OiOpportunityFact_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "OiEvidence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiResearchGap" ADD CONSTRAINT "OiResearchGap_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OiOpportunityScore" ADD CONSTRAINT "OiOpportunityScore_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "OiOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
