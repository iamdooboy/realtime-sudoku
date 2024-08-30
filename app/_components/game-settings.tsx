"use client"

import { CardDescription, CardTitle } from "@/shadcn/card"
import { Label } from "@/shadcn/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/popover"
import { Switch } from "@/shadcn/switch"
import { useStorage } from "@liveblocks/react/suspense"
import { useMutation } from "@liveblocks/react/suspense"
import { Settings } from "lucide-react"

export function GameSettings() {
  const validateMode = useStorage((root) => root.validateMode)

  const toggleValidateMode = useMutation(({ storage }, checked: boolean) => {
    storage.set("validateMode", !checked)
  }, [])

  return (
    <Popover>
      <PopoverTrigger>
        <Settings className="w-6 h-6" />
      </PopoverTrigger>
      <PopoverContent>
        <CardTitle className="text-lg">Game Settings</CardTitle>
        <CardDescription>
          These settings affect all players in the game
        </CardDescription>
        <div className="flex items-center justify-between space-x-2 mt-4">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Check entries </span>
            <span className="font-normal leading-snug text-muted-foreground">
              Marks numbers in red (incorrect) or blue (correct).
            </span>
          </Label>
          <Switch
            checked={validateMode}
            onCheckedChange={() => toggleValidateMode(validateMode)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
