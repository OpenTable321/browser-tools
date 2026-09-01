import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = createMetadata({
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
