import { cn } from "@/lib/utils"
import { Json, useOthersMapped } from "@liveblocks/react/suspense"

type OthersType = ReturnType<
  typeof useOthersMapped<{
    focusIndex: Json | undefined
    name: string
    id: number
  }>
>

export const OtherPresence: React.FC<{
  sudokuIndex: number
  others: OthersType
  userColors: Map<number, string>
}> = ({ sudokuIndex, others, userColors }) => {
  return (
    <>
      {others.map(([connectionId, { focusIndex }]) => {
        if (focusIndex === sudokuIndex) {
          return (
            <div
              key={connectionId}
              className={cn(
                "absolute inset-0 -outline-offset-[2px] outline outline-[3px] flex z-10",
                userColors.get(connectionId)
              )}
            />
          )
        }
      })}
    </>
  )
}
