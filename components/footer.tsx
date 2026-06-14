import Link from "next/link"
import { Logo } from "@/components/logo"
import { siteConfig } from "@/lib/site"

type FooterLink = { title: string; href: string }

const punchcardUrl = (path: string) => `${siteConfig.links.home}${path}`

const productLinks: FooterLink[] = [
  { title: "Request", href: punchcardUrl("/product#request") },
  { title: "Workpaper", href: punchcardUrl("/workpaper-agent") },
  { title: "CoAudit", href: punchcardUrl("/co-audit") },
  {
    title: "Financial Statement Review",
    href: punchcardUrl("/financial-statement-review"),
  },
  { title: "Changelog", href: siteConfig.url },
]

const audienceLinks: FooterLink[] = [
  { title: "External Audit", href: punchcardUrl("/for/external-audit") },
  { title: "Internal Audit", href: punchcardUrl("/for/internal-audit") },
  { title: "Audit Clients", href: punchcardUrl("/for/clients") },
]

const customerFooterLinks: FooterLink[] = [
  { title: "All customer stories", href: punchcardUrl("/customers") },
  { title: "Richey May", href: punchcardUrl("/customers/richey-may") },
  { title: "JLK Rosenberger", href: punchcardUrl("/customers/jlk-rosenberger") },
]

const companyLinks: FooterLink[] = [
  { title: "About", href: punchcardUrl("/about") },
  { title: "Team", href: punchcardUrl("/team") },
  { title: "Contact", href: punchcardUrl("/contact") },
  { title: "Brand", href: punchcardUrl("/brand") },
  { title: "Onboarding", href: punchcardUrl("/has/excellent-onboarding") },
  { title: "Blog", href: "https://blog.punchcard.com" },
  { title: "Security", href: punchcardUrl("/is/security") },
  { title: "Privacy", href: punchcardUrl("/is/privacy") },
  { title: "Terms", href: punchcardUrl("/is/our-service") },
]

const linkColumns: { heading: string; links: FooterLink[] }[] = [
  { heading: "Product", links: productLinks },
  { heading: "For", links: audienceLinks },
  { heading: "Customers", links: customerFooterLinks },
  { heading: "Company", links: companyLinks },
]

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-background py-8 sm:py-16">
      <div className="mx-auto max-w-5xl space-y-10 px-6">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <div className="flex flex-col gap-6">
            <Link
              href={siteConfig.links.home}
              aria-label="Punchcard home"
              className="block size-fit"
            >
              <Logo />
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              The assurance system of action for auditors, consultants, and
              clients.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://x.com/punchcard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Punchcard on X"
                className="text-muted-foreground hover:text-primary block"
              >
                <svg
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/goagentive/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Punchcard on LinkedIn"
                className="text-muted-foreground hover:text-primary block"
              >
                <svg
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
          >
            {linkColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-foreground text-sm font-semibold">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground block text-sm duration-150"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          aria-hidden
          className="h-px bg-[length:6px_1px] bg-repeat-x opacity-25 [background-image:linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)]"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Substantive AI, Inc. SOC 2 certified ·
            GDPR compliant.
          </span>
          <Link
            href={punchcardUrl("/status")}
            className="ring-foreground/5 bg-card hover:bg-foreground/5 flex items-center gap-2 rounded-full border border-transparent py-1 pl-2 pr-4 shadow ring-1 transition-colors"
          >
            <div className="relative flex size-3">
              <span className="duration-1500 absolute inset-0 block size-full animate-pulse rounded-full bg-emerald-100" />
              <span className="relative m-auto block size-1 rounded-full bg-emerald-500" />
            </div>
            <span className="text-sm">All systems normal</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
