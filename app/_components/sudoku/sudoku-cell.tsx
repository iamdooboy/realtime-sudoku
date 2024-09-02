import { useColor } from "@/app/hooks/useColor"
import { cn } from "@/lib/utils"
import { useOthersMapped, useStorage } from "@liveblocks/react/suspense"
import { ImmutableCell } from "./sudoku-cell/immutable-cell"
import { MutableCell } from "./sudoku-cell/mutable-cell"
import { table } from 'console'
type TableCellProps = {
  value: number | null | readonly number[]
  index: number | null
}

interface SudokuCellProps extends React.ComponentPropsWithoutRef<"td"> {
  sudokuIndex: number
  tableCell: TableCellProps
  setTableCell: ({ value, index }: TableCellProps) => void
}

export const SudokuCell: React.FC<SudokuCellProps> = ({
  sudokuIndex,
  tableCell,
  setTableCell
}) => {
  const others = useOthersMapped((other) => ({
    focusIndex: other.presence.focusIndex,
    name: other.info.name,
    id: other.connectionId
  }))

  const userColors = useColor(others)

  const sudoku = useStorage((root) => root.sudoku)
  const validateMode = useStorage((root) => root.validateMode)

  const { value, immutable, valid } = sudoku[sudokuIndex]
  const sameValue = value === tableCell.value
  const notZero = tableCell.value !== 0
  const currentSelectedCell = tableCell.index === sudokuIndex
  const otherCellWithSameValue = sameValue && notZero && !currentSelectedCell

  const handleClick = () => {
    //deselect cell if already selected
    if(tableCell.index !== null) {
      setTableCell({
        value: null,
        index: null
      })
      return
    }
    setTableCell({
      value: value ?? null,
      index: sudokuIndex
    })
  }

  const sharedClassName =
    "relative aspect-square size-full flex items-center justify-center text-xl"

  if (immutable) {
    const immutableStyles = cn(
      sharedClassName,
      "bg-primary/[0.04] dark:bg-primary-foreground/50",
      {
        "bg-primary/[0.12]": otherCellWithSameValue || currentSelectedCell
      }
    )
    return (
      <ImmutableCell
        onClick={handleClick}
        others={others}
        value={value}
        sudokuIndex={sudokuIndex}
        userColors={userColors}
        className={immutableStyles}
      />
    )
  }

  const cellClassName = cn(sharedClassName, {
    "text-correct": valid && validateMode,
    "text-incorrect": !valid && validateMode,
    "bg-primary/15": otherCellWithSameValue,
    "bg-correct/25": currentSelectedCell
  })

  return (
    <MutableCell
      onClick={handleClick}
      value={value}
      sudokuIndex={sudokuIndex}
      others={others}
      userColors={userColors}
      className={cellClassName}
    />
  )
}
