import type { Metadata } from "next"
import { ChangelogPageContent } from "@/components/changelog-page-content"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    absolute: "Punchcard Changelog - Audit AI Product Updates",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
}

export default function HomePage() {
  return <ChangelogPageContent page={1} />
}
