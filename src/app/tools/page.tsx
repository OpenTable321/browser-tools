import { Suspense } from "react";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "All Tools",
  description:
    "Browse the full catalog of free browser-based online tools. Search by name or filter by category — image tools, text tools, converters, generators, and more.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          All Tools
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          {`Every tool runs entirely in your browser. No uploads, no sign-up.`}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-16 text-center text-slate-400">
            Loading tools…
          </div>
        }
      >
        <ToolsExplorer />
      </Suspense>
    </div>
  );
}
