import { Chat } from "@/_components/chat"
import { GameSettings } from "@/_components/game-settings"
import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { Mistakes } from "@/_components/mistakes"
import { ModeToggle } from "@/_components/mode-toggle"
import { Numpad } from "@/_components/num-pad"
import { SidePanel } from "@/_components/side-panel"
import { Table } from "@/_components/sudoku/table"
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
      <div className="grid grid-cols-6 p-2 gap-2 sm:p-6 sm:gap-4 sm:border sm:rounded-xl sm:shadow bg-card">
        <div className="col-span-6 flex justify-between items-center h-8 order-1 sm:border-b sm:pb-4">
          <Timer />
          <Mistakes />
          <div className="flex gap-1">
            <ModeToggle />
            <GameSettings />
          </div>
        </div>
        <div className="col-span-1 order-4 sm:col-span-1 sm:order-2 rounded space-y-3 hidden sm:grid h-full p-3 border">
          <SidePanel />
        </div>
        <NotesProvider>
          <TableCellProvider>
            <div className="col-span-6 order-2 sm:col-span-3 sm:order-3 sm:p-0 size-full flex place-items-center">
              <div className="size-full flex place-items-center">
                <Table />
              </div>
            </div>
            <div className="sm:hidden col-span-6 order-3 px-1 my-4">
              <div className="flex gap-2 w-full">
                <Numpad />
              </div>
            </div>
            <div className="sm:col-span-2 sm:order-4 col-span-6 order-5 flex flex-col gap-1 sm:grid size-full mt-2 sm:m-0">
              <Chat />
              <div className="sm:grid grid-cols-5 gap-2 max-h-full h-full hidden">
                <Numpad />
              </div>
            </div>
            <div className="sm:col-span-3 sm:col-start-2 col-span-6 flex justify-around items-center sm:order-5 order-3 mt-1">
              <Toolbar />
            </div>
          </TableCellProvider>
        </NotesProvider>
      </div>
    </LiveblocksRoom>
  )
}
