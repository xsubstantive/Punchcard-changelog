import Link from "next/link"
import { CopyEntryLink } from "@/components/copy-entry-link"
import Footer from "@/components/footer"
import Header from "@/components/header"
import {
  CHANGELOG_PAGE_SIZE,
  changelogTopics,
  type ChangelogPage,
  getChangelogPath,
  getPagePath,
  getPaginatedChangelogs,
  getTagPath,
  getTopicPath,
  getTotalChangelogPages,
} from "@/lib/changelog"
import { siteConfig } from "@/lib/site"
import { cn, formatDateString } from "@/lib/utils"

function getEntryId(url: string) {
  return `release-${url.split("/").filter(Boolean).at(-1) ?? "latest"}`
}

function getCanonicalEntryUrl(changelog: ChangelogPage) {
  return `${siteConfig.url}${getChangelogPath(changelog)}`
}

function getStructuredData({
  changelogs,
  page,
  pagePath,
  name,
  description,
}: {
  changelogs: ChangelogPage[]
  page: number
  pagePath: string
  name: string
  description: string
}) {

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.links.home}/#organization`,
        name: "Substantive AI, Inc.",
        alternateName: "Punchcard",
        url: siteConfig.links.home,
        logo: `${siteConfig.url}/punchcard-logo-dark.svg`,
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}${pagePath}`,
        name,
        url: `${siteConfig.url}${pagePath}`,
        description,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        publisher: {
          "@id": `${siteConfig.links.home}/#organization`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.links.home}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}${pagePath}#release-notes`,
        name,
        description,
        itemListElement: changelogs.map((changelog, index) => ({
          "@type": "ListItem",
          position: (page - 1) * CHANGELOG_PAGE_SIZE + index + 1,
          url: getCanonicalEntryUrl(changelog),
          item: {
            "@type": "TechArticle",
            "@id": getCanonicalEntryUrl(changelog),
            headline: changelog.data.title,
            description: changelog.data.description,
            datePublished: changelog.data.date,
            dateModified: changelog.data.date,
            keywords: changelog.data.tags?.join(", "),
            mainEntityOfPage: getCanonicalEntryUrl(changelog),
            publisher: {
              "@id": `${siteConfig.links.home}/#organization`,
            },
            about: [
              "Punchcard",
              "audit AI",
              "audit automation",
              "workpaper automation",
            ],
          },
        })),
      },
    ],
  }
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const hasNewer = currentPage > 1
  const hasOlder = currentPage < totalPages

  if (!hasNewer && !hasOlder) return null

  return (
    <nav
      aria-label="Changelog pagination"
      className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-8"
    >
      {hasNewer ? (
        <Link
          href={getPagePath(currentPage - 1)}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Newer updates
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {hasOlder ? (
        <Link
          href={getPagePath(currentPage + 1)}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Older updates
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  )
}

function TopicLinks() {
  return (
    <nav aria-label="Browse changelog by topic" className="mt-8">
      <div className="mb-3 text-sm font-medium text-muted-foreground">
        Browse by topic
      </div>
      <div className="flex flex-wrap gap-2">
        {changelogTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={getTopicPath(topic)}
            className="inline-flex h-8 items-center rounded-full border bg-muted px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            {topic.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

type ChangelogPageContentProps = {
  page: number
  changelogs?: ChangelogPage[]
  totalPages?: number
  pagePath?: string
  kicker?: string
  title?: string
  description?: string
  showPagination?: boolean
}

export function ChangelogPageContent({
  page,
  changelogs: providedChangelogs,
  totalPages: providedTotalPages,
  pagePath = getPagePath(page),
  kicker = "Changelog",
  title = "Punchcard product updates",
  description = "Release notes for Punchcard's audit AI platform, including CoAudit, workpaper automation, PBC request workflows, sampling reports, Excel imports, authentication, and platform reliability.",
  showPagination = true,
}: ChangelogPageContentProps) {
  const totalPages = providedTotalPages ?? getTotalChangelogPages()
  const changelogs = providedChangelogs ?? getPaginatedChangelogs(page)
  const structuredData = getStructuredData({
    changelogs,
    page,
    pagePath,
    name: title,
    description,
  })

  return (
    <div className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <main className="mx-auto max-w-6xl px-6 pt-32 lg:px-10">
        <section className="mb-14 max-w-4xl">
          <div className="mb-4 text-sm font-medium text-muted-foreground">
            {kicker}
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground text-balance">
            {description}
          </p>
          {showPagination && page > 1 && (
            <p className="mt-5 text-sm font-medium text-muted-foreground">
              Page {page}
            </p>
          )}
          {showPagination && page === 1 && <TopicLinks />}
        </section>

        <div className="relative">
          {changelogs.map((changelog, index) => {
            const MDX = changelog.data.body
            const formattedDate = formatDateString(changelog.data.date)
            const entryId = getEntryId(changelog.url)

            return (
              <article
                key={changelog.url}
                id={entryId}
                className="relative scroll-mt-28"
                itemScope
                itemType="https://schema.org/TechArticle"
              >
                <div className="grid gap-y-6 md:grid-cols-[12rem_minmax(0,1fr)]">
                  <div className="relative z-20 pb-10 pr-8">
                    <div className="relative h-8 md:sticky md:top-28">
                      <time
                        dateTime={changelog.data.date}
                        itemProp="datePublished"
                        className="flex h-8 items-center whitespace-nowrap text-sm font-medium text-muted-foreground"
                      >
                        {formattedDate}
                      </time>
                      <div
                        aria-hidden="true"
                        className="absolute right-[-2rem] top-1/2 z-30 hidden size-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.62_0_0)] md:block dark:bg-[oklch(0.64_0_0)]"
                      />
                    </div>
                  </div>

                  <div className="relative z-0 min-w-0 pb-10 pl-0 md:pl-8">
                    <div
                      className={cn(
                        "absolute left-0 z-0 hidden w-px bg-border md:block",
                        index === 0 ? "top-4 h-[calc(100%-1rem)]" : "top-0 h-full"
                      )}
                    />

                    <div className="space-y-6">
                      <div className="relative z-10 flex flex-col gap-2">
                        <h2
                          itemProp="headline"
                          className="grid min-h-8 grid-cols-[minmax(0,1fr)_auto] items-start gap-3 text-2xl font-semibold leading-8 tracking-tight"
                        >
                          <Link
                            href={getChangelogPath(changelog)}
                            className="min-w-0 transition-colors hover:text-muted-foreground"
                          >
                            {changelog.data.title}
                          </Link>
                          <CopyEntryLink url={getCanonicalEntryUrl(changelog)} />
                        </h2>
                        {changelog.data.description && (
                          <p
                            itemProp="description"
                            className="text-muted-foreground text-balance"
                          >
                            {changelog.data.description}
                          </p>
                        )}

                        {changelog.data.tags &&
                          changelog.data.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {changelog.data.tags.map((tag: string) => (
                                <Link
                                  key={tag}
                                  href={getTagPath(tag)}
                                  className={cn(
                                    "flex h-6 w-fit items-center justify-center rounded-full border bg-muted px-2",
                                    "text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                                  )}
                                >
                                  {tag}
                                </Link>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="prose max-w-none prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-a:no-underline dark:prose-invert">
                        <MDX />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {showPagination && (
          <Pagination currentPage={page} totalPages={totalPages} />
        )}
      </main>
      <Footer />
    </div>
  )
}
