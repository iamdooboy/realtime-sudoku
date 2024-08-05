import { useGame } from "@/hooks/use-game"
import { cn } from "@/lib/utils"
import clsx from "clsx"

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
  const { tableCellContext } = useGame()

  return (
    <td
      key={indexOfArray}
      className={clsx(
        "relative p-0 w-16 h-16 text-center text-3xl cursor-pointer border",
        {
          "border-r-4": (indexOfArray + 1) % 3 === 0 && cIndex !== 8,
          "bg-primary-foreground":
            tableCellContext.tableCell.index === indexOfArray,
          "bg-muted":
            value === tableCellContext.tableCell.value &&
            tableCellContext.tableCell.value !== 0,
          "text-blue-500 dark:text-blue-500": valid,
          "text-red-500 dark:text-red-500": !valid
        },
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}
