import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "About",
  description: `Learn about ${siteConfig.name} — a collection of free, privacy-first online tools that run entirely in your browser.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About {siteConfig.name}
        </h1>

        <div className="mt-6 space-y-6 text-slate-600">
          <p>
            {siteConfig.name} is a collection of free online tools designed to
            be fast, private, and accessible to everyone. Unlike traditional
            online tools that upload your files to a server for processing,
            every tool on this site runs entirely in your web browser.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p>
            We believe utility tools should be simple, fast, and respectful of
            your privacy. That is why we build tools that work without
            requiring accounts, without uploading your data, and without
            adding unnecessary complexity.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            How It Works
          </h2>
          <p>
            All processing happens locally using standard browser APIs such as
            Canvas, Web Crypto, and the File API. When you upload a file to
            one of our tools, it never leaves your device. This means:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Your data stays private — no server uploads</li>
            <li>Processing is instant — no network latency</li>
            <li>Tools work offline once the page is loaded</li>
            <li>No file size limits imposed by server constraints</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">Technology</h2>
          <p>
            This site is built with Next.js, TypeScript, and Tailwind CSS. It
            is deployed on Vercel and optimized for performance and
            accessibility. The architecture is designed to be easily
            extensible — new tools can be added without modifying dozens of
            files.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p>
            Have a suggestion for a new tool or found a bug? We would love to
            hear from you. Visit our <Link href="/contact" className="text-brand-600 hover:underline">contact page</Link> to get in touch.
          </p>
        </div>
      </div>
    </div>
  );
}
