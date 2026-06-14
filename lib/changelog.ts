import { docs, meta } from "@/.source"
import { loader } from "fumadocs-core/source"
import { createMDXSource } from "fumadocs-mdx"
import type { ComponentType } from "react"

export const CHANGELOG_PAGE_SIZE = 15

export interface ChangelogData {
  title: string
  description?: string
  date: string
  version?: string
  tags?: string[]
  body: ComponentType
}

export interface ChangelogPage {
  url: string
  data: ChangelogData
}

const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
})

export function getAllChangelogs() {
  return (source.getPages() as ChangelogPage[]).sort((a, b) => {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateB - dateA
  })
}

export function getTotalChangelogPages() {
  return Math.max(1, Math.ceil(getAllChangelogs().length / CHANGELOG_PAGE_SIZE))
}

export function getPaginatedChangelogs(page: number) {
  const start = (page - 1) * CHANGELOG_PAGE_SIZE
  return getAllChangelogs().slice(start, start + CHANGELOG_PAGE_SIZE)
}

export function getLatestChangelogDate(changelogs = getAllChangelogs()) {
  return changelogs[0]?.data.date
}

export function getPagePath(page: number) {
  return page === 1 ? "/" : `/page/${page}`
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getChangelogSlug(changelog: ChangelogPage) {
  return `${changelog.data.date}-${slugify(changelog.data.title)}`
}

export function getChangelogPath(changelog: ChangelogPage) {
  return `/${getChangelogSlug(changelog)}`
}

export function getChangelogBySlug(slug: string) {
  return getAllChangelogs().find((changelog) => getChangelogSlug(changelog) === slug)
}

export function getTagSlug(tag: string) {
  return slugify(tag)
}

export function getTagPath(tag: string) {
  return `/tags/${getTagSlug(tag)}`
}

export function getAllTags() {
  const tags = new Map<string, { name: string; slug: string; count: number }>()

  for (const changelog of getAllChangelogs()) {
    for (const tag of changelog.data.tags ?? []) {
      const slug = getTagSlug(tag)
      const current = tags.get(slug)

      tags.set(slug, {
        name: current?.name ?? tag,
        slug,
        count: (current?.count ?? 0) + 1,
      })
    }
  }

  return Array.from(tags.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count
    return a.name.localeCompare(b.name)
  })
}

export function getTagBySlug(slug: string) {
  return getAllTags().find((tag) => tag.slug === slug)
}

export function getChangelogsByTagSlug(slug: string) {
  return getAllChangelogs().filter((changelog) =>
    (changelog.data.tags ?? []).some((tag) => getTagSlug(tag) === slug)
  )
}

export const changelogTopics = [
  {
    name: "CoAudit",
    slug: "coaudit",
    keywords: ["coaudit", "co-audit", "ai", "automation"],
    description:
      "CoAudit release notes covering Punchcard's audit AI assistant, testing automation, source document analysis, and workpaper generation workflows.",
  },
  {
    name: "Workpaper automation",
    slug: "workpaper-automation",
    keywords: ["workpaper", "workpapers", "column", "cells", "testing attribute"],
    description:
      "Punchcard workpaper automation updates for audit testing, AI-generated columns, evidence tie-outs, exports, and review workflows.",
  },
  {
    name: "PBC requests",
    slug: "pbc-requests",
    keywords: ["request", "requests", "task", "tasks", "client", "engagement"],
    description:
      "Punchcard PBC request workflow updates for audit clients, engagement request lists, task management, document intake, and review handoffs.",
  },
  {
    name: "Sampling",
    slug: "sampling",
    keywords: ["sampling", "sample", "samples", "benford", "mus", "journal entry"],
    description:
      "Punchcard sampling release notes for audit sample selections, journal entry testing, MUS sampling, Benford's Law analysis, and PDF sampling reports.",
  },
  {
    name: "Excel imports",
    slug: "excel-imports",
    keywords: ["excel", "spreadsheet", "csv", "paste", "import", "data imports"],
    description:
      "Punchcard Excel import and spreadsheet processing updates for audit workpapers, CSV uploads, large data pastes, and file extraction.",
  },
  {
    name: "Platform reliability",
    slug: "platform-reliability",
    keywords: ["performance", "reliability", "authentication", "large", "processing", "bug fix"],
    description:
      "Punchcard platform reliability updates covering performance improvements, authentication changes, large-file processing, and production bug fixes.",
  },
] as const

export type ChangelogTopic = (typeof changelogTopics)[number]

function getSearchText(changelog: ChangelogPage) {
  return [
    changelog.data.title,
    changelog.data.description,
    ...(changelog.data.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
}

export function getTopicPath(topic: ChangelogTopic | string) {
  const slug = typeof topic === "string" ? topic : topic.slug
  return `/topics/${slug}`
}

export function getTopicBySlug(slug: string) {
  return changelogTopics.find((topic) => topic.slug === slug)
}

export function getChangelogsByTopicSlug(slug: string) {
  const topic = getTopicBySlug(slug)

  if (!topic) return []

  return getAllChangelogs().filter((changelog) => {
    const searchText = getSearchText(changelog)
    return topic.keywords.some((keyword) => searchText.includes(keyword))
  })
}
