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

export function AvatarStack() {
  const others = useOthersMapped((other) => other.info)
  const currentUser = useSelf()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex pl-3 justify-end">
        <AnimatePresence>
          {others
            .slice(0, 3)
            .reverse()
            .map(([key, info]) => (
              <AvatarTooltip
                key={key}
                avatar={info.avatar}
                name={info.name}
                motionKey={key}
              />
            ))}
          {currentUser ? (
            <AvatarTooltip
              avatar={currentUser.info.avatar}
              name={currentUser.info.name}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}

const AvatarTooltip = ({
  avatar,
  name,
  motionKey = "you"
}: { avatar: string; name: string; motionKey?: string | number }) => {
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
          <Avatar className="outline-2 outline outline-background size-7">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>You</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  )
}
