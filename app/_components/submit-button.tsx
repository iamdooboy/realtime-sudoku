import { Button } from "@/shadcn/button"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, CircleDashed } from "lucide-react"

type SubmitButtonProps = {
  loadingText: string
  isDisabled?: boolean
}

export const SubmitButton = ({
  loadingText,
  isDisabled = false
}: SubmitButtonProps) => {
  return (
    <Button disabled={isDisabled} type="submit" className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={loadingText}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.1 }}
          className="flex items-center justify-center gap-1"
        >
          {loadingText === "Creating game..." ? (
            <>
              <CircleDashed className="h-4 w-4 animate-spin" />
              {loadingText}
            </>
          ) : (
            <>
              {loadingText === "Game created!" && (
                <CheckCircle className="h-4 w-4" />
              )}
              {loadingText}
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
