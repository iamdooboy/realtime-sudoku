"use client"

import React, { useEffect, useRef, useState } from "react"
import { ScrollArea } from "./shadcn/scroll-area"
import { Input } from "./shadcn/input"
import {
  useSelf,
  useMutation,
  useStorage,
  useUpdateMyPresence
} from "@liveblocks/react/suspense"
import { LiveObject } from "@liveblocks/client"
import { ArrowUpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/avatar"
import { Label } from "./shadcn/label"
import { cn } from "@/lib/utils"
import clsx from "clsx"

export const Chat = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState("")

  const messages = useStorage((root) => root.messages)
  const updateMyPresence = useUpdateMyPresence()
  const user = useSelf()

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      )
      if (scrollableElement) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight
      }
    }
  }, [messages])

  const addMessage = useMutation(({ storage }, input: string) => {
    if (!input) return
    const data = new LiveObject({
      user: user?.info.name,
      text: input
    })
    storage?.get("messages")?.push(data)

    inputRef.current?.focus()
    setInput("")
    updateMyPresence({ isTyping: false })
  }, [])

  const clear = useMutation(({ storage }) => {
    storage?.get("messages").clear()
  }, [])

  return (
    <div className="h-full flex flex-col rounded border justify-between">
      <ScrollArea ref={scrollAreaRef} className="flex-grow h-full sm:h-80 p-1">
        {messages?.map((message, index) => {
          const isConsecutive =
            index > 0 && messages[index - 1].user === message.user
          return (
            <div key={index} className="flex p-1 items-center">
              {!isConsecutive && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${message.user}`}
                  />
                  <AvatarFallback>{message.user}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn({
                  "ml-11": isConsecutive,
                  "ml-3": !isConsecutive
                })}
              >
                {!isConsecutive && (
                  <Label className="font-bold">{message.user}</Label>
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          )
        })}
      </ScrollArea>
      <div className="w-full p-2 flex items-center justify-center relative">
        <Input
          id="name"
          type="text"
          ref={inputRef}
          className="peer border rounded-lg shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-ring"
          placeholder="Message"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            updateMyPresence({ isTyping: true })
          }}
          onKeyDown={(e) => e.key === "Enter" && addMessage(input)}
          onBlur={() => updateMyPresence({ isTyping: false })}
        />
        <button
          onMouseDown={(e) => addMessage(input)}
          className="peer-placeholder-shown:opacity-0 transition-opacity duration-200 ease-in-out"
        >
          <ArrowUpCircle className="fill-blue-500 stroke-white absolute right-4 top-4 h-6 w-6" />
        </button>
        {/* <button onClick={clear}>clear</button> */}
      </div>
    </div>
  )
}
