import { NoteContext, NumPadContext, TableCellContext } from "@/app/_context/game-context"
import { useContext } from "react"

export const useGame = () => {
  return {
    noteContext: useContext(NoteContext),
    tableCellContext: useContext(TableCellContext),
    NumPadContext: useContext(NumPadContext)
  }
}
