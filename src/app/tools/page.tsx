import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import ToolsPageClient from "./ToolsPageClient";
import { ToolDirectoryLinks } from "@/components/ToolDirectoryLinks";

export const metadata: Metadata = createMetadata({
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <ToolsPageClient />
      <div className="container-page pb-12">
        <ToolDirectoryLinks />
      </div>
    </>
  );
}
