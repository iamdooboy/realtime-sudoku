import { Chat } from "@/_components/chat"
import { GameSettings } from "@/_components/game-settings"
import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { Mistakes } from "@/_components/mistakes"
import { ModeToggle } from "@/_components/mode-toggle"
import { Numpad } from "@/_components/num-pad"
import { SidePanel } from "@/_components/side-panel"
import { Sudoku } from "@/_components/sudoku/sudoku"
import { Timer } from "@/_components/timer"
import { Toolbar } from "@/_components/toolbar"
import { NotesProvider } from "@/app/_context/notes-context"
import { TableCellProvider } from "@/app/_context/table-cell-context"

export default async function Room({
  params
}: {
  params: { id: string }
}) {
  return (
    <LiveblocksRoom roomId={params.id}>
      <div className="grid grid-cols-6 gap-2 px-2 pt-2 pb-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow">
        <div className="order-1 col-span-6 flex h-8 items-center justify-between sm:border-b sm:pb-4">
          <Timer />
          <Mistakes />
          <div className="flex gap-1">
            <ModeToggle />
            <GameSettings />
          </div>
        </div>
        <div className="order-4 col-span-1 hidden h-full space-y-3 rounded border p-3 sm:order-2 sm:col-span-1 sm:grid">
          <SidePanel />
        </div>
        <NotesProvider>
          <TableCellProvider>
            <div className="order-2 col-span-6 flex size-full place-items-center sm:order-3 sm:col-span-3 sm:p-0">
              <div className="flex size-full place-items-center">
                <Sudoku />
              </div>
            </div>
            <div className="order-3 col-span-6 my-4 px-1 sm:hidden">
              <div className="flex w-full gap-2">
                <Numpad />
              </div>
            </div>
            <div className="order-5 col-span-6 mt-2 flex size-full flex-col gap-1 sm:order-4 sm:col-span-2 sm:m-0 sm:grid">
              <Chat />
              <div className="hidden h-full max-h-full grid-cols-5 gap-2 sm:grid">
                <Numpad />
              </div>
            </div>
            <div className="order-3 col-span-6 mt-1 flex items-center justify-around sm:order-5 sm:col-span-3 sm:col-start-2">
              <Toolbar />
            </div>
          </TableCellProvider>
        </NotesProvider>
      </div>
    </LiveblocksRoom>
  )
}
