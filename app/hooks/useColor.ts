"use client"
import { COLORS } from "@/utils/constants"
import { Json } from "@liveblocks/react/suspense"
import { useMemo } from "react"

type OtherProps = readonly (readonly [
  connectionId: number,
  data: {
    focusIndex?: Json | undefined
    name: string
    id: number,
    avatar?: string
  }
])[]

export const useColor = (others: OtherProps) => {
  const userColors = useMemo(() => {
    const colorMap = new Map()
    others.forEach(([connectionId], index) => {
      colorMap.set(connectionId, COLORS[index % COLORS.length])
    })
    return colorMap
  }, [others])
  return userColors
}
