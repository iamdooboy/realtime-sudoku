"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/avatar"
import { Button } from "@/shadcn/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shadcn/dialog"
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger
} from "@/shadcn/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn/tooltip"
import { useSelf } from "@liveblocks/react/suspense"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Link } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { useOthersInfo } from "../hooks/use-other-info"

export function AvatarStack() {
  const others = useOthersInfo()

  const animationProps = {
    initial: { width: 0, transformOrigin: "left" },
    animate: { width: "auto", height: "auto" },
    exit: { width: 0 }
  }

  const currentUser = useSelf()

  return (
    <TooltipProvider delayDuration={0}>
      <Popover>
        <div className="flex items-center sm:justify-end">
          <InviteDialog />
          <AnimatePresence>
            {others
              .slice(0, others.length)
              .reverse()
              .map(([key, { name, avatar, color }]) => (
                <motion.div
                  key={key}
                  {...animationProps}
                  className="flex justify-center"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <PopoverTrigger asChild>
                        <Avatar
                          style={{
                            outlineColor: color
                          }}
                          className={cn(
                            "size-7 border-2 border-primary-foreground outline outline-3"
                          )}
                        >
                          <AvatarImage src={avatar} />
                          <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                    <PopoverContent className="w-auto px-3 py-1.5 text-sm">
                      <PopoverArrow className="fill-border" />
                      <p>{name}</p>
                    </PopoverContent>
                  </Tooltip>
                </motion.div>
              ))}
            {currentUser ? (
              <motion.div
                key="you"
                {...animationProps}
                className="flex justify-center"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="size-7 border-2 border-primary-foreground outline outline-3 outline-blue-500">
                      <AvatarImage src={currentUser.info.avatar} />
                      <AvatarFallback>{currentUser.info.name}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Popover>
    </TooltipProvider>
  )
}

const InviteDialog = () => {
  const [copied, setCopied] = useState(false)
  const [fullUrl, setFullUrl] = useState("")
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const pathname = usePathname()

  const animationProps = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: { duration: 0.1 }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.origin + pathname)
    }
  }, [pathname])
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(fullUrl)
        .then(() => {
          setCopied(true)
          if (timeoutId) {
            clearTimeout(timeoutId)
          }
          const id = setTimeout(() => {
            setCopied(false)
          }, 2000)
          setTimeoutId(id)
        })
        .catch((err) => {
          console.error("Failed to copy: ", err)
        })
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea")
      textArea.value = fullUrl
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopied(true)
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        const id = setTimeout(() => {
          setCopied(false)
        }, 2000)
        setTimeoutId(id)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
      document.body.removeChild(textArea)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-auto first:mr-auto sm:hidden">
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share with friends</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Button
              variant="outline"
              className="w-full rounded"
              onClick={copyToClipboard}
              disabled={copied}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    className="flex place-items-center gap-1"
                    {...animationProps}
                  >
                    <Check className="mr-1 size-4" />
                    Copied!
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    className="flex place-items-center gap-1"
                    {...animationProps}
                  >
                    <Link className="mr-1 size-4" />
                    Copy link
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            <p className="text-muted-foreground text-xs">
              Share link to play together
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-1/2">
              <QRCode value={fullUrl} className="size-full" />
            </div>
            <p className="text-muted-foreground text-xs">
              Scan code to join game
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
