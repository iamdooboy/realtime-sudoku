"use client"
import { useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/avatar"
import { useOthersMapped, useSelf } from "@liveblocks/react"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./shadcn/card"

import { Label } from "./shadcn/label"
import { Switch } from "./shadcn/switch"
import { Settings } from "lucide-react"

export function ListUsers() {
  const isMounted = useRef(false)
  const others = useOthersMapped((other) => other.info)
  const currentUser = useSelf()
  useEffect(() => {
    if (isMounted.current) {
      if (others.length > 0) {
        toast(`${others[0][1].name} just joined the game`)
      }
    } else {
      isMounted.current = true
    }
  }, [others])

  const name = localStorage.getItem("name") || ""
  return (
    <div className="space-y-4 bg-muted p-5 max-w-56 w-full">
      <Popover>
        <p className="text-muted-foreground">Currently online</p>
        <div className="flex gap-2 justify-start items-center">
          <Avatar className="w-7 h-7">
            <AvatarImage src={currentUser?.info.avatar} />
            <AvatarFallback>{currentUser?.info.name}</AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center text-lg ">
            {name ? name : currentUser?.info.name} (you)
          </div>
          <PopoverTrigger>
            <Settings className="w-5 h-5 hover:opacity-60" />
          </PopoverTrigger>
          <PopoverContent align="end">
            <CardTitle className="text-lg">User preferences</CardTitle>
            <CardDescription>
              These settings only affect your gameplay.
            </CardDescription>
            <div className="flex flex-col gap-4 mt-4 flex-1">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="highlight" className="flex flex-col space-y-1">
                  <span>Highlight matching numbers</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Highlights all occurrences of the selected cell's number in
                    the grid.
                  </span>
                </Label>
                <Switch id="highlight" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="timer" className="flex flex-col space-y-1">
                  <span>Timer visibility</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Choose to display or hide the game timer while playing.
                  </span>
                </Label>
                <Switch id="timer" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="color" className="flex flex-col space-y-2">
                  <span>Change selected color</span>
                  <div className="flex gap-2">
                    <button className="w-[30px] h-[30px] rounded bg-red-100 hover:bg-red-200" />
                    <button className="w-[30px] h-[30px] rounded bg-orange-100 hover:bg-orange-200" />
                    <button className="w-[30px] h-[30px] rounded bg-yellow-100 hover:bg-yellow-200" />
                    <button className="w-[30px] h-[30px] rounded bg-lime-100 hover:bg-lime-200" />
                    <button className="w-[30px] h-[30px] rounded bg-green-100 hover:bg-green-200" />
                    <button className="w-[30px] h-[30px] rounded bg-blue-100 hover:bg-blue-200" />
                    <button className="w-[30px] h-[30px] rounded bg-violet-100 hover:bg-violet-200" />
                  </div>
                </Label>
              </div>
            </div>
          </PopoverContent>
        </div>
        {others
          .slice(0, 3)
          .reverse()
          .map(([key, info]) => (
            <div key={key} className="flex gap-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src={info.avatar} />
                <AvatarFallback>{info.name}</AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-center text-lg">
                {info.name}
              </div>
            </div>
          ))}
      </Popover>
    </div>
  )
}
