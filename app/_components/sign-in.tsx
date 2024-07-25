"use client"

import { Button } from "@/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/card"
import { Input } from "@/shadcn/input"
import { Label } from "@/shadcn/label"
import { useState } from "react"
import { cn, randomId } from "@/lib/utils"
import { useRouter } from "next/navigation"

import { ToggleGroup, ToggleGroupItem } from "@/shadcn/toggle-group"

export function SignInForm() {
  const [name, setName] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [touched, setTouched] = useState(false)
  const router = useRouter()

  const onSubmitHandler = () => {
    if (!name || !difficulty) {
      return
    }
    const roomId = randomId(23)

    router.push(`/room/${roomId}`)
  }

  const isInvalid = touched && name.trim() === ""

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sudoku</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="email"
              type="text"
              required
              value={name}
              className={cn(isInvalid && "border-red-500 focus:ring-red-500")}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
            />
            {isInvalid && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Difficulty</Label>
            <ToggleGroup
              type="single"
              className="flex-col w-full items-start"
              onValueChange={(type) => setDifficulty(type)}
            >
              <ToggleGroupItem
                value="easy"
                aria-label="Toggle bold"
                className="w-full"
              >
                <div>Easy</div>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="medium"
                aria-label="Toggle italic"
                className="w-full"
              >
                <div>Medium</div>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="hard"
                aria-label="Toggle underline"
                className="w-full"
              >
                <div>Hard</div>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Button type="submit" className="w-full" onClick={onSubmitHandler}>
            Start game
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
