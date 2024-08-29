"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/avatar"
import { useOthersMapped, useSelf } from "@liveblocks/react/suspense"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn/tooltip"
import { AnimatePresence, motion } from "framer-motion"

export function AvatarStack() {
  const others = useOthersMapped((other) => other.info)
  const currentUser = useSelf()

  const animationProps = {
    initial: { width: 0, transformOrigin: "left" },
    animate: { width: "auto", height: "auto" },
    exit: { width: 0 }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex pl-3 justify-end">
        <AnimatePresence>
          {others
            .slice(0, 3)
            .reverse()
            .map(([key, info]) => (
              <motion.div key={key} {...animationProps}>
                <Tooltip key={key}>
                  <TooltipTrigger>
                    <Avatar className="outline-2 outline outline-white dark:outline-slate-900 size-7">
                      <AvatarImage src={info.avatar} />
                      <AvatarFallback>{info.name}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{info.name}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          {currentUser ? (
            <motion.div key="you" {...animationProps}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="outline-2 outline outline-white dark:outline-slate-900 size-7">
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
