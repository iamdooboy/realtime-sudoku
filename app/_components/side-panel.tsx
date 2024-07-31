"use client"

import { NumberPad } from "./num-pad"
import { Toolbar } from "./toolbar"

export const SidePanel = () => {
  return (
    <div className="space-y-4 flex flex-col justify-start">
      <Toolbar />
      <NumberPad
      // index={selectedIndex}
      // sudoku={sudoku}
      // addNotes={notesToggle}
      // selectNum={onClickSelectNum}
      />
    </div>
  )
}
