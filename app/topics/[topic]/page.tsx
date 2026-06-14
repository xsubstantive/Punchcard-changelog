import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ChangelogPageContent } from "@/components/changelog-page-content"
import {
  changelogTopics,
  getChangelogsByTopicSlug,
  getTopicBySlug,
  getTopicPath,
} from "@/lib/changelog"
import { siteConfig } from "@/lib/site"

type PageProps = {
  params: Promise<{
    topic: string
  }>
}

export function generateStaticParams() {
  return changelogTopics.map((topic) => ({
    topic: topic.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const topic = getTopicBySlug((await params).topic)

  if (!topic) return {}

  const title = `Punchcard ${topic.name} Changelog`

  return {
    title: {
      absolute: title,
    },
    description: topic.description,
    alternates: {
      canonical: getTopicPath(topic),
      types: {
        "application/rss+xml": "/rss.xml",
      },
    },
    openGraph: {
      title,
      description: topic.description,
      url: getTopicPath(topic),
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: topic.description,
    },
  }
}

export default async function ChangelogTopicPage({ params }: PageProps) {
  const topic = getTopicBySlug((await params).topic)

  if (!topic) {
    notFound()
  }

  const changelogs = getChangelogsByTopicSlug(topic.slug)

  if (changelogs.length === 0) {
    notFound()
  }

  return (
    <ChangelogPageContent
      page={1}
      changelogs={changelogs}
      totalPages={1}
      pagePath={getTopicPath(topic)}
      kicker="Changelog topic"
      title={`Punchcard ${topic.name} updates`}
      description={topic.description}
      showPagination={false}
    />
  )
}
