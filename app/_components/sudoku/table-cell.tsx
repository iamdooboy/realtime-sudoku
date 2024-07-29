import React from "react"
import clsx from "clsx"

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
  return (
    <td
      className={clsx({
        "border-r-4": (index + 1) % 3 === 0 && cIndex !== 8,
        "w-16 h-16 text-center text-3xl border border-slate-200 dark:border-slate-700 dark:text-slate-100 cursor-default": true,
        // "bg-gray-100 dark:bg-gray-800": highlight && value === selectedValue
      })}
      {...props}
    >
      {children}
    </td>
  )
}

interface EmptyTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  children: React.ReactNode
  indexOfArray: number
  cIndex: number
  value: number
//   selectedIndex: number
//   selectedValue: number
//   highlight: boolean
}

export function EmptyTableCell({
  children,
  indexOfArray,
  cIndex,
  value,
  // selectedValue,
  // highlight,
  // selectedIndex,
  ...props
}: EmptyTableCellProps) {
  return (
    <td
      key={indexOfArray}
      className={clsx({
        "relative p-0 w-16 h-16 text-center text-3xl cursor-pointer dark:hover:bg-slate-800 border border-slate-200 hover:bg-slate-100 dark:border-slate-700 aspect-square": true,
        "border-r-4": (indexOfArray + 1) % 3 === 0 && cIndex !== 8,
        // "bg-slate-100 dark:bg-slate-800": selectedIndex === indexOfArray,
        // "bg-gray-100 dark:bg-gray-800": highlight && value === selectedValue
      })}
      {...props}
    >
      {children}
    </td>
  )
}

interface Validate {
  valid: boolean
  children: React.ReactNode
}

export function Validate({ valid, children }: Validate) {
  return (
    <div
      className={clsx({
        "text-blue-500 dark:text-blue-500": valid,
        "text-red-500 dark:text-red-500": !valid
      })}
    >
      {children}
    </div>
  )
}
