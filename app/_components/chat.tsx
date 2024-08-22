"use client"

import React, { useEffect, useRef, useState } from "react"
import { ScrollArea } from "./shadcn/scroll-area"
import { Input } from "./shadcn/input"
import { useMutation, useStorage } from "@liveblocks/react"
import { LiveObject } from "@liveblocks/client"
import { ArrowUpCircle } from "lucide-react"
import { useSelf } from "@liveblocks/react/suspense"

export const Chat = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const messages = useStorage((root) => root.messages)
  const user = useSelf()

  const [input, setInput] = useState("")

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

  const addMessage = useMutation(
    (
      { storage },
      input: string,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault()
      if (!input) return
      const data = new LiveObject({
        user: user?.info.name,
        text: input
      })
      storage?.get("messages")?.push(data)

      inputRef.current?.focus()
      setInput("")
    },
    []
  )

  const clear = useMutation(({ storage }) => {
    storage?.get("messages").clear()
  }, [])

  if (!messages) {
    console.log("no messages")
    return (
      <div className="h-full sm:h-3/4 flex flex-col rounded bg-muted">
        <div className="w-full h-full">No messages</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col rounded border justify-between">
      <ScrollArea ref={scrollAreaRef} className="flex-grow h-full sm:h-80 p-1">
        {messages.map((message, index) => (
          <div key={index} className="p-2 font-mono">
            <span className="text-sm">{"<" + message.user + "> "}</span>
            {message.text}
          </div>
        ))}
      </ScrollArea>
      <div className="relative w-full p-2 flex items-center justify-center">
        <Input
          id="name"
          type="text"
          ref={inputRef}
          className="peer border rounded-full shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-ring"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onMouseDown={(e) => addMessage(input, e)}
          className="peer-placeholder-shown:opacity-0 transition-opacity duration-200 ease-in-out"
        >
          <ArrowUpCircle className="fill-blue-500 stroke-white absolute right-4 top-4 h-6 w-6" />
        </button>
        <button onClick={clear}>clear</button>
      </div>
    </div>
  )
}
