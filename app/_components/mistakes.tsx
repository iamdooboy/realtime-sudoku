"use client"

import { useStorage } from "@liveblocks/react/suspense"

export function Mistakes() {
  const mistakeCount = useStorage((root) => root.mistakeCount)
  return (
    <span>
      <span className="mr-1 inline-block text-muted-foreground">Mistakes:</span>
      <span className="mr-[2px] inline-flex w-2">{mistakeCount}</span>
      <span>/</span>
      <span className="inline-flex w-2">3</span>
    </span>
  )
}
