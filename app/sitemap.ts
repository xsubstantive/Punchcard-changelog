import type { MetadataRoute } from "next"
import {
  getAllChangelogs,
  getChangelogPath,
  getPagePath,
  getTotalChangelogPages,
} from "@/lib/changelog"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const totalPages = getTotalChangelogPages()
  const paginatedPages = Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
    const page = index + 2

    return {
      url: `${siteConfig.url}${getPagePath(page)}`,
      lastModified: new Date(),
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

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...paginatedPages,
    ...changelogEntries,
  ]
}
