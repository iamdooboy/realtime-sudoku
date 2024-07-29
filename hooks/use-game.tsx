import { NoteContext, TableCellContext } from "@/app/_context/game-context"
import { useContext } from "react"

export const useGame = () => {
  const notes = useContext(NoteContext)
  const cell = useContext(TableCellContext)

  return { notes, cell }
}
