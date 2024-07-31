import { Button } from "@/shadcn/button"
import { useGame } from "@/hooks/use-game"
import { clsx } from "clsx"

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

type NumberPadProps = {
  notesMode: boolean
  numPad: number
  index: number | undefined
}

export function NumberPad() {
  const { numpadContext, tableCellContext, toolbarContext } = useGame()

  const { index } = tableCellContext?.tableCell
  const { notesMode, addNotes } = toolbarContext

  const onClickHandler = (numPadProps: NumberPadProps) => {
    const { notesMode, numPad, index } = numPadProps
    if (!index) return
    if (notesMode) {
      addNotes({ numPad, index })
      return
    }

    numpadContext.selectNum({ numPad, index })
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numPad) => {
        return (
          <Button
            variant="secondary"
            key={numPad}
            onClick={() => onClickHandler({ notesMode, index, numPad })}
            className={clsx("w-16 h-16 rounded ", {
              "grid grid-cols-3 grid-rows-3": notesMode
            })}
          >
            {!notesMode ? (
              <p className="text-2xl transition-all duration-200 ease-in-out">
                {numPad}
              </p>
            ) : (
              <p
                className={clsx(
                  "p-[2px] text-sm text-center transition-all duration-200 ease-in-out",
                  {
                    "col-start-1 row-start-1": numPad === 1,
                    "col-start-2 row-start-1": numPad === 2,
                    "col-start-3 row-start-1": numPad === 3,
                    "col-start-1 row-start-2": numPad === 4,
                    "col-start-2 row-start-2": numPad === 5,
                    "col-start-3 row-start-2": numPad === 6,
                    "col-start-1 row-start-3": numPad === 7,
                    "col-start-2 row-start-3": numPad === 8,
                    "col-start-3 row-start-3": numPad === 9
                  }
                )}
              >
                {numPad}
              </p>
            )}
          </Button>
        )
      })}
    </div>
  )
}
