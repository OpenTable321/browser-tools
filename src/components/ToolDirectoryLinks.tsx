import Link from "next/link";
import { getAllTools } from "@/lib/tools/registry";
import { categories, getCategory } from "@/lib/tools/categories";

export function ToolDirectoryLinks() {
  const allTools = getAllTools();

  return (
    <section
      aria-label="All tools directory"
      className="mt-12 border-t border-slate-200 pt-8"
    >
      <h2 className="text-xl font-bold text-slate-900">All Tools</h2>
      <div className="mt-6 space-y-8">
        {categories.map((cat) => {
          const tools = allTools.filter((t) => t.category === cat.slug);
          if (tools.length === 0) return null;
          return (
            <div key={cat.slug}>
              <h3 className="text-sm font-semibold text-slate-700">
                {cat.icon} {cat.name}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => {
                  const toolCategory = getCategory(tool.category);
                  return (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                      >
                        <span>{tool.icon}</span>
                        <span>{tool.name}</span>
                        {toolCategory && (
                          <span className="sr-only">
                            {toolCategory.name}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
