import { useOthersInfo } from "@/app/hooks/use-other-info"
import { cn } from "@/lib/utils"
import { useStorage } from "@liveblocks/react/suspense"
import { ImmutableCell } from "./sudoku-cell/immutable-cell"
import { MutableCell } from "./sudoku-cell/mutable-cell"
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
  const others = useOthersInfo()

  const sudoku = useStorage((root) => root.sudoku)
  const validateMode = useStorage((root) => root.validateMode)

  const { value, immutable, valid } = sudoku[sudokuIndex]
  const sameValue = value === tableCell.value
  const notZero = tableCell.value !== 0
  const currentSelectedCell = tableCell.index === sudokuIndex
  const otherCellWithSameValue = sameValue && notZero && !currentSelectedCell

  const handleClick = () => {
    //deselect cell if already selected
    if (tableCell.index !== null && tableCell.index === sudokuIndex) {
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
      className={cellClassName}
    />
  )
}
