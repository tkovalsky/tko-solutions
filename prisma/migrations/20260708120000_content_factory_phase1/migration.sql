CREATE TYPE "ContentTenant" AS ENUM ('tko', 'boundos', 'rachel_delray');
CREATE TYPE "OpportunitySourceType" AS ENUM ('content_gap', 'keyword', 'title_idea', 'competitor_url', 'reddit_thread_url', 'forum_discussion', 'pasted_notes', 'pasted_transcript', 'existing_page_url', 'existing_guide');
CREATE TYPE "RevisionRequestStatus" AS ENUM ('open', 'applied', 'dismissed');
CREATE TYPE "DerivativeAssetType" AS ENUM ('linkedin_post', 'facebook_post', 'email_draft', 'ad_concept', 'summary', 'executive_brief');

ALTER TABLE "AssetOpportunity"
  ADD COLUMN "tenant" "ContentTenant" NOT NULL DEFAULT 'tko',
  ADD COLUMN "sourceType" "OpportunitySourceType" NOT NULL DEFAULT 'title_idea',
  ADD COLUMN "sourceUrl" TEXT,
  ADD COLUMN "contextNotes" TEXT;

ALTER TABLE "Asset"
  ADD COLUMN "tenant" "ContentTenant" NOT NULL DEFAULT 'tko',
  ADD COLUMN "currentVersionNumber" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "AssetVersion" (
  "id" TEXT NOT NULL,
  "assetId" TEXT NOT NULL,
  "versionNumber" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "revisionNotes" TEXT,
  "createdBy" TEXT NOT NULL DEFAULT 'operator',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "AssetVersion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RevisionRequest" (
  "id" TEXT NOT NULL,
  "assetId" TEXT NOT NULL,
  "versionNumber" INTEGER,
  "notes" TEXT NOT NULL,
  "status" "RevisionRequestStatus" NOT NULL DEFAULT 'open',
  "requestedBy" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "appliedAt" TIMESTAMP(3),

  CONSTRAINT "RevisionRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DerivativeAsset" (
  "id" TEXT NOT NULL,
  "assetId" TEXT NOT NULL,
  "type" "DerivativeAssetType" NOT NULL,
  "body" TEXT NOT NULL,
  "sourceVersionNumber" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "DerivativeAsset_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AssetVersion_assetId_versionNumber_key" ON "AssetVersion"("assetId", "versionNumber");
CREATE INDEX "AssetVersion_assetId_createdAt_idx" ON "AssetVersion"("assetId", "createdAt");
CREATE INDEX "RevisionRequest_assetId_status_idx" ON "RevisionRequest"("assetId", "status");
CREATE INDEX "DerivativeAsset_assetId_type_idx" ON "DerivativeAsset"("assetId", "type");

ALTER TABLE "AssetVersion" ADD CONSTRAINT "AssetVersion_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RevisionRequest" ADD CONSTRAINT "RevisionRequest_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DerivativeAsset" ADD CONSTRAINT "DerivativeAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
