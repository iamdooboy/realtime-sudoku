import { randomId } from "@/lib/utils"
import { liveblocks } from "@/liveblocks.server.config"

export async function POST(request: Request) {
  const res = await request.json()

  console.log(res)

  // generate random user
  const user = {
    //id: randomId(30),
    id: "1",
    info: {
      name: "Guest",
      avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${randomId(4)}`
    }
  }

  // Start an auth session inside your endpoint

  const session = liveblocks.prepareSession(user.id, { userInfo: user.info })

  session.allow(res.room, session.FULL_ACCESS)

  // Authorize the user and return the result
  const { status, body } = await session.authorize()
  return new Response(body, { status })
}
