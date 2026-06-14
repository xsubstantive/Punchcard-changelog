import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { ChangelogPageContent } from "@/components/changelog-page-content"
import { getPagePath, getTotalChangelogPages } from "@/lib/changelog"
import { siteConfig } from "@/lib/site"

type PageProps = {
  params: Promise<{
    page: string
  }>
}

function parsePage(page: string) {
  const parsed = Number(page)
  return Number.isInteger(parsed) ? parsed : Number.NaN
}

export function generateStaticParams() {
  const totalPages = getTotalChangelogPages()

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = parsePage((await params).page)
  const totalPages = getTotalChangelogPages()

  if (!page || page < 1 || page > totalPages) {
    return {}
  }

  return {
    title: `${siteConfig.name} - Page ${page}`,
    description: siteConfig.description,
    alternates: {
      canonical: getPagePath(page),
    },
  }
}

export default async function PaginatedChangelogPage({ params }: PageProps) {
  const page = parsePage((await params).page)
  const totalPages = getTotalChangelogPages()

  if (page === 1) {
    redirect("/")
  }

  if (!page || page < 1 || page > totalPages) {
    notFound()
  }

  return <ChangelogPageContent page={page} />
}
