"use client"

import { useStorage } from "@liveblocks/react"
import { Button } from "./shadcn/button"

export function Complete() {
  const isSolved = useStorage((root) => root.isSolved)

  return (
    <>
      {isSolved && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 w-full h-full justify-center">
         <span className='text-3xl'>gg</span>
          <Button>new game</Button>
        </div>
      )}
    </>
  )
}
