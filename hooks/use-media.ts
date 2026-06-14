"use client"

import { useSyncExternalStore } from "react"

export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener("change", onStoreChange)

      return () => {
        matchMedia.removeEventListener("change", onStoreChange)
      }
    },
    () => window.matchMedia(query).matches,
    () => true
  )
}
