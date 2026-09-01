import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = createMetadata({
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
