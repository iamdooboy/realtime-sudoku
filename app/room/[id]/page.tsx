import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { SidePanel } from '@/_components/side-panel'
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
        <div className="flex gap-5">
          <Table />
          <SidePanel />
        </div>
      </GameProvider>
    </LiveblocksRoom>
  )
}
