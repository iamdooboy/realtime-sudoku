"use client"

import { PropsWithChildren, createContext, useState } from "react"

type NotesContextProps = {
  notesMode: boolean
  toggleNotesMode: () => void
}

export const NotesContext = createContext<NotesContextProps>({
  notesMode: false,
  toggleNotesMode: () => {}
})

export const NotesProvider = ({ children }: PropsWithChildren) => {
  const [notesMode, setNotesMode] = useState(false)

  const toggleNotesMode = () => {
    setNotesMode((prev) => !prev)
  }

  return (
    <NotesContext.Provider value={{ notesMode, toggleNotesMode }}>
      {children}
    </NotesContext.Provider>
  )
}
