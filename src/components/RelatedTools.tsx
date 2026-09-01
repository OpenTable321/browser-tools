import Link from "next/link";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools/registry";
import { getCategory } from "@/lib/tools/categories";

interface RelatedToolsProps {
  slug: string;
}

export function RelatedTools({ slug }: RelatedToolsProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  const related = tool.relatedSlugs
    ? tool.relatedSlugs
        .map((s) => getToolBySlug(s))
        .filter((tk): tk is NonNullable<typeof tk> => tk !== undefined)
        .slice(0, 4)
    : getToolsByCategory(tool.category)
        .filter((tk) => tk.slug !== tool.slug)
        .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <nav aria-label="Related tools" className="mt-12 max-w-3xl">
      <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {related.map((tk) => {
          const cat = getCategory(tk.category);
          return (
            <li key={tk.slug}>
              <Link
                href={`/tools/${tk.slug}`}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
              >
                <span className="text-2xl">{tk.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {tk.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                    {tk.description}
                  </p>
                  {cat && (
                    <span className="mt-2 inline-block text-xs font-medium text-slate-400">
                      {cat.name}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
