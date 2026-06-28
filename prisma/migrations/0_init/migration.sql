-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."AssetStatus" AS ENUM ('draft', 'review', 'approved', 'published');

-- CreateEnum
CREATE TYPE "public"."AssetType" AS ENUM ('article', 'landing_page', 'case_study', 'assessment', 'executive_brief', 'comparison_guide', 'intelligence_report');

-- CreateEnum
CREATE TYPE "public"."BusinessUnit" AS ENUM ('rachel', 'cre', 'tko');

-- CreateEnum
CREATE TYPE "public"."CaptureSource" AS ENUM ('conversation', 'phone_call', 'client_work', 'healthcare', 'cre', 'rachel', 'personal_observation', 'reddit', 'linkedin', 'web_research');

-- CreateEnum
CREATE TYPE "public"."CaptureStatus" AS ENUM ('inbox', 'reviewed', 'promoted', 'archived');

-- CreateTable
CREATE TABLE "public"."Asset" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assetType" "public"."AssetType" NOT NULL,
    "status" "public"."AssetStatus" NOT NULL DEFAULT 'draft',
    "businessUnit" "public"."BusinessUnit" NOT NULL,
    "outputPath" TEXT NOT NULL,
    "opportunityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AssetEvidence" (
    "assetId" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,

    CONSTRAINT "AssetEvidence_pkey" PRIMARY KEY ("assetId","evidenceId")
);

-- CreateTable
CREATE TABLE "public"."AssetOpportunity" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "businessUnit" "public"."BusinessUnit" NOT NULL,
    "assetType" "public"."AssetType" NOT NULL,
    "angle" TEXT NOT NULL,
    "audience" TEXT,
    "status" TEXT NOT NULL DEFAULT 'opportunity',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AssetOpportunityEvidence" (
    "opportunityId" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,

    CONSTRAINT "AssetOpportunityEvidence_pkey" PRIMARY KEY ("opportunityId","evidenceId")
);

-- CreateTable
CREATE TABLE "public"."CaptureItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" "public"."CaptureSource" NOT NULL,
    "status" "public"."CaptureStatus" NOT NULL DEFAULT 'inbox',
    "businessUnit" "public"."BusinessUnit",
    "promotedToEvidenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "observation" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "CaptureItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContentInventoryItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "businessUnit" "public"."BusinessUnit" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentInventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Evidence" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "businessUnit" "public"."BusinessUnit" NOT NULL,
    "observation" TEXT NOT NULL,
    "proofRef" TEXT NOT NULL,
    "claimGuard" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_slug_key" ON "public"."Asset"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "AssetOpportunity_slug_key" ON "public"."AssetOpportunity"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "CaptureItem_slug_key" ON "public"."CaptureItem"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ContentInventoryItem_slug_key" ON "public"."ContentInventoryItem"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Evidence_slug_key" ON "public"."Evidence"("slug" ASC);

-- AddForeignKey
ALTER TABLE "public"."Asset" ADD CONSTRAINT "Asset_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "public"."AssetOpportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssetEvidence" ADD CONSTRAINT "AssetEvidence_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "public"."Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssetEvidence" ADD CONSTRAINT "AssetEvidence_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "public"."Evidence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssetOpportunityEvidence" ADD CONSTRAINT "AssetOpportunityEvidence_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "public"."Evidence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssetOpportunityEvidence" ADD CONSTRAINT "AssetOpportunityEvidence_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "public"."AssetOpportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CaptureItem" ADD CONSTRAINT "CaptureItem_promotedToEvidenceId_fkey" FOREIGN KEY ("promotedToEvidenceId") REFERENCES "public"."Evidence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

