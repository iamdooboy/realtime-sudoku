import { liveblocks } from "@/liveblocks.server.config"
import { getSudoku } from "@/lib/sudoku"
import { LiveList, LiveObject, toPlainLson } from "@liveblocks/client"

const generateSudoku = (difficulty: string) => {
  let sudokuGame = getSudoku()
  let str = sudokuGame.generate(difficulty)
  const solved: any = sudokuGame.solve(str)

  const sudokuGrid = new LiveList<
    LiveObject<{
      value: number
      immutable: boolean
      valid: boolean
      key: number
      notes: LiveList<number>
    }>
  >([])

  str.split("").forEach((value: string, index: number) => {
    const square = new LiveObject({
      value: value === "." ? 0 : Number(value),
      immutable: value === "." ? false : true,
      valid: value === "." ? false : true,
      key: value === "." ? Number(solved[index]) : Number(value),
      notes: new LiveList([0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
    sudokuGrid.push(square)
  })

  return sudokuGrid
}
export async function POST(req: Request) {
  const body = await req.text()

  if (!body) Response.error()

  const { id, difficulty } = JSON.parse(body)

  const game = new LiveObject({
    startTime: Date.now(),
    isPaused: false,
    initialLoad: true,
    isSolved: false,
    sudoku: generateSudoku(difficulty),
    mistakeCount: 0
  })

  const plainLson = toPlainLson(game)

  try {
    const res = await liveblocks.initializeStorageDocument(id, {
      liveblocksType: "LiveObject",
      data: {
        plainLson
      }
    })

    return Response.json({ message: "Storage is initialized" })
  } catch (error) {
    return Response.error()
  }
}
