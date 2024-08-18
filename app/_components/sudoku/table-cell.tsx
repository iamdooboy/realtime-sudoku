// import { useGame } from "@/hooks/use-game"
// import { cn } from "@/lib/utils"
// import { useOthersMapped, useStorage } from "@liveblocks/react/suspense"

// interface PrefilledTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
//   index: number
//   cIndex: number
//   children?: React.ReactNode
//   value?: number | null | readonly number[]
// }

// export function PrefilledTableCell({
//   index,
//   cIndex,
//   children,
//   value,
//   className,
//   ...props
// }: PrefilledTableCellProps) {
//   const validateMode = useStorage((root) => root.root.validateMode)

//   const { tableCellContext } = useGame()

//   return (
//     <td
//       className={cn(
//         "text-center text-sm sm:text-3xl border aspect-square ",
//         {
//           "bg-secondary": !validateMode,
//           "border-r-4": (index + 1) % 3 === 0 && cIndex !== 8,
//           "bg-tertiary":
//             value === tableCellContext.tableCell.value && !validateMode,
//           "bg-muted": value === tableCellContext.tableCell.value && validateMode
//         },
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </td>
//   )
// }

// interface EditableTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
//   children: React.ReactNode
//   indexOfArray: number
//   cIndex: number
//   value: number | null | readonly number[]
//   valid: boolean
// }

// export function EditableTableCell({
//   children,
//   indexOfArray,
//   cIndex,
//   value,
//   valid,
//   className,
//   ...props
// }: EditableTableCellProps) {
//   const others = useOthersMapped((other) => ({
//     focusIndex: other.presence.focusIndex
//   }))

//   const validateMode = useStorage((root) => root.root.validateMode)

//   const { tableCellContext } = useGame()

//   const sameValue = value === tableCellContext.tableCell.value
//   const notZero = tableCellContext.tableCell.value !== 0
//   const selectedCell = tableCellContext.tableCell.index === indexOfArray

//   const sameInstance = sameValue && notZero && !selectedCell

//   return (
//     <td
//       key={indexOfArray}
//       className={cn(
//         "relative p-0 text-center text-sm sm:text-3xl cursor-pointer border",
//         {
//           "border-r-4": (indexOfArray + 1) % 3 === 0 && cIndex !== 8,
//           "bg-blue-100": selectedCell,
//           "bg-tertiary": sameInstance,
//           "text-blue-500 dark:text-blue-500": valid && validateMode,
//           "text-red-500 dark:text-red-500": !valid && validateMode
//         },
//         className
//       )}
//       {...props}
//     >
//       {others.map(([connectionId, { focusIndex }]) => {
//         if (focusIndex === indexOfArray) {
//           return (
//             <div
//               key={connectionId}
//               className="absolute inset-0 bg-red-100 text-center justify-center items-center flex"
//             >
//               {children}
//             </div>
//           )
//         }
//       })}
//       {children}
//     </td>
//   )
// }

type TableCellProps = {
  value: number | null | readonly number[] | Notes
  index: number | null
}

import React from "react"

import { cn } from "@/lib/utils"
import { useOthersMapped, useStorage } from "@liveblocks/react/suspense"
import { Notes } from "./notes"

interface TdProps extends React.ComponentPropsWithoutRef<"td"> {
  sudokuIndex: number
  cIndex: number
  tableCell: TableCellProps
  setTableCell: ({ value, index }: TableCellProps) => void
  className?: string
}

export const Td: React.FC<TdProps> = ({
  sudokuIndex,
  cIndex,
  tableCell,
  setTableCell,
  className
}) => {
  const others = useOthersMapped((other) => ({
    focusIndex: other.presence.focusIndex
  }))
  const sudoku = useStorage((root) => root.root.sudoku)
  const validateMode = useStorage((root) => root.root.validateMode)
  const { value, immutable, valid } = sudoku[sudokuIndex]

  const showNotes = typeof value === "object"

  const sameValue = value === tableCell.value
  const notZero = tableCell.value !== 0
  const selectedCell = tableCell.index === sudokuIndex

  const sameInstance = sameValue && notZero && !selectedCell

  const cellClassName = cn(
    "text-center border aspect-square align-middle",
    {
      "border-r-black border-r-2": (sudokuIndex + 1) % 3 === 0 && cIndex !== 8,
      "bg-secondary": immutable && !validateMode,
      "bg-blue-100": selectedCell && !immutable,
      "text-blue-500 dark:text-blue-500": valid && validateMode,
      "text-red-500 dark:text-red-500": !valid && validateMode,
      "bg-tertiary":
        (value === tableCell.value && !validateMode && immutable) ||
        sameInstance,
      "bg-muted": value === tableCell.value && validateMode
    },
    className
  )
  return (
    // <td
    //   className={cellClassName}
    //   onClick={() =>
    //     setTableCell({
    //       value,
    //       index: sudokuIndex
    //     })
    //   }
    // >
    //   <div className="w-full h-full flex items-center justify-center relative">
    //     {showNotes ? (
    //       <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
    //         {value?.map((num, index) => (
    //           <div key={index} className="flex items-center justify-center">
    //             <span className="text-[8px] sm:text-xs text-gray-400">
    //               {num > 0 && num}
    //             </span>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <span className="text-2xl">{value !== 0 && value}</span>
    //     )}
    //   </div>
    // </td>

    <td
      className={cellClassName}
      onClick={() =>
        setTableCell({
          value,
          index: sudokuIndex
        })
      }
    >
      <div className="w-full h-full flex items-center justify-center relative">
        {others.map(([connectionId, { focusIndex }]) => {
          if (focusIndex === sudokuIndex) {
            return (
              <div
                key={connectionId}
                className="absolute inset-0 bg-red-100 text-center justify-center items-center flex"
              >
                {showNotes ? (
                  <Notes notes={value} />
                ) : (
                  value !== 0 && <p className="text-[2vh]">{value}</p>
                )}
              </div>
            )
          }
        })}
        {showNotes ? (
          <Notes notes={value} />
        ) : (
          value !== 0 && <p className="text-[2vh]">{value}</p>
        )}
      </div>
    </td>
  )
}
