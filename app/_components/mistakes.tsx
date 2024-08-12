"use client"

import { useStorage } from "@liveblocks/react/suspense"

export function Mistakes() {

  const mistakeCount = useStorage((root) => root.root.mistakeCount)
  return (
    <span>
      <span className="mr-1 text-muted-foreground inline-block">Mistakes:</span>
      <span className="inline-flex w-2 mr-[2px]">{mistakeCount}</span>
      {/* <span>/</span> */}
      {/* <span className="inline-flex w-2">3</span> */}
    </span>
  )
}
