import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. We do not collect, store, or transmit your data. All tools run entirely in your browser.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-6 space-y-6 text-slate-600">
          <p>
            Your privacy is fundamental to how {siteConfig.name} operates.
            This policy explains what data we do and do not collect.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Tool Data — Never Collected
          </h2>
          <p>
            All tools on {siteConfig.name} process data entirely within your
            browser. When you use any tool — whether compressing an image,
            converting text, or generating a password — the data you provide
            is never sent to our servers. We do not have access to your files,
            inputs, or outputs.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Analytics
          </h2>
          <p>
            We may use privacy-respecting analytics to understand which tools
            are most used and how visitors find the site. We do not use
            cross-site tracking cookies. Any analytics we use are configured
            to not collect personally identifiable information.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Cookies
          </h2>
          <p>
            {siteConfig.name} does not set any cookies for tool functionality.
            If we add analytics in the future, we will update this policy and
            provide appropriate disclosure.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Third-Party Services
          </h2>
          <p>
            Our site is hosted on Vercel. When you visit {siteConfig.name},
            Vercel may process basic request data (IP address, request
            headers) to serve the website. This is standard for any website
            and is governed by{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="text-brand-600 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Advertising
          </h2>
          <p>
            If we introduce advertising in the future, we will update this
            policy to disclose what advertising partners we work with and what
            data they may collect. We are committed to using only
            privacy-respecting ad networks.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy, please visit our{" "}
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
