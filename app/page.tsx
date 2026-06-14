import { docs, meta } from "@/.source"
import { loader } from "fumadocs-core/source"
import { createMDXSource } from "fumadocs-mdx"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { siteConfig } from "@/lib/site"
import { formatDate } from "@/lib/utils"

const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
})

interface ChangelogData {
  title: string
  description?: string
  date: string
  version?: string
  tags?: string[]
  body: React.ComponentType
}

interface ChangelogPage {
  url: string
  data: ChangelogData
}

function getEntryId(url: string) {
  return `release-${url.split("/").filter(Boolean).at(-1) ?? "latest"}`
}

function getEntryUrl(url: string) {
  return `${siteConfig.url}/#${getEntryId(url)}`
}

function getStructuredData(changelogs: ChangelogPage[]) {
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
        "@id": `${siteConfig.url}/#release-notes`,
        name: "Punchcard release notes",
        description:
          "Recent Punchcard product updates for audit AI, CoAudit, workpapers, request workflows, imports, sampling, and automation.",
        itemListElement: changelogs.map((changelog, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: getEntryUrl(changelog.url),
          item: {
            "@type": "TechArticle",
            "@id": getEntryUrl(changelog.url),
            headline: changelog.data.title,
            description: changelog.data.description,
            datePublished: changelog.data.date,
            dateModified: changelog.data.date,
            keywords: changelog.data.tags?.join(", "),
            mainEntityOfPage: getEntryUrl(changelog.url),
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

export default function HomePage() {
  const sortedChangelogs = (source.getPages() as ChangelogPage[]).sort(
    (a, b) => {
      const dateA = new Date(a.data.date).getTime()
      const dateB = new Date(b.data.date).getTime()
      return dateB - dateA
    }
  )
  const structuredData = getStructuredData(sortedChangelogs)

  return (
    <div className="min-h-screen bg-background relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      {/* Timeline */}
      <main className="mx-auto max-w-5xl px-6 pt-32 lg:px-10">
        <section className="mb-12 max-w-3xl">
          <p className="text-lg leading-8 text-muted-foreground text-balance">
            Product updates and release notes for Punchcard, including CoAudit,
            audit workpaper automation, PBC request workflows, sampling reports,
            Excel imports, authentication, and platform reliability.
          </p>
        </section>

        <div className="relative">
          {sortedChangelogs.map((changelog) => {
            const MDX = changelog.data.body
            const date = new Date(changelog.data.date)
            const formattedDate = formatDate(date)
            const entryId = getEntryId(changelog.url)

            return (
              <article
                key={changelog.url}
                id={entryId}
                className="relative scroll-mt-28"
                itemScope
                itemType="https://schema.org/TechArticle"
              >
                <div className="flex flex-col md:flex-row gap-y-6">
                  <div className="relative z-20 md:w-48 flex-shrink-0 pb-10">
                    <div className="relative md:sticky md:top-28">
                      <time
                        dateTime={changelog.data.date}
                        itemProp="datePublished"
                        className="text-sm font-medium text-muted-foreground block mb-3"
                      >
                        {formattedDate}
                      </time>
                      <div
                        aria-hidden="true"
                        className="absolute right-0 top-1 z-20 hidden size-3 translate-x-1/2 rounded-full bg-primary md:block"
                      />
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="relative z-0 flex-1 pb-10 md:pl-8">
                    {/* Vertical timeline line */}
                    <div className="absolute left-0 top-2 z-0 hidden h-full w-px bg-border md:block" />

                    <div className="space-y-6">
                      <div className="relative z-10 flex flex-col gap-2">
                        <h2
                          itemProp="headline"
                          className="text-2xl font-semibold tracking-tight text-balance"
                        >
                          {changelog.data.title}
                        </h2>
                        {changelog.data.description && (
                          <p
                            itemProp="description"
                            className="text-muted-foreground text-balance"
                          >
                            {changelog.data.description}
                          </p>
                        )}

                        {/* Tags */}
                        {changelog.data.tags &&
                          changelog.data.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {changelog.data.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                        <MDX />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
