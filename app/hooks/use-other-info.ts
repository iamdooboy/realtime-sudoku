"use client"
import { COLOR_HEX } from "@/utils/constants"
import { Json, useOthersMapped } from "@liveblocks/react/suspense"

export type OthersType = ReturnType<
  typeof useOthersMapped<{
    focusIndex: Json | undefined
    name: string
    id: number
    avatar: string
    color: string
  }>
>

export const useOthersInfo = () => {
  const others = useOthersMapped((other) => ({
    focusIndex: other.presence.focusIndex,
    name: other.info.name,
    id: other.connectionId,
    avatar: other.info.avatar,
    color: COLOR_HEX[other.connectionId % COLOR_HEX.length]
  }))
  return others
}
