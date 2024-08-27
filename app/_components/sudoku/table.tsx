// "use client"

// import { useContext } from "react"
// import clsx from "clsx"
// import { Td } from "./table-cell"
// import { GRID_SIZE } from "@/utils/constants"
// import { TableCellContext } from "@/app/_context/table-cell-context"

// export const Table = () => {
//   const { tableCell, onClickTableCell } = useContext(TableCellContext)

//   return (
//     <table className="border-2 border-black w-full h-full aspect-square">
//       <tbody>
//         {GRID_SIZE.map((row, rIndex) => (
//           <tr
//             key={row}
//             className={clsx({
//               "border-b-2 border-b-black": rIndex === 2 || rIndex === 5
//             })}
//           >
//             {GRID_SIZE.map((col, cIndex) => (
//               <Td
//                 key={col}
//                 cIndex={cIndex}
//                 sudokuIndex={row * 9 + col}
//                 tableCell={tableCell}
//                 setTableCell={onClickTableCell}
//               />
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

"use client"

import { useContext } from "react"
import { Td } from "./table-cell"
import { GRID_SIZE } from "@/utils/constants"
import { TableCellContext } from "@/app/_context/table-cell-context"
import { cn } from "@/lib/utils"
import { useStorage } from "@liveblocks/react"
import { PlayButton } from "../play-button"
import { Complete } from "../complete"

export const Table = () => {
  const { tableCell, onClickTableCell } = useContext(TableCellContext)
  const isRunning = useStorage((root) => root.isRunning)
  const isSolved = useStorage((root) => root.isSolved)

  return (
    <div className="grid grid-cols-9 w-full h-full relative">
      {GRID_SIZE.map((row, rowIndex) =>
        GRID_SIZE.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "flex items-center justify-center border border-b-0 border-r-0",
              {
                "border-t-2 border-t-slate-400": rowIndex % 3 === 0,
                "border-l-2 border-l-slate-400": colIndex % 3 === 0,
                "border-r-2 border-r-slate-400": colIndex === 8,
                "border-b-2 border-b-slate-400": rowIndex === 8
              }
            )}
          >
            {!isRunning && !isSolved ? (
              <div className="size-full aspect-square"></div>
            ) : (
              <Td
                sudokuIndex={row * 9 + col}
                tableCell={tableCell}
                setTableCell={onClickTableCell}
              />
            )}
          </div>
        ))
      )}
      {!isRunning && !isSolved && <PlayButton />}
      {isSolved && <Complete />}
    </div>
  )
}
