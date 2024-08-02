import {
  ToolbarContext,
  NumPadContext,
  TableCellContext,
  TimeContext
} from "@/app/_context/game-context"
import { useContext } from "react"

export const useGame = () => {
  return {
    toolbarContext: useContext(ToolbarContext),
    tableCellContext: useContext(TableCellContext),
    numpadContext: useContext(NumPadContext),
    timeContext: useContext(TimeContext)
  }
}
