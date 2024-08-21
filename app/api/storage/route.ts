import { liveblocks } from "@/liveblocks.server.config"
import { getSudoku } from "@/lib/sudoku"
import {
  LiveList,
  LiveObject,
  PlainLsonObject,
  toPlainLson
} from "@liveblocks/client"

const generateSudoku = (difficulty: string) => {
  let sudokuGame = getSudoku()
  //change later
  let str = sudokuGame.generate(80)
  const solved: any = sudokuGame.solve(str)

  const sudokuGrid = new LiveList<Cell>([])

  str.split("").forEach((value: string, index: number) => {
    const square = new LiveObject({
      value: value === "." ? 0 : Number(value),
      immutable: value === "." ? false : true,
      valid: value === "." ? false : true,
      key: value === "." ? Number(solved[index]) : Number(value)
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
    time: 0,
    isRunning: false,
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
