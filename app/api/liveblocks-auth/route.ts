import { Liveblocks } from "@liveblocks/node"
import { randomId } from "@/lib/utils"

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string
})

export async function POST(request: Request) {
  const { room } = await request.json()

  // generate random user
  const user = {
    id: randomId(30),
    info: {
      name: "Guest",
      avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${randomId(4)}`
    }
  }

  // Start an auth session inside your endpoint

  const session = liveblocks.prepareSession(user.id, { userInfo: user.info })

  session.allow(room, session.FULL_ACCESS)

  // Authorize the user and return the result
  const { status, body } = await session.authorize()
  return new Response(body, { status })
}
