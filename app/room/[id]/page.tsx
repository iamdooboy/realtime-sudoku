import { Complete } from '@/_components/complete'
import { GameSettings } from "@/_components/game-settings"
import { ListUsers } from "@/_components/list-users"
import { LiveblocksRoom } from "@/_components/liveblocks-room"
import { Mistakes } from "@/_components/mistakes"
import { PlayButton } from "@/_components/play-button"
import { SidePanel } from "@/_components/side-panel"
import { Table } from "@/_components/sudoku/table"
import { Timer } from "@/_components/timer"
import { GameProvider } from "@/app/_context/game-context"
import { TimeProvider } from "@/app/_context/time-context"
export default async function Room({
  params
}: {
  params: { id: string }
}) {
  return (
    <LiveblocksRoom roomId={params.id}>
      <TimeProvider>
        <GameProvider>
          <div className="flex gap-5 max-w-screen-2xl w-full justify-center">
            <ListUsers />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Timer />
                <Mistakes />
                <GameSettings />
              </div>
              <div className="relative">
                <Table />
                <PlayButton />
                <Complete />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <SidePanel />
            </div>
          </div>
        </GameProvider>
      </TimeProvider>
    </LiveblocksRoom>
  )
}
