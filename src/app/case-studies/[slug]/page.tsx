import { permanentRedirect } from "next/navigation";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyRedirectPage({ params }: Params) {
  const { slug } = await params;
  permanentRedirect(`/selected-work/${slug}`);
}
