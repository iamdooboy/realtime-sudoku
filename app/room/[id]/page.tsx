import { ListUsers } from "@/_components/list-users"
import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { PlayButton } from "@/_components/play-button"
import { SidePanel } from "@/_components/side-panel"
import { Table } from "@/_components/sudoku/table"
import { Timer } from "@/_components/timer"
import { GameProvider } from "@/app/_context/game-context"
export default async function Room({
  params
}: {
  params: { id: string }
}) {
  return (
    <LiveblocksRoom roomId={params.id}>
      <GameProvider>
        <div className="flex gap-5 max-w-screen-2xl w-full justify-center">
          <ListUsers />
          <div className="flex flex-col gap-2">
            <Timer />
            <Table />
            <PlayButton />
          </div>
          <div className="flex flex-col gap-2">
            <SidePanel />
          </div>
        </div>
      </GameProvider>
    </LiveblocksRoom>
  )
}
