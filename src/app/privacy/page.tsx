import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How TKO Solutions collects, uses, stores, and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Notice | TKO Solutions",
    description:
      "How TKO Solutions handles business contact information submitted through this website.",
    url: absoluteUrl("/privacy"),
    images: [{
      url: site.socialImage,
      width: 1200,
      height: 630,
      alt: "TKO Solutions prior authorization performance advisory.",
    }],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice."
        description="This notice explains how TKO Solutions handles information submitted through tko.solutions."
        primaryHref="/contact"
        primaryLabel="Contact TKO"
      />
      <Section>
        <div className="prose-tko">
          <p><strong>Last updated:</strong> July 23, 2026</p>

          <h2>Information TKO collects</h2>
          <p>
            TKO collects the business contact and operating-context information you
            choose to submit through the contact form, such as your name, business
            email, organization, role, workflow under pressure, timing, and optional
            message. The site may also record limited technical attribution such as
            landing page, referring domain, UTM campaign values, and device category.
          </p>

          <h2>How the information is used</h2>
          <p>
            TKO uses submitted information to review your request, determine whether
            a conversation may be appropriate, respond to you, protect the form from
            abuse, maintain a record of business inquiries, and understand which
            public content helps prospective buyers.
          </p>

          <h2>Do not submit sensitive information</h2>
          <p>
            Do not submit protected health information, patient identifiers,
            credentials, personal financial information, confidential client
            information, or other sensitive data through this website. Appropriately
            de-identified materials can be discussed only after scope and handling
            controls are agreed.
          </p>

          <h2>Service providers</h2>
          <p>
            TKO uses service providers for website hosting, database storage, and
            delivery of inquiry notifications. They process information only to
            provide those services. TKO does not sell submitted personal information.
          </p>

          <h2>Retention and security</h2>
          <p>
            TKO retains inquiry information only for as long as reasonably necessary
            to respond, maintain business records, meet legal obligations, and protect
            the service. Reasonable safeguards are used, but no internet transmission
            or storage system can be guaranteed completely secure.
          </p>

          <h2>Your choices</h2>
          <p>
            You may ask TKO to correct or delete business contact information,
            subject to any legal or recordkeeping obligations. You may also choose
            not to use the form and contact Todd directly by email without sending
            sensitive information.
          </p>

          <h2>Contact</h2>
          <p>
            Questions or requests about this notice can be sent to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. For a business inquiry,
            use the <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
