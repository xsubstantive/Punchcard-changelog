"use client"

import { Check, LinkIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function CopyEntryLink({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return

    const timeout = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
      aria-label={copied ? "Copied link" : "Copy link to this update"}
      onClick={async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
      }}
    >
      {copied ? <Check className="size-4" /> : <LinkIcon className="size-4" />}
    </Button>
  )
}
