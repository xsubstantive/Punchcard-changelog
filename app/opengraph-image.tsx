import { headers } from "next/headers"
import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site"

export const runtime = "edge"
export const alt = "Punchcard Changelog"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  try {
    const headersList = await headers()
    const host = headersList.get("host") || ""
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
    const baseUrl = `${protocol}://${host}`

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#0b0b0c",
            color: "#ffffff",
            padding: "72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <img
              src={`${baseUrl}/punchcard-wordmark-light.svg`}
              alt="Punchcard"
              style={{ height: "56px", width: "auto" }}
            />
            <div
              style={{
                color: "#a3a3a3",
                fontSize: "34px",
                fontWeight: 500,
              }}
            >
              Changelog
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              maxWidth: "920px",
            }}
          >
            <div
              style={{
                fontSize: "74px",
                fontWeight: 650,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Product updates for audit teams
            </div>
            <div
              style={{
                color: "#c7c7c7",
                fontSize: "28px",
                lineHeight: 1.35,
              }}
            >
              {siteConfig.description}
            </div>
          </div>
        </div>
      ),
      { ...size }
    )
  } catch (error) {
    console.error("Error generating OpenGraph image:", error)
    return new Response(`Failed to generate image`, { status: 500 })
  }
}
