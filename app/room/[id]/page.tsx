import { Complete } from "@/_components/complete"
import { EraseButton } from "@/_components/erase-button"
import { GameSettings } from "@/_components/game-settings"
import { ListUsers } from "@/_components/list-users"
import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { Mistakes } from "@/_components/mistakes"
import { Numpad } from "@/_components/num-pad-test"
import { PlayButton } from "@/_components/play-button"
import { SidePanel } from "@/_components/side-panel"
import { Table } from "@/_components/sudoku/table"
import { Timer } from "@/_components/timer"
import { Toolbar } from "@/_components/toolbar"
import { GameProvider } from "@/app/_context/game-context"
import { TableCellProvider } from "@/app/_context/table-cell-context"
import { TimeProvider } from "@/app/_context/time-context"
import { NotesProvider } from "@/app/_context/notes-context"
import { Button } from "@/shadcn/button"
import { ScrollArea } from "@/shadcn/scroll-area"
import { Chat } from "@/_components/chat"
import { GRID_SIZE } from "@/utils/constants"
import clsx from "clsx"
export default async function Room({
  params
}: {
  params: { id: string }
}) {
  return (
    <LiveblocksRoom roomId={params.id}>
      <div className="grid grid-cols-6 gap-4">
        <div className="px-2 bg-muted rounded col-span-6 flex justify-between items-center h-8 order-1">
          <Timer />
          <Mistakes />
          <GameSettings />
        </div>
        <div className="bg-muted rounded p-2 space-y-3 sm:col-span-1 col-span-2 sm:order-2 order-4">
          <ListUsers />
        </div>
        <NotesProvider>
          <TableCellProvider>
            <div className="sm:col-span-3 col-span-6 sm:order-3 order-2 w-full h-full flex items-center justify-center">
              <div className="w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center aspect-square">
                <Table />
              </div>
            </div>
            <div className="sm:col-span-2 col-span-4 flex flex-col gap-1 max-h-[504px] sm:order-4 order-5 h-full">
              <Chat />
              <div className="grid grid-cols-5 grid-rows-2 gap-2 justify-evenly h-1/4">
                <Numpad />
                <EraseButton />
              </div>
            </div>
            <div className="sm:col-span-3 sm:col-start-2 col-span-6 flex justify-around items-center sm:order-5 order-3">
              <Toolbar />
            </div>
          </TableCellProvider>
        </NotesProvider>
      </div>
    </LiveblocksRoom>
  )
}
