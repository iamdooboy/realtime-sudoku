"use client"
import React, { useEffect, useRef, useState } from "react"
import { ScrollArea } from "./shadcn/scroll-area"
import { Button } from "./shadcn/button"
import { Input } from "./shadcn/input"
import { cn } from "@/lib/utils"
import { useMutation, useStorage } from "@liveblocks/react"
import { LiveObject } from "@liveblocks/client"
import { SendHorizonal } from "lucide-react"
import { get } from "http"

interface Message {
  user: string
  content: string
}

export const Chat = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const messages = useStorage((root) => root.messages)

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

  const addMessage = useMutation(({ storage }) => {
    const messages = storage?.get("messages")
    const data = new LiveObject({
      user: "User 1",
      text: "This is a message"
    })
    messages?.push(data)
  }, [])

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
            <span className="text-sm">
              {"<" + message.user + "> "}
            </span>
            {message.text}
          </div>
        ))}
      </ScrollArea>
      <div className="flex w-full items-center space-x-2 p-1">
        <Input
          className="border rounded-full shadow-sm"
          placeholder="Message"
        />
        <Button variant="ghost" size="icon" onClick={addMessage}>
          <SendHorizonal />
        </Button>
        <Button variant={"destructive"} onClick={clear}>
          Clear
        </Button>
      </div>
    </div>
  )
}
