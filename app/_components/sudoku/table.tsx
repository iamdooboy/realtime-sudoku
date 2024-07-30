"use client"
import { useStorage } from "@liveblocks/react/suspense"
import useCellProps from "@/hooks/use-cell-props"
import { useGame } from "@/hooks/use-game"

import { TableRow } from "./table-row"
import { EditableTableCell, PrefilledTableCell } from "./table-cell"
export const Table = () => {
  const {
    tableCellContext: { onClickTableCell }
  } = useGame()

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
                    onClick={() =>
                      onClickTableCell({
                        value,
                        index: indexOfArray
                      })
                    }
                    // highlight={highlight}
                  >
                    {value}
                  </PrefilledTableCell>
                )
              }

              return (
                <EditableTableCell
                  key={indexOfArray}
                  cIndex={cIndex}
                  indexOfArray={indexOfArray}
                  value={value}
                  onClick={() =>
                    onClickTableCell({
                      value,
                      index: indexOfArray
                    })
                  }
                >
                  <div>{value > 0 && value}</div>
                </EditableTableCell>
              )
            })}
          </TableRow>
        ))}
      </tbody>
    </table>
  )
}
