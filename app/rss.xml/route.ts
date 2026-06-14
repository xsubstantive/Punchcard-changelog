import {
  getAllChangelogs,
  getChangelogPath,
  getLatestChangelogDate,
} from "@/lib/changelog"
import { siteConfig } from "@/lib/site"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRssDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`).toUTCString()
}

export function GET() {
  const changelogs = getAllChangelogs()
  const latestDate = getLatestChangelogDate(changelogs)
  const items = changelogs
    .map((changelog) => {
      const url = `${siteConfig.url}${getChangelogPath(changelog)}`
      const description = changelog.data.description ?? siteConfig.description

      return `
        <item>
          <title>${escapeXml(changelog.data.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <description>${escapeXml(description)}</description>
          <pubDate>${toRssDate(changelog.data.date)}</pubDate>
          ${(changelog.data.tags ?? [])
            .map((tag) => `<category>${escapeXml(tag)}</category>`)
            .join("")}
        </item>`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <link>${escapeXml(siteConfig.url)}</link>
        <atom:link href="${escapeXml(siteConfig.url)}/rss.xml" rel="self" type="application/rss+xml" />
        <description>${escapeXml(siteConfig.description)}</description>
        <language>en-us</language>
        ${latestDate ? `<lastBuildDate>${toRssDate(latestDate)}</lastBuildDate>` : ""}
        ${items}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
