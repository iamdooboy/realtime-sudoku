import React, { FormEvent, ReactNode } from "react"
type GameDialogProps = {
  children: ReactNode
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

export const GameDialog = ({ children, onSubmit }: GameDialogProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <div className="w-full">
            <h1 className="w-full text-xl tracking-widest">Realtime</h1>
            <h1 className="w-full font-bold text-3xl tracking-tighter">
              Sudoku
            </h1>
          </div>
        </div>
        <div className="grid gap-4">{children}</div>
      </div>
    </form>
  )
}
