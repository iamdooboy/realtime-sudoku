"use client"
import { useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/avatar"
import { useOthersMapped, useSelf } from "@liveblocks/react"
import { toast } from "sonner"

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
    <div className="space-y-4 bg-muted p-5 max-w-52 w-full">
      <p className="text-muted-foreground">Currently online</p>
      <div className="flex gap-2">
        <Avatar className="w-7 h-7">
          <AvatarImage src={currentUser?.info.avatar} />
          <AvatarFallback>{currentUser?.info.name}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center text-lg ">
          {name ? name : currentUser?.info.name} (you)
        </div>
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
    </div>
  )
}
