import { GameSettings } from "@/_components/game-settings"
import { ListUsers } from "@/_components/list-users"
import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { Mistakes } from "@/_components/mistakes"
import { Numpad } from "@/_components/num-pad"
import { Table } from "@/_components/sudoku/table"
import { Timer } from "@/_components/timer"
import { Toolbar } from "@/_components/toolbar"
import { TableCellProvider } from "@/app/_context/table-cell-context"
import { NotesProvider } from "@/app/_context/notes-context"
import { Chat } from "@/_components/chat"
export default async function Room({
  params
}: {
  params: { id: string }
}) {
  return (
    <LiveblocksRoom roomId={params.id}>
      <div className="grid grid-cols-6 sm:gap-4">
        <div className="rounded col-span-6 flex justify-between items-center h-8 order-1 border-b-1">
          <Timer />
          <Mistakes />
          <GameSettings />
        </div>
        <div className="rounded space-y-3 sm:col-span-1 col-span-1 sm:order-2 order-4 hidden sm:grid sm:max-h-[504px] h-full">
          <ListUsers />
        </div>
        <NotesProvider>
          <TableCellProvider>
            <div className="sm:col-span-3 col-span-6 sm:order-3 order-2 w-full h-full flex place-items-center p-1 sm:p-0">
              <div className="w-full h-full flex place-items-center">
                <Table />
              </div>
            </div>
            <div className="sm:hidden col-span-6 order-3 px-1 my-4">
              <div className="flex gap-2 w-full">
                <Numpad />
              </div>
            </div>
            <div className="sm:col-span-2 col-span-5 flex-col gap-1 sm:max-h-[504px] sm:order-4 order-5 w-full h-full hidden sm:grid">
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
