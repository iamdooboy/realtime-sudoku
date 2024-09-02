"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn/tooltip"
import { useOthersMapped, useSelf } from "@liveblocks/react/suspense"
import { AnimatePresence, motion } from "framer-motion"
import { useColor } from "../hooks/useColor"
import { cn } from "@/lib/utils"

export function AvatarStack() {
  const others = useOthersMapped((other) => ({
    name: other.info.name,
    id: other.connectionId,
    avatar: other.info.avatar
  }))

  const animationProps = {
    initial: { width: 0, transformOrigin: "left" },
    animate: { width: "auto", height: "auto" },
    exit: { width: 0 }
  }

  const userColors = useColor(others)
  const currentUser = useSelf()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex pl-3 justify-end">
        <AnimatePresence>
          {others
            .slice(0, 3)
            .reverse()
            .map(([key, { name, avatar, id }]) => (
              <motion.div
                key={key}
                {...animationProps}
                className="flex justify-center"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar
                      className={cn(
                        "outline-3 outline size-7 outline-correct",
                        userColors.get(id)
                      )}
                    >
                      <AvatarImage src={avatar} />
                      <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
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
                  <Avatar
                    className={cn(
                      "outline-3 outline size-7 outline-correct",
                      userColors.get(currentUser.connectionId)
                    )}
                  >
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
    </TooltipProvider>
  )
}

const AvatarTooltip = ({
  avatar,
  name,
  motionKey = "you",
  id
}: {
  avatar: string
  name: string
  motionKey?: string | number
  id: number
}) => {
  const animationProps = {
    initial: { width: 0, transformOrigin: "left" },
    animate: { width: "auto", height: "auto" },
    exit: { width: 0 }
  }
  return (
    <motion.div
      key={motionKey}
      {...animationProps}
      className="flex justify-center"
    >
      <Tooltip>
        <TooltipTrigger>
          <Avatar
            //className="outline-3 outline size-7 outline-correct"
            className={cn(
              "outline-3 outline size-7 outline-correct",
              userColors.get(id)
            )}
          >
            <AvatarImage src={avatar} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  )
}
