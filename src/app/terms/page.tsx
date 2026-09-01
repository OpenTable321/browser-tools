import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = createMetadata({
  path: "/terms",
});

export default function TermsPage() {
  return <TermsPageClient />;
}
