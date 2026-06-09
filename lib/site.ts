/**
 * Central site configuration. The brand name is a find-replaceable token so it
 * can be swapped in one pass later.
 */
export const BRAND_NAME = "{{BRAND_NAME}}";

export const SITE_URL = "https://example.com";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export const industries = [
  "Plumbing",
  "HVAC",
  "Electrical",
  "Roofing",
  "Garage Doors",
  "Landscaping",
] as const;

export const footerLinks = {
  product: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Live Demo", href: "/#conversation-demo" },
    { label: "ROI Calculator", href: "/#roi-calculator" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal#privacy" },
    { label: "Terms of Service", href: "/legal#terms" },
    { label: "AI Disclosure", href: "/legal#ai-disclosure" },
    { label: "Compliance", href: "/legal#compliance" },
  ],
} as const;
