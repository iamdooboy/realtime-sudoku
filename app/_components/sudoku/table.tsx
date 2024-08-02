"use client"
import { useStorage } from "@liveblocks/react/suspense"
import useCellProps from "@/hooks/use-cell-props"
import { useGame } from "@/hooks/use-game"

import { TableRow } from "./table-row"
import { EditableTableCell, PrefilledTableCell } from "./table-cell"
import { Notes } from "./notes"
export const Table = () => {
  const {
    tableCellContext: { onClickTableCell }
  } = useGame()

  const { sudoku, isPaused } = useStorage((root) => root.plainLson)

  const NUMBER_OF_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <table className="border-collapse border-4 border-slate-200 dark:border-slate-700">
      <tbody>
        {NUMBER_OF_ROWS.map((row, rIndex) => (
          <TableRow key={rIndex} rIndex={rIndex}>
            {NUMBER_OF_ROWS.map((col, cIndex) => {
              const indexOfArray = row * 9 + col

              if (isPaused) {
                return (
                  <PrefilledTableCell
                    key={indexOfArray}
                    index={indexOfArray}
                    cIndex={cIndex}
                  />
                )
              }

              const { value, immutable, valid, notes } = sudoku[indexOfArray]

              const showNotes = notes.some((number: number) => number > 0)

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
                  valid={valid}
                  onClick={() =>
                    onClickTableCell({
                      value,
                      index: indexOfArray
                    })
                  }
                >
                  {showNotes ? <Notes notes={notes} /> : value > 0 && value}
                </EditableTableCell>
              )
            })}
          </TableRow>
        ))}
      </tbody>
    </table>
  )
}
