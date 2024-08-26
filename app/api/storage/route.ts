import { liveblocks } from "@/liveblocks.server.config"
import {
  LiveList,
  LiveObject,
  PlainLsonObject,
  toPlainLson
} from "@liveblocks/client"
import { generateSudoku } from "@/lib/utils"

export async function POST(req: Request) {
  const body = await req.text()

  if (!body) Response.error()

  const { id, difficulty } = JSON.parse(body)

  const game = new LiveObject({
    time: 0,
    isRunning: true,
    isSolved: false,
    sudoku: generateSudoku(difficulty),
    mistakeCount: 0,
    validateMode: false,
    undoHistory: new LiveList<LiveObject<HistoryStack>>([]),
    redoHistory: new LiveList<LiveObject<HistoryStack>>([])
  })

  const root = toPlainLson(game) as PlainLsonObject

  try {
    await liveblocks.initializeStorageDocument(id, root)

    return Response.json({ message: "Storage is initialized" })
  } catch (error) {
    return Response.error()
  }
}
