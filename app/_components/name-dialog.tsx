"use client"

import { Button } from "@/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/card"
import { Input } from "@/shadcn/input"
import { Label } from "@radix-ui/react-label"

type NameDialogProps = {
  input: string
  setInput: (input: string) => void
  handleSubmit: () => void
}

export function NameDialog({ input, setInput, handleSubmit }: NameDialogProps) {
  const isValid = input.length >= 1
  return (
    <form onSubmit={handleSubmit}>
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
            <Button disabled={!isValid} type="submit" className="w-full">
              Join game
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
