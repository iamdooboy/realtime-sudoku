"use client"

import { Button } from "@/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/card"
import { Input } from "@/shadcn/input"
import { Label } from "@/shadcn/label"
import { useState } from "react"
import { randomId } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ToggleGroup, ToggleGroupItem } from "@/shadcn/toggle-group"

export function SignInForm() {
  const [difficulty, setDifficulty] = useState("")
  const [input, setInput] = useState("")

  const router = useRouter()

  const onSubmitHandler = async () => {
    if (!input || !difficulty) {
      return
    }

    localStorage.setItem("name", input)
    const id = randomId(23)

    try {
      //create room and initialize storage
      const response = await fetch("/api/rooms/", {
        method: "POST",
        body: JSON.stringify({
          id,
          difficulty
        })
      })

      if (response.ok) {
        router.push(`/room/${id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="te-2xl">Sudoku</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Enter your name"
              minLength={1}
              id="name"
              type="text"
              required
              value={input}
              className="[&:user-invalid:not(:focus)]:border-red-500 peer"
              onChange={(e) => setInput(e.target.value)}
            />
            <p className="text-red-500 hidden text-sm peer-[&:user-invalid:not(:focus)]:block">
              This field is required
            </p>
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
