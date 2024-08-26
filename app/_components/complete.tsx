import { DIFFICULTIES } from "@/utils/constants"
import { Button } from "./shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./shadcn/dropdown-menu"
import SparklesText from "./sparkles-text"
import { useMutation } from "@liveblocks/react/suspense"

export function Complete() {
  const startNewGame = useMutation(({ storage }, difficulty: string) => {}, [])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 w-full h-full justify-center bg-background border shadow">
      <SparklesText text="g g" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>New Game</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {DIFFICULTIES.map((difficulty) => (
            <DropdownMenuItem
              key={difficulty}
              className="cursor-pointer"
              onClick={() => startNewGame(difficulty)}
            >
              {difficulty}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
