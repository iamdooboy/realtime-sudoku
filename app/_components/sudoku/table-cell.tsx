import React from "react"
import clsx from "clsx"
import { useGame } from "@/hooks/use-game"

interface PrefilledTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  index: number
  cIndex: number
  children: React.ReactNode
  value: number
  // selectedValue: number
  // highlight: boolean
}

export function PrefilledTableCell({
  index,
  cIndex,
  children,
  value,
  // selectedValue,
  // highlight,
  ...props
}: PrefilledTableCellProps) {
  const { tableCellContext } = useGame()
  return (
    <td
      className={clsx({
        "border-r-4": (index + 1) % 3 === 0 && cIndex !== 8,
        "w-16 h-16 text-center text-3xl border cursor-default": true,
        "bg-muted": value === tableCellContext.tableCell.value
      })}
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
  value: number
  valid: boolean
  //   selectedIndex: number
  //   selectedValue: number
  //   highlight: boolean
}

export function EditableTableCell({
  children,
  indexOfArray,
  cIndex,
  value,
  valid,
  // selectedValue,
  // highlight,
  // selectedIndex,
  ...props
}: EditableTableCellProps) {
  const { tableCellContext } = useGame()

  return (
    <td
      key={indexOfArray}
      className={clsx(
        "relative p-0 w-16 h-16 text-center text-3xl cursor-pointer border aspect-square",
        {
          "border-r-4": (indexOfArray + 1) % 3 === 0 && cIndex !== 8,
          "bg-primary-foreground": tableCellContext.tableCell.index === indexOfArray,
          "bg-muted":
            value === tableCellContext.tableCell.value,
          "text-blue-500 dark:text-blue-500": valid,
          "text-red-500 dark:text-red-500": !valid
        }
      )}
      {...props}
    >
      {children}
    </td>
  )
}

// interface Validate {
//   valid: boolean
//   children: React.ReactNode
// }

// export function Validate({ valid, children }: Validate) {
//   return (
//     <div
//       className={clsx({
//         "text-blue-500 dark:text-blue-500": valid,
//         "text-red-500 dark:text-red-500": !valid
//       })}
//     >
//       {children}
//     </div>
//   )
// }
