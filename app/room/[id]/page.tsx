import { LiveblocksRoom } from "@/_components/liveblocks-room"
export default async function Room({
  params
}: {
  params: { id: string }
}) {
  console.log(params)
  return (
    <LiveblocksRoom roomId={params.id}>
      <div>hello</div>
    </LiveblocksRoom>
  )
}
