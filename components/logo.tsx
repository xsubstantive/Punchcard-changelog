import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  size?: "sm" | "md"
}

const LogoAssetPair = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cn("relative inline-block shrink-0", className)}
  >
    <Image
      src="/punchcard-logo-dark.svg"
      alt=""
      fill
      sizes="24px"
      unoptimized
      className="block size-full dark:hidden"
    />
    <Image
      src="/punchcard-logo-light.svg"
      alt=""
      fill
      sizes="24px"
      unoptimized
      className="hidden size-full dark:block"
    />
  </span>
)

export function Logo({ className, size = "md" }: LogoProps) {
  const isSmall = size === "sm"

  return (
    <span
      className={cn(
        "inline-flex items-center align-middle text-[#010101] dark:text-white",
        isSmall ? "gap-1.5" : "gap-2.25",
        className
      )}
      aria-label="Punchcard"
    >
      <LogoAssetPair className={isSmall ? "size-5" : "size-7"} />
      <span
        className={cn(
          "font-sans font-medium leading-none tracking-[-0.03em]",
          isSmall ? "text-[18px]" : "text-[22.5px]"
        )}
      >
        Punchcard
      </span>
    </span>
  )
}
