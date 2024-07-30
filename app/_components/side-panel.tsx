'use client'

import { NumberPad } from './num-pad'

export const SidePanel = () => {
  return (
    <div className="space-y-4 flex flex-col justify-start">
      <NumberPad
        // index={selectedIndex}
        // sudoku={sudoku}
        // addNotes={notesToggle}
        // selectNum={onClickSelectNum}
      />
    </div>
  )
}
