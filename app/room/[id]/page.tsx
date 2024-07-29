import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { Table } from "@/_components/sudoku/table"
import { GameProvider } from "@/app/_context/game-context"
export default async function Room({
  params
}: {
  params: { id: string }
}) {
  return (
    <LiveblocksRoom roomId={params.id}>
      <GameProvider>
        <div className="relative">
          <Table />
          <SidePanel />
        </div>
      </GameProvider>
    </LiveblocksRoom>
  )
}
