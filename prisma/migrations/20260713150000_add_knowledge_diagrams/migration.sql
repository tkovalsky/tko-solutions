-- Knowledge Diagrams are an Asset subtype. Existing Asset status, versioning, revision,
-- evidence linkage, and derivative mechanics remain authoritative.
ALTER TYPE "AssetType" ADD VALUE IF NOT EXISTS 'knowledge_diagram';

CREATE TYPE "ClaimStatus" AS ENUM ('verified', 'owner_confirmed', 'experience_based', 'unsupported');

CREATE TYPE "KnowledgeDiagramFormat" AS ENUM (
  'architecture',
  'workflow',
  'dependency_map',
  'decision_rights_matrix',
  'heat_map',
  'timeline',
  'governance_stack',
  'operating_loop',
  'framework'
);

CREATE TABLE "KnowledgeDiagram" (
  "id" TEXT NOT NULL,
  "knowledgeId" TEXT NOT NULL,
  "assetId" TEXT NOT NULL,
  "diagramFormat" "KnowledgeDiagramFormat" NOT NULL,
  "purpose" TEXT NOT NULL,
  "executiveAudience" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "businessProblem" TEXT NOT NULL,
  "inputs" JSONB NOT NULL,
  "outputs" JSONB NOT NULL,
  "claimBoundary" TEXT NOT NULL,
  "evidenceStatus" "ClaimStatus" NOT NULL DEFAULT 'experience_based',
  "createdBy" TEXT NOT NULL DEFAULT 'operator',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "KnowledgeDiagram_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AssetDiagram" (
  "assetId" TEXT NOT NULL,
  "diagramId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "AssetDiagram_pkey" PRIMARY KEY ("assetId", "diagramId")
);

CREATE UNIQUE INDEX "KnowledgeDiagram_knowledgeId_key" ON "KnowledgeDiagram"("knowledgeId");
CREATE UNIQUE INDEX "KnowledgeDiagram_assetId_key" ON "KnowledgeDiagram"("assetId");
CREATE INDEX "KnowledgeDiagram_diagramFormat_idx" ON "KnowledgeDiagram"("diagramFormat");
CREATE INDEX "KnowledgeDiagram_evidenceStatus_idx" ON "KnowledgeDiagram"("evidenceStatus");
CREATE INDEX "AssetDiagram_diagramId_idx" ON "AssetDiagram"("diagramId");

ALTER TABLE "KnowledgeDiagram"
  ADD CONSTRAINT "KnowledgeDiagram_assetId_fkey"
  FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AssetDiagram"
  ADD CONSTRAINT "AssetDiagram_assetId_fkey"
  FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AssetDiagram"
  ADD CONSTRAINT "AssetDiagram_diagramId_fkey"
  FOREIGN KEY ("diagramId") REFERENCES "KnowledgeDiagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
