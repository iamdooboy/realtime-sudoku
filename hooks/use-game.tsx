import {
  ToolbarContext,
  NumPadContext,
  TableCellContext
} from "@/app/_context/game-context"
import { useContext } from "react"

export const useGame = () => {
  return {
    toolbarContext: useContext(ToolbarContext),
    tableCellContext: useContext(TableCellContext),
    numpadContext: useContext(NumPadContext)
  }
}
