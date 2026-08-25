import Link from "next/link";
import { categories } from "@/lib/tools/categories";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-slate-900"
            >
              <span className="text-xl">🧰</span>
              <span className="text-lg">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm text-slate-600">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/tools?category=${cat.slug}`}
                    className="text-sm text-slate-600 transition hover:text-slate-900"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Site</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-center text-sm text-slate-500">
            © {year} {siteConfig.name}. All tools run in your browser — your
            data never leaves your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
