"use client"

import Link from "next/link"
import React from "react"
import { useMotionValueEvent, useScroll } from "motion/react"
import {
  Briefcase,
  Building2,
  FileCheck2,
  FileSpreadsheet,
  HeartHandshake,
  Inbox,
  Menu,
  Quote,
  Sparkles,
  X,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Logo } from "@/components/logo"
import { useMedia } from "@/hooks/use-media"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"

interface FeatureLink {
  href: string
  name: string
  description?: string
  icon: React.ReactElement
}

interface MobileLink {
  groupName?: string
  links?: FeatureLink[]
  name?: string
  href?: string
}

const punchcardUrl = (path: string) => `${siteConfig.links.home}${path}`

const features: FeatureLink[] = [
  {
    href: punchcardUrl("/co-audit"),
    name: "CoAudit",
    description: "Flagship punchcard for substantive testing",
    icon: <Sparkles className="stroke-foreground fill-indigo-500/20" />,
  },
  {
    href: punchcardUrl("/product#request"),
    name: "Request",
    description: "Evidence intake and request tracking",
    icon: <Inbox className="stroke-foreground fill-indigo-500/20" />,
  },
  {
    href: punchcardUrl("/workpaper-agent"),
    name: "Workpaper",
    description: "Substantive testing, controls, and contract review",
    icon: <FileCheck2 className="stroke-foreground fill-emerald-500/20" />,
  },
  {
    href: punchcardUrl("/financial-statement-review"),
    name: "Financial Statement Review",
    description: "Review statements and disclosures",
    icon: <FileSpreadsheet className="stroke-foreground fill-green-500/15" />,
  },
]

const audiences: FeatureLink[] = [
  {
    href: punchcardUrl("/for/external-audit"),
    name: "External Audit",
    description: "CPA firms running assurance engagements",
    icon: <Briefcase className="stroke-foreground fill-indigo-500/20" />,
  },
  {
    href: punchcardUrl("/for/internal-audit"),
    name: "Internal Audit",
    description: "Operational, financial, and IT audit teams",
    icon: <Building2 className="stroke-foreground fill-emerald-500/20" />,
  },
  {
    href: punchcardUrl("/for/clients"),
    name: "Audit Clients",
    description: "Finance teams, controllers, and CFOs being audited",
    icon: <HeartHandshake className="stroke-foreground fill-pink-500/20" />,
  },
]

const customerStoryLinks: FeatureLink[] = [
  {
    href: punchcardUrl("/customers/richey-may"),
    name: "Richey May",
    description: "41 selections, 30 minutes — revenue testing in a single sitting",
    icon: <Quote className="stroke-foreground fill-indigo-500/20" />,
  },
  {
    href: punchcardUrl("/customers/jlk-rosenberger"),
    name: "JLK Rosenberger",
    description: "12,750 pages of offering memos, scanned and cited in hours",
    icon: <Quote className="stroke-foreground fill-emerald-500/20" />,
  },
]

