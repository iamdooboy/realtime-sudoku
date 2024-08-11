import { useGame } from "@/hooks/use-game"
import { cn } from "@/lib/utils"
import { useOthersMapped } from "@liveblocks/react/suspense"

interface PrefilledTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  index: number
  cIndex: number
  children?: React.ReactNode
  value?: number | null | readonly number[]
}

export function PrefilledTableCell({
  index,
  cIndex,
  children,
  value,
  className,
  ...props
}: PrefilledTableCellProps) {
  const { tableCellContext } = useGame()

  return (
    <td
      className={cn(
        "w-16 h-16 text-center text-3xl border cursor-default",
        {
          "border-r-4": (index + 1) % 3 === 0 && cIndex !== 8,
          "bg-muted": value === tableCellContext.tableCell.value
        },
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

interface EditableTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  children: React.ReactNode
  indexOfArray: number
  cIndex: number
  value: number | null | readonly number[]
  valid: boolean
}

export function EditableTableCell({
  children,
  indexOfArray,
  cIndex,
  value,
  valid,
  className,
  ...props
}: EditableTableCellProps) {
  const others = useOthersMapped((other) => ({
    focusIndex: other.presence.focusIndex
  }))

  const { tableCellContext } = useGame()

  const sameValue = value === tableCellContext.tableCell.value
  const notZero = tableCellContext.tableCell.value !== 0
  const selectedCell = tableCellContext.tableCell.index === indexOfArray

  const sameInstance = sameValue && notZero && !selectedCell

  return (
    <td
      key={indexOfArray}
      className={cn(
        "relative p-0 w-16 h-16 text-center text-3xl cursor-pointer border",
        {
          "border-r-4": (indexOfArray + 1) % 3 === 0 && cIndex !== 8,
          "bg-blue-100": selectedCell,
          "bg-muted": sameInstance,
          "text-blue-500 dark:text-blue-500": valid,
          "text-red-500 dark:text-red-500": !valid
        },
        className
      )}
      {...props}
    >
      {others.map(([connectionId, { focusIndex }]) => {
        if (focusIndex === indexOfArray) {
          return (
            <div
              key={connectionId}
              className="absolute inset-0 bg-red-100 text-center justify-center items-center flex"
            >
              {children}
            </div>
          )
        }
      })}
      {children}
    </td>
  )
}
