import { liveblocks } from "@/liveblocks.server.config"

export async function POST(req: Request) {
  const body = await req.text()

  if (!body) Response.error()

  const { id, difficulty } = JSON.parse(body)
  try {
    //create room
    const room = await liveblocks.createRoom(id, {
      defaultAccesses: ["room:write"]
    })

    const baseUrl = req.url.split("/").slice(0, 3).join("/")

    //initialize storage
    const storage = await fetch(`${baseUrl}/api/storage/`, {
      method: "POST",
      body: JSON.stringify({
        id: room.id,
        difficulty
      })
    })

    return storage
  } catch (error) {
    return Response.error()
  }
}
