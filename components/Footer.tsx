import Link from "next/link";
import { BRAND_NAME, footerLinks, industries } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1C1A17]">
      <div className="container-px py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg bg-accent-primary"
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.6 10.8a13 13 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1Z"
                    fill="#FAF8F5"
                  />
                </svg>
              </span>
              <span className="font-heading text-xl font-semibold text-[#FAF8F5]">
                {BRAND_NAME}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#B7AFA4]">
              AI-powered missed-call text-back and lead qualification built for home
              services. Catch every call, book more jobs.
            </p>
          </div>

          <FooterColumn title="Product" links={footerLinks.product} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B7AFA4]">
            Industries served
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D8D1C7]"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#B7AFA4]">
            © {year} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#B7AFA4]">
            <Link href="/legal#privacy" className="hover:text-[#FAF8F5]">
              Privacy
            </Link>
            <Link href="/legal#terms" className="hover:text-[#FAF8F5]">
              Terms
            </Link>
            <Link href="/legal#ai-disclosure" className="hover:text-[#FAF8F5]">
              AI Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B7AFA4]">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-[#D8D1C7] transition-colors hover:text-[#FAF8F5]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
