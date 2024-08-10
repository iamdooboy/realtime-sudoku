import { useOthersMapped } from "@liveblocks/react"

export function Selection({ index }: { index: number }) {
  const others = useOthersMapped((other) => ({
    name: other.info.name,
    focusIndex: other.presence.focusIndex
  }))

  return (
    <>
      {others.map(([connectionId, { name, focusIndex }]) => {
        if (focusIndex === index) {
          return (
            <div
              key={connectionId}
              className="absolute object-contain inset-0 z-10 ring-[2px] ring-orange-500 bg-orange-500 bg-opacity-30"
            >
              <div className="absolute -top-5 -right-[2px] text-sm bg-orange-500 rounded-sm px-1 text-white dark:bg-orange-600 dark:border-orange-600">
                {name}
              </div>
            </div>
          )
        }
      })}
    </>
  )
}

export function CurrentSelection() {
  return (
    <div className="absolute object-contain inset-0 z-10 ring-[2px] ring-blue-500 bg-blue-500 bg-opacity-30">
      <div className="absolute -top-5 -right-[2px] text-sm bg-blue-500 rounded-sm px-1 text-white dark:bg-blue-600 dark:border-blue-600">
        You
      </div>
    </div>
  )
}
