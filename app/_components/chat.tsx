"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/avatar"
import { Input } from "@/shadcn/input"
import { Label } from "@/shadcn/label"
import { ScrollArea } from "@/shadcn/scroll-area"
import { LiveObject, shallow } from "@liveblocks/client"
import {
  useMutation,
  useOthers,
  useSelf,
  useStorage,
  useUpdateMyPresence
} from "@liveblocks/react/suspense"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpCircle } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { AvatarStack } from "./avatar-stack"

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

  const addMessage = useMutation(
    (
      { storage },
      input: string,
      e?:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      e?.preventDefault()
      if (!input) return
      const data = new LiveObject({
        user: user?.info.name,
        avatar: user?.info.avatar,
        text: input
      })
      storage?.get("messages")?.push(data)

      inputRef.current?.focus()
      setInput("")
      updateMyPresence({ isTyping: false })
    },
    []
  )

  return (
    <div className="flex h-full w-full flex-col justify-between rounded border">
      <div className="w-full border-b p-2 shadow-sm">
        <AvatarStack />
      </div>
      <ScrollArea ref={scrollAreaRef} className="relative h-[256px] p-1">
        {messages?.map((message, index) => {
          const isConsecutive =
            index > 0 && messages[index - 1].user === message.user
          return (
            <div key={index} className="z-0 flex items-center p-1">
              {!isConsecutive && (
                <Avatar className="mt-1 h-8 w-8">
                  <AvatarImage src={message.avatar} />
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
                <p className="break-all text-sm">{message.text}</p>
              </div>
            </div>
          )
        })}
      </ScrollArea>
      <div className="relative flex w-full items-center justify-center p-2">
        <WhoIsTyping />
        <Input
          id="name"
          type="text"
          ref={inputRef}
          className="peer z-10 rounded-lg border shadow-sm focus:border-ring focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Message"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            updateMyPresence({ isTyping: true })
          }}
          onKeyDown={(e) => e.key === "Enter" && addMessage(input, e)}
          onBlur={() => updateMyPresence({ isTyping: false })}
        />
        <button
          onMouseDown={(e) => addMessage(input, e)}
          className="z-20 transition-opacity duration-200 ease-in-out peer-placeholder-shown:opacity-0"
        >
          <ArrowUpCircle className="absolute top-4 right-4 h-6 w-6 fill-blue-500 stroke-white" />
        </button>
      </div>
    </div>
  )
}

function WhoIsTyping() {
  const typingUsers = useOthers(
    (others) => others.filter((other) => other.presence.isTyping),
    shallow
  )
  return (
    <div className="-top-3 absolute right-0 mr-3 text-muted-foreground text-xs">
      {typingUsers.length > 0 && (
        <AnimatePresence>
          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {typingUsers.length > 1
              ? "Several people are typing"
              : typingUsers[0].info.name + " is typing"}
            <div className="animate-bounce [animation-delay:-0.3s]">.</div>
            <div className="animate-bounce [animation-delay:-0.13s]">.</div>
            <div className="animate-bounce">.</div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
