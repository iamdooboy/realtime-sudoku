import { liveblocks } from "@/liveblocks.server.config"

export async function POST(req: Request) {
  const body = await req.text()

  if (!body) Response.error()

  const { id } = JSON.parse(body)
  try {
    const RoomData = await liveblocks.createRoom(id, {
      defaultAccesses: ["room:write"]
    })
    return Response.json({ roomId: RoomData.id })
  } catch (error) {
    return Response.error()
  }

  // const response = await liveblocks
  //   .createRoom(id, {
  //     defaultAccesses: ["room:write"]
  //   })
  //   .then(
  //     () => {
  //       return NextResponse.json(
  //         { message: "Room created successfully" },
  //         { status: 200 }
  //       )
  //     },
  //     (reject) => {
  //       return NextResponse.json(
  //         { message: "Failed to create room: " + reject.message },
  //         { status: reject.status }
  //       )
  //     }
  //   )

  return Response.json({ message: "Hello, World!" })
}
