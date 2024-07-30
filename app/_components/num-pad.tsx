import { Button } from "@/shadcn/button"
import { useGame } from "@/hooks/use-game"

interface Prop {
  index: number
  sudoku: readonly {
    readonly value: number
    readonly immutable: boolean
    readonly valid: boolean
    readonly key: number
    readonly notes: readonly number[]
  }[]
  addNotes: boolean
  selectNum: (
    index: number,
    num: number,
    key: number,
    addNotes: boolean
  ) => void
}

export function NumberPad() {
  const { NumPadContext, tableCellContext } = useGame()

  const { value, index } = tableCellContext?.tableCell
  //const { key } = index !== null && sudoku[index]
  return (
    <div className="flex gap-10 border-collapse">
      <div className="grid grid-cols-3 gap-3 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numPad) => {
          return (
            <Button
              variant="secondary"
              key={numPad}
              onClick={() => NumPadContext.selectNum({ numPad, value, index })}
              className="place-content-center place-items-center w-16 h-16 rounded text-2xl"
            >
              {numPad}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
