import { getToolBySlug } from "@/lib/tools/registry";

interface SeoContentProps {
  slug: string;
}

export function SeoContent({ slug }: SeoContentProps) {
  const tool = getToolBySlug(slug);
  if (!tool?.seoContent) return null;

  const { heading, steps, privacy } = tool.seoContent;

  return (
    <section className="mt-12 max-w-3xl" aria-label="Tool usage guide">
      <h2 className="text-xl font-bold text-slate-900">{heading}</h2>
      <ol className="mt-4 space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-slate-600">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
              {i + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="text-sm font-semibold text-green-900">
          Data Privacy
        </h3>
        <p className="mt-1 text-sm text-green-700">
          {privacy}
        </p>
      </div>
    </section>
  );
}
