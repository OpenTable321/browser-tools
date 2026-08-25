import type { Metadata } from "next";
import Link from "next/link";
import { getAllTools } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const popularTools = getAllTools().slice(0, 3);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-7xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-slate-600">
        The page you are looking for does not exist or has been moved. Try
        browsing our tools or heading back to the homepage.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/tools" className="btn-secondary">
          Browse All Tools
        </Link>
      </div>

      {popularTools.length > 0 && (
        <div className="mt-12">
          <p className="text-sm font-medium text-slate-500">
            Popular tools
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                {tool.icon} {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
