"use client"
import { useStorage } from "@liveblocks/react/suspense"
import useCellProps from "@/hooks/use-cell-props"
import { useGame } from "@/hooks/use-game"

import { TableRow } from "./table-row"
import { EmptyTableCell, PrefilledTableCell } from "./table-cell"
export const Table = () => {

  const sudoku = useStorage((root) => root.plainLson.sudoku)

  const NUMBER_OF_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <table className="border-collapse border-4 border-slate-200 dark:border-slate-700">
      <tbody>
        {NUMBER_OF_ROWS.map((row, rIndex) => (
          <TableRow key={rIndex} rIndex={rIndex}>
            {NUMBER_OF_ROWS.map((col, cIndex) => {
              const indexOfArray = row * 9 + col
              const { value, immutable, valid, notes } = sudoku[indexOfArray]

              if (immutable) {
                return (
                  <PrefilledTableCell
                    key={indexOfArray}
                    index={indexOfArray}
                    cIndex={cIndex}
                    value={value}
                    // {...useCellProps(
                    //   indexOfArray,
                    //   cIndex,
                    //   value,
                    //   // () => onClickSquare(null, value)
                    //   // selectedValue,
                    //   // highlight
                    // )}
                    // key={indexOfArray}
                    // index={indexOfArray}
                    // cIndex={cIndex}
                    // value={value}
                    // selectedValue={selectedValue}
                    // onClick={() => onClickSquare(null, value)}
                    // highlight={highlight}
                  >
                    {value}
                  </PrefilledTableCell>
                )
              }

              return (
                <EmptyTableCell
                  key={indexOfArray}
                  cIndex={cIndex}
                  indexOfArray={indexOfArray}
                  value={value}
                >
                  <div></div>
                </EmptyTableCell>
              )
            })}
          </TableRow>
        ))}
      </tbody>
    </table>
  )
}
