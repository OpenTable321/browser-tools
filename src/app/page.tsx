import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = createMetadata({
  path: "",
});

export default function HomePage() {
  return <HomePageClient />;
}
