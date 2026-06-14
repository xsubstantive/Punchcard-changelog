import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ChangelogPageContent } from "@/components/changelog-page-content"
import {
  getAllTags,
  getChangelogsByTagSlug,
  getTagBySlug,
  getTagPath,
} from "@/lib/changelog"
import { siteConfig } from "@/lib/site"

type PageProps = {
  params: Promise<{
    tag: string
  }>
}

function getTagDescription(tagName: string, count: number) {
  return `Browse ${count} Punchcard changelog ${count === 1 ? "entry" : "entries"} about ${tagName.toLowerCase()}, including audit AI platform improvements, product fixes, and release notes for CoAudit, workpapers, requests, and automation.`
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: tag.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const tag = getTagBySlug((await params).tag)

  if (!tag) return {}

  const title = `Punchcard ${tag.name} Updates`
  const description = getTagDescription(tag.name, tag.count)

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: getTagPath(tag.name),
      types: {
        "application/rss+xml": "/rss.xml",
      },
    },
    openGraph: {
      title,
      description,
      url: getTagPath(tag.name),
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function ChangelogTagPage({ params }: PageProps) {
  const tag = getTagBySlug((await params).tag)

  if (!tag) {
    notFound()
  }

  const changelogs = getChangelogsByTagSlug(tag.slug)
  const title = `Punchcard ${tag.name} updates`
  const description = getTagDescription(tag.name, tag.count)

  return (
    <ChangelogPageContent
      page={1}
      changelogs={changelogs}
      totalPages={1}
      pagePath={getTagPath(tag.name)}
      kicker="Changelog topic"
      title={title}
      description={description}
      showPagination={false}
    />
  )
}
