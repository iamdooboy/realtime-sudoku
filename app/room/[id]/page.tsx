import { LiveblocksRoom } from "@/_components/liveblocks-room"
export default async function Room({
  params
}: {
  params: { id: string }
}) {
  return (
    <LiveblocksRoom roomId={params.id}>
      <div>hello</div>
    </LiveblocksRoom>
  )
}
