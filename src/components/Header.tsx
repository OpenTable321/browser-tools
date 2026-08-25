"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchTools } from "@/lib/tools/registry";

export function Header() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const results = query.trim() ? searchTools(query).slice(0, 5) : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="text-xl">🧰</span>
          <span className="text-lg">BrowserTools</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            All Tools
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            About
          </Link>
        </nav>

        <div className="relative hidden sm:block">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
              placeholder="Search tools…"
              aria-label="Search tools"
              className="w-40 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm placeholder:text-slate-400 focus:w-56 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all sm:w-48"
            />
          </form>

          {isSearchOpen && results.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg sm:w-72">
              {results.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-start gap-3 px-4 py-3 transition hover:bg-slate-50"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="text-lg">{tool.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {tool.name}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="h-6 w-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              All Tools
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <form onSubmit={handleSubmit} className="px-3 pt-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                aria-label="Search tools"
                className="input-field"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
