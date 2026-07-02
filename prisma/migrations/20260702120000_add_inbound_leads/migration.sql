-- Durable inbound lead capture for contact and assessment submissions.
CREATE TABLE "public"."InboundLead" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "role" TEXT,
    "source" TEXT,
    "landingPage" TEXT,
    "payload" JSONB NOT NULL,
    "notifiedAt" TIMESTAMP(3),
    "lastSubmittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InboundLead_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "InboundLead_email_key" ON "public"."InboundLead"("email" ASC);
CREATE INDEX "InboundLead_source_idx" ON "public"."InboundLead"("source" ASC);
CREATE INDEX "InboundLead_createdAt_idx" ON "public"."InboundLead"("createdAt" ASC);
