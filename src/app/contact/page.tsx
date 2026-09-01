import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = createMetadata({
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
