import type { MetadataRoute } from "next"
import {
  changelogTopics,
  getAllTags,
  getAllChangelogs,
  getChangelogPath,
  getChangelogsByTagSlug,
  getChangelogsByTopicSlug,
  getLatestChangelogDate,
  getPagePath,
  getPaginatedChangelogs,
  getTagPath,
  getTopicPath,
  getTotalChangelogPages,
} from "@/lib/changelog"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const totalPages = getTotalChangelogPages()
  const latestDate = getLatestChangelogDate()
  const paginatedPages = Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
    const page = index + 2
    const pageLatestDate = getLatestChangelogDate(getPaginatedChangelogs(page))

    return {
      url: `${siteConfig.url}${getPagePath(page)}`,
      lastModified: new Date(pageLatestDate ?? latestDate ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }
  })

  const changelogEntries = getAllChangelogs().map((changelog) => ({
    url: `${siteConfig.url}${getChangelogPath(changelog)}`,
    lastModified: new Date(changelog.data.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const tagPages = getAllTags().map((tag) => {
    const tagLatestDate = getLatestChangelogDate(getChangelogsByTagSlug(tag.slug))

    return {
      url: `${siteConfig.url}${getTagPath(tag.name)}`,
      lastModified: new Date(tagLatestDate ?? latestDate ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }
  })

  const topicPages = changelogTopics.map((topic) => {
    const topicLatestDate = getLatestChangelogDate(getChangelogsByTopicSlug(topic.slug))

    return {
      url: `${siteConfig.url}${getTopicPath(topic)}`,
      lastModified: new Date(topicLatestDate ?? latestDate ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }
  })

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(latestDate ?? Date.now()),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...paginatedPages,
    ...topicPages,
    ...tagPages,
    ...changelogEntries,
  ]
}
