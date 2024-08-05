import { Button } from "@/shadcn/button"
import { useGame } from "@/hooks/use-game"
import { cn } from "@/lib/utils"

type NumberPadProps = {
  notesMode: boolean
  numPad: number
  index: number | null
  value: number | null | readonly number[]
}

export function NumberPad() {
  const { numpadContext, tableCellContext, toolbarContext } = useGame()

  const { index, value } = tableCellContext?.tableCell
  const { notesMode, addNotes } = toolbarContext

  const onClickHandler = (numPadProps: NumberPadProps) => {
    const { notesMode, numPad, index } = numPadProps
    if(index === null) return
    if (notesMode) {
      addNotes({ numPad, index })
      return
    }

    numpadContext.selectNum({ numPad, index, value, notesMode })
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numPad) => {
        return (
          <Button
            variant="secondary"
            key={numPad}
            onClick={() => onClickHandler({ notesMode, index, numPad, value })}
            className={cn("w-16 h-16 rounded ", {
              "grid grid-cols-3 grid-rows-3": notesMode
            })}
          >
            {!notesMode ? (
              <p className="text-2xl transition-all duration-200 ease-in-out">
                {numPad}
              </p>
            ) : (
              <p
                className={cn(
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
