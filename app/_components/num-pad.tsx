import { Button } from '@/shadcn/button'

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

export function NumberPad({ index, sudoku, addNotes, selectNum }: Prop) {
  const { key } = index !== null && sudoku[index]
  return (
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
        return (
          <Button
            variant="secondary"
            key={num}
            onClick={() => selectNum(index, num, key, addNotes)}
            className="place-content-center place-items-center w-16 h-16 rounded text-2xl"
          >
            {num}
          </Button>
        )
      })}
    </div>
  )
}
