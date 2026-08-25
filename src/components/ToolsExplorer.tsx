"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ToolCard } from "./ToolCard";
import { categories } from "@/lib/tools/categories";
import { getAllTools } from "@/lib/tools/registry";

export function ToolsExplorer() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") ?? "all";

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const allTools = getAllTools();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTools.filter((t) => {
      const matchesCategory =
        activeCategory === "all" || t.category === activeCategory;
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory, allTools]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools by name or keyword…"
            aria-label="Search tools by name or keyword"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            activeCategory === "all"
              ? "bg-brand-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              activeCategory === cat.slug
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center">
          <p className="text-lg font-medium text-slate-700">
            No tools found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  );
}
