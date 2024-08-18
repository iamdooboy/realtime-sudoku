"use client"
import React, { useEffect, useRef, useState } from "react"
import { ScrollArea } from "./shadcn/scroll-area"
import { Button } from "./shadcn/button"
import { Input } from "./shadcn/input"
import { cn } from "@/lib/utils"

interface Message {
  user: string
  content: string
}

export const Chat = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const data: Message[] = [
    {
      user: "User 1",
      content:
        "This is a message This is a message This is a message This is a message"
    },
    {
      user: "User 1",
      content:
        "This is a message This is a message This is a message This is a message"
    },
    {
      user: "User 1",
      content:
        "This is a message This is a message This is a message This is a message"
    },
    {
      user: "User 1",
      content:
        "This is a message This is a message This is a message This is a message"
    },
    // ... more messages ...
    { user: "User 1", content: "This is the newest message" }
  ]

  const [messages, setMessages] = useState<Message[]>(data)

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

  const addMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        user: "User 1",
        content: `New message ${prevMessages.length + 1}`
      }
    ])
  }

  return (
    <div className="h-3/4 flex flex-col rounded bg-muted">
      <ScrollArea ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn("p-2 border-b", {
              "border-b-0": index === messages.length - 1
            })}
          >
            <span className="font-bold">{message.user}: </span>
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <div className="flex w-full max-w-sm items-center space-x-2 p-1">
        <Input className="border" type="email" placeholder="Message" />
        <Button type="submit">Send</Button>
      </div>
    </div>
  )
}
