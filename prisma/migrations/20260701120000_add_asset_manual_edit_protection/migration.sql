-- Add generated-output metadata used to protect manually edited TIF assets from overwrite.
ALTER TABLE "public"."Asset"
ADD COLUMN "generatedAt" TIMESTAMP(3),
ADD COLUMN "generatedHash" TEXT;
