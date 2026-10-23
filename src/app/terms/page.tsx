import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Terms",
  description:
    "Terms for using tko.solutions: informational content, no professional advice, and engagements governed by separate written agreements.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Website Terms | TKO Solutions",
    description: "Terms for using the TKO Solutions website.",
    url: absoluteUrl("/terms"),
    images: [{
      url: site.socialImage,
      width: 1200,
      height: 630,
      alt: "TKO Solutions healthcare transformation and operating-model advisory.",
    }],
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Website terms."
        description="These terms govern your use of tko.solutions. Client engagements are governed by separate written agreements, not by this page."
        primaryHref="/contact"
        primaryLabel="Contact TKO"
      />
      <Section>
        <div className="prose-tko">
          <p><strong>Last updated:</strong> October 18, 2026</p>

          <h2>Who we are</h2>
          <p>
            This website is operated by TKO Solutions LLC (&ldquo;TKO&rdquo;), the advisory and
            build practice of Todd Kovalsky, based in Delray Beach, Florida. By using the site
            you agree to these terms. If you do not agree, do not use the site.
          </p>

          <h2>The site is informational</h2>
          <p>
            Content on this site describes TKO&rsquo;s services, methods, and selected work. It
            is general information, not legal, clinical, actuarial, regulatory, tax, investment,
            or compliance advice, and it does not create a client relationship. Decisions about
            your organization should be made with your own qualified advisors.
          </p>

          <h2>Engagements are separately agreed</h2>
          <p>
            Prices, durations, and scopes shown on this site are a description of standard
            engagements. No engagement begins, and no fee is owed, until TKO and the client sign
            a written agreement stating scope, deliverables, dependencies, acceptance criteria,
            commercial terms, and data-handling responsibilities. Where TKO processes data on a
            client&rsquo;s behalf, separate data-processing terms apply.
          </p>

          <h2>Proof, examples, and claims</h2>
          <p>
            Case studies, screenshots, recordings, and interactive examples demonstrate
            mechanisms and methods. Examples labeled synthetic or illustrative use fictional data.
            RachelOS is an independent, single-operator system Todd designed and built; it does
            not establish results in your industry or for your organization. TKO does not
            guarantee lead volume, conversion, revenue, savings, compliance outcomes, or capacity.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You may read, link to, and share public pages for lawful purposes. You may not use
            the contact forms to send spam or test submissions without permission, attempt to
            access the authenticated operator console, interfere with the site&rsquo;s operation,
            or misrepresent your identity when contacting TKO. Automated access by search and
            answer engines is permitted as described in the site&rsquo;s robots file.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Site content, guides, diagrams, and the TKO name are owned by TKO or used with
            permission. You may quote brief excerpts with attribution and a link. Reproducing
            whole guides, deliverable templates, or diagrams for commercial use requires written
            permission. Third-party product names (for example CRM vendors) belong to their
            owners and are used only to describe compatibility; no endorsement is implied.
          </p>

          <h2>Third-party links and services</h2>
          <p>
            The site links to third-party resources and uses service providers for hosting,
            storage, analytics, and email. TKO is not responsible for third-party content or
            practices. The <Link href="/privacy">privacy notice</Link> describes the providers
            TKO uses and how inquiry information is handled.
          </p>

          <h2>No warranties</h2>
          <p>
            The site is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; TKO makes
            reasonable efforts to keep content accurate and current, but does not warrant that
            the site is error-free, uninterrupted, or complete, and may change or remove content
            at any time.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, TKO is not liable for indirect, incidental,
            consequential, or punitive damages arising from use of the site. Liability relating
            to a paid engagement is governed solely by that engagement&rsquo;s written agreement.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Florida without regard to
            conflict-of-law rules. Any dispute about the site will be brought in the state or
            federal courts located in Palm Beach County, Florida.
          </p>

          <h2>Changes and contact</h2>
          <p>
            TKO may update these terms by posting a revised version with a new date. Questions
            can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>. To report a
            security concern, use the same address; a machine-readable contact is published
            at <code>/.well-known/security.txt</code>.
          </p>
        </div>
      </Section>
    </>
  );
}
