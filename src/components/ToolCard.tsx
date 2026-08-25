import Link from "next/link";
import type { ToolMeta } from "@/lib/tools/types";
import { getCategory } from "@/lib/tools/categories";

interface ToolCardProps {
  tool: ToolMeta;
}

export function ToolCard({ tool }: ToolCardProps) {
  const category = getCategory(tool.category);

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="card group flex flex-col p-5"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{tool.icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition">
            {tool.name}
          </h3>
          {category && (
            <span className="text-xs font-medium text-slate-400">
              {category.name}
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm text-slate-600 line-clamp-2">
        {tool.description}
      </p>

      <div className="mt-4 flex items-center gap-2">
        {tool.isClientSide && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Client-side
          </span>
        )}
        <span className="text-xs font-medium text-brand-600 group-hover:translate-x-0.5 transition">
          Open →
        </span>
      </div>
    </Link>
  );
}
