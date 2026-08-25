import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}. Free online tools provided as-is, without warranty.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-6 space-y-6 text-slate-600">
          <p>
            By using {siteConfig.name}, you agree to these Terms of Service.
            If you do not agree with any part of these terms, please do not
            use the site.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Free Use
          </h2>
          <p>
            {siteConfig.name} provides all tools free of charge. You may use
            the tools for personal or commercial purposes without restriction.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            No Warranty
          </h2>
          <p>
            All tools are provided &quot;as is&quot; without warranty of any
            kind. We do not guarantee that the tools will be error-free,
            uninterrupted, or produce accurate results. You are responsible
            for verifying the output of any tool before relying on it.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Limitation of Liability
          </h2>
          <p>
            {siteConfig.name} shall not be liable for any direct, indirect,
            incidental, or consequential damages arising from the use of or
            inability to use the tools provided on this site.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Intellectual Property
          </h2>
          <p>
            The site design, code, and branding are the property of{" "}
            {siteConfig.name}. The tools themselves process your data and
            produce output that belongs to you.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Acceptable Use
          </h2>
          <p>
            You agree not to use {siteConfig.name} for any unlawful purpose
            or in any way that could damage, disable, or impair the site.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Changes to Terms
          </h2>
          <p>
            We may update these Terms of Service from time to time. Continued
            use of the site after changes constitutes acceptance of the new
            terms.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Contact
          </h2>
          <p>
            If you have questions about these Terms, please visit our{" "}
            <Link href="/contact" className="text-brand-600 hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
