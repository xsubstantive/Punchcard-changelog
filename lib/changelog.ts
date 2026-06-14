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