const mobileLinks: MobileLink[] = [
  {
    groupName: "Product",
    links: features,
  },
  {
    groupName: "For",
    links: audiences,
  },
  {
    groupName: "Customers",
    links: [
      ...customerStoryLinks,
      {
        name: "All customer stories",
        href: punchcardUrl("/customers"),
        icon: <Quote className="stroke-foreground fill-purple-500/15" />,
      },
    ],
  },
  { name: "Blog", href: "https://blog.punchcard.com" },
  { name: "Contact", href: punchcardUrl("/contact") },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const isLarge = useMedia("(min-width: 64rem)")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <header
      role="banner"
      data-state={isMobileMenuOpen ? "active" : "inactive"}
      {...(isScrolled && { "data-scrolled": true })}
    >
      <div className="fixed inset-x-0 top-0 z-50 pt-2 max-lg:h-18 max-lg:overflow-hidden max-lg:px-2 max-lg:in-data-[state=active]:h-screen max-lg:in-data-[state=active]:bg-card/75 max-lg:in-data-[state=active]:backdrop-blur lg:pt-3">
        <div
          className={cn(
            "mx-auto w-full max-w-6xl rounded-2xl border border-transparent px-3 shadow-md shadow-transparent ring-1 ring-transparent transition-all duration-500 ease-in-out in-data-scrolled:max-w-4xl in-data-scrolled:bg-background/75 in-data-scrolled:shadow-black/6.5 in-data-scrolled:backdrop-blur in-data-scrolled:ring-foreground/5 max-lg:in-data-scrolled:px-5",
            "max-lg:in-data-[state=active]:bg-background/75 max-lg:in-data-[state=active]:px-5 max-lg:in-data-[state=active]:shadow-black/6.5 max-lg:in-data-[state=active]:backdrop-blur max-lg:in-data-[state=active]:ring-foreground/5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between lg:py-3">
            <div className="flex items-center justify-between gap-8 max-lg:h-14 max-lg:w-full max-lg:in-data-[state=active]:border-b">
              <Link
                href={siteConfig.links.home}
                aria-label="Punchcard home"
                className="h-fit transition-all duration-500 lg:in-data-scrolled:px-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-5 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            {isLarge && (
              <div className="absolute inset-0 m-auto size-fit">
                <NavMenu />
              </div>
            )}
            {!isLarge && isMobileMenuOpen && (
              <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />
            )}

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 in-data-[state=active]:flex max-lg:in-data-[state=active]:mt-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-sm"
                >
                  <Link href={punchcardUrl("/login")}>
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button asChild size="sm" className="text-sm">
                  <Link href={punchcardUrl("/demo")}>
                    <span>Book a demo</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <nav role="navigation" className="w-full">
      <Accordion
        type="single"
        collapsible
        className="**:hover:no-underline -mx-4 mt-0.5 space-y-0.5"
      >
        {mobileLinks.map((link, index) => {
          if (link.groupName && link.links) {
            return (
              <AccordionItem
                key={index}
                value={link.groupName}
                className="group relative border-b-0 before:pointer-events-none before:absolute before:inset-x-4 before:bottom-0 before:border-b"
              >
                <AccordionTrigger className="flex items-center justify-between px-4 py-3 text-lg data-[state=open]:bg-foreground/5 **:!font-normal">
                  {link.groupName}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <ul>
                    {link.links.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <Link
                          href={feature.href}
                          onClick={closeMenu}
                          className="grid grid-cols-[auto_1fr] items-center gap-2.5 px-4 py-2"
                        >
                          <div
                            aria-hidden
                            className="flex items-center justify-center *:size-4"
                          >
                            {feature.icon}
                          </div>
                          <div className="text-base">{feature.name}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          }
          return null
        })}
      </Accordion>
      {mobileLinks.map((link, index) => {
        if (link.name && link.href) {
          return (
            <Link
              key={index}
              href={link.href}
              onClick={closeMenu}
              className="group relative block border-0 border-b py-4 text-lg"
            >
              {link.name}
            </Link>
          )
        }
        return null
      })}
    </nav>
  )
}

const NavMenu = () => {
  return (
    <NavigationMenu
      viewport={false}
      className="**:data-[slot=navigation-menu-content]:top-12 max-lg:hidden"
    >
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="w-72">
              <div className="bg-card ring-border relative rounded-xl p-0.5 pt-2 shadow ring-1">
                <span className="text-muted-foreground ml-3 text-xs font-medium uppercase">
                  Features
                </span>
                <ul className="mt-1">
                  {features.map((feature, index) => (
                    <ListItem
                      key={index}
                      href={feature.href}
                      title={feature.name}
                      description={feature.description}
                    >
                      {feature.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="-mt-2">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle({
                    className: "w-full items-start pb-5 pt-7",
                  })}
                >
                  <Link href={punchcardUrl("/product")} className="text-primary">
                    All products
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>For</NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="w-72">
              <div className="bg-card ring-border relative rounded-xl p-0.5 pt-2 shadow ring-1">
                <span className="text-muted-foreground ml-3 text-xs font-medium uppercase">
                  Audiences
                </span>
                <ul className="mt-1">
                  {audiences.map((audience, index) => (
                    <ListItem
                      key={index}
                      href={audience.href}
                      title={audience.name}
                      description={audience.description}
                    >
                      {audience.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Customers</NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="w-80">
              <div className="bg-card ring-border relative rounded-xl p-0.5 pt-2 shadow ring-1">
                <span className="text-muted-foreground ml-3 text-xs font-medium uppercase">
                  Case Studies
                </span>
                <ul className="mt-1">
                  {customerStoryLinks.map((link, index) => (
                    <ListItem
                      key={index}
                      href={link.href}
                      title={link.name}
                      description={link.description}
                    >
                      {link.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="-mt-2">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle({
                    className: "w-full items-start pb-5 pt-7",
                  })}
                >
                  <Link
                    href={punchcardUrl("/customers")}
                    className="text-primary"
                  >
                    All customer stories
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="https://blog.punchcard.com">Blog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={punchcardUrl("/contact")}>Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  description,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string
  title: string
  description?: string
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="grid grid-cols-[auto_1fr] gap-2.5 p-3">
          <div className="bg-muted ring-foreground/10 *:drop-shadow-black/6.5 relative flex size-9 items-center justify-center rounded-lg border border-transparent shadow-sm ring-1">
            {children}
          </div>
          <div className="space-y-0.5">
            <div className="text-foreground text-sm font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-1 text-xs">
              {description}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
