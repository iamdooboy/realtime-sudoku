import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSudoku } from "./sudoku"
import { LiveList, LiveObject } from "@liveblocks/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const randomId = (count: number) => {
  return "x".repeat(23).replace(/[x]/g, () => {
    return ((Math.random() * 16) | 0).toString(16)
  })
}

export const generateSudoku = (difficulty: string) => {
  let sudokuGame = getSudoku()
  let str = sudokuGame.generate(difficulty)
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
