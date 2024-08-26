// "use client"

// import { createContext, useState } from "react"
// import {
//   useUpdateMyPresence,
//   useMutation,
//   useStorage
// } from "@liveblocks/react/suspense"
// import { PropsWithChildren } from "react"
// import { LiveList, LiveObject } from "@liveblocks/client"

// type ToolbarContextProps = {
//   canUndo: boolean
//   canRedo: boolean
//   undo: () => void
//   redo: () => void
//   erase: (index: number) => void
//   notesMode: boolean
//   toggleNotesMode: () => void
//   addNotes: (notesProps: NotesProps) => void
// }

// type NotesProps = {
//   index: number
//   numPad: number
// }

// type TableCellProps = {
//   value: number | null | readonly number[] | Notes
//   index: number | null
// }

// type TableCellContextProps = {
//   tableCell: TableCellProps
//   onClickTableCell: ({ value, index }: TableCellProps) => void
// }

// type NumPadContextProps = {
//   selectNum: ({ numPad, index }: SelectNumProps) => void
// }

// type SelectNumProps = {
//   numPad: number | null
//   index: number | null
// }

// type TimeContextProps = {
//   pauseTimer: (elapsedTime: number) => void
//   elapsedTime: number
//   initialLoad: boolean
//   isPaused: boolean
// }

// export const TimeContext = createContext<TimeContextProps>({
//   pauseTimer: () => {},
//   elapsedTime: 0,
//   initialLoad: true,
//   isPaused: false
// })

// export const ToolbarContext = createContext<ToolbarContextProps>({
//   canUndo: false,
//   canRedo: false,
//   undo: () => {},
//   redo: () => {},
//   erase: () => {},
//   notesMode: false,
//   toggleNotesMode: () => {},
//   addNotes: () => {}
// })
// export const TableCellContext = createContext<TableCellContextProps>({
//   tableCell: {
//     value: null,
//     index: null
//   },
//   onClickTableCell: () => {}
// })

// export const NumPadContext = createContext<NumPadContextProps>({
//   //number: null,
//   selectNum: () => {}
// })

// export const GameProvider = ({ children }: PropsWithChildren) => {
//   const updateMyPresence = useUpdateMyPresence()
//   const [notesMode, setNotesMode] = useState(false)
//   const [tableCell, setTableCell] = useState<TableCellProps>({
//     value: null,
//     index: null
//   })

//   const canUndo = useStorage((root) => root.undoHistory.length > 0)
//   const canRedo = useStorage((root) => root.redoHistory.length > 0)

//   const onClickTableCell = ({ value, index }: TableCellProps) => {
//     updateMyPresence({ focusIndex: index })
//     setTableCell({ value, index })
//   }

//   const isGameSolved = (sudoku: Sudoku) => {
//     return sudoku.every((cell) => cell.get("valid") === true)
//   }

//   const selectNum = useMutation(
//     ({ storage }, { numPad, index }: SelectNumProps) => {
//       if (index === null) return
//       const root = storage.get("root")
//       if (!root) return
//       const sudoku = root.get("sudoku")
//       const currentValue = sudoku?.get(index)?.get("value")

//       if (currentValue === numPad) {
//         sudoku.get(index)?.set("value", 0)
//         return
//       }

//       const redoHistory = root.get("redoHistory")
//       const undoHistory = root.get("undoHistory")

//       if (redoHistory.length > 0) {
//         redoHistory.clear()
//       }

//       const cell = root.get("sudoku").get(index!)
//       const valid = cell?.get("key") === numPad

//       if (!valid) {
//         root.set("mistakeCount", root.get("mistakeCount") + 1)
//       }

//       cell?.update({ value: numPad, valid })
//       setTableCell({ value: numPad, index })

//       if (isGameSolved(sudoku)) {
//         storage.get("root").update({
//           isSolved: true,
//           //isPaused: true
//         })
//       }

//       if (currentValue === undefined || currentValue === null) return

//       if (typeof currentValue === "object") {
//         const temp = currentValue.toImmutable()
//         const history = new LiveObject<HistoryStack>({
//           index,
//           valueBefore: new LiveList([...temp]),
//           valueAfter: numPad,
//           mode: "default"
//         })

//         undoHistory.push(history)
//         return
//       }

//       const history = new LiveObject<HistoryStack>({
//         index,
//         valueBefore: currentValue,
//         valueAfter: numPad,
//         mode: "default"
//       })

//       undoHistory.push(history)
//     },
//     []
//   )

//   const redo = useMutation(({ storage }) => {
//     const root = storage.get("root")
//     if (!root) return

//     const undoHistory = root.get("undoHistory")
//     const redoHistory = root.get("redoHistory")
//     const sudoku = root.get("sudoku")

//     if (redoHistory.length === 0) return

//     const lastMove = redoHistory?.get(redoHistory.length - 1)
//     if (!lastMove) return

//     const lastIndex = lastMove?.get("index")
//     const sudokuItem = sudoku.get(lastIndex!)
//     if (!sudokuItem) return

//     const valid = sudokuItem?.get("key") === lastMove?.get("valueBefore")

//     //BEFORE = NUMBER AND AFTER = OBJECT
//     if (
//       typeof lastMove.get("valueAfter") === "object" &&
//       typeof lastMove.get("valueBefore") === "number"
//     ) {
//       const arr = lastMove?.get("valueAfter") as Notes
//       const temp = arr.toImmutable()

//       sudokuItem?.update({
//         value: lastMove?.get("valueBefore"),
//         valid
//       })

//       setTableCell((prevCell) => ({
//         ...prevCell,
//         value: lastMove?.get("valueBefore")
//       }))

//       const undoItem = new LiveObject({
//         index: lastIndex,
//         valueBefore: new LiveList([...temp]),
//         valueAfter: lastMove?.get("valueBefore"),
//         mode: lastMove?.get("mode")
//       })
//       undoHistory.push(undoItem)
//       redoHistory.delete(redoHistory.length - 1)
//       return
//     }

//     //BEFORE = OBJECT AND AFTER = NUMBER
//     if (
//       typeof lastMove.get("valueBefore") === "object" &&
//       typeof lastMove.get("valueAfter") === "number"
//     ) {
//       const arr = lastMove?.get("valueBefore") as Notes
//       const temp = arr.toImmutable()

//       sudokuItem?.update({
//         value: new LiveList([...temp]),
//         valid
//       })

//       setTableCell((prevCell) => ({
//         ...prevCell,
//         value: new LiveList([...temp])
//       }))

//       const undoItem = new LiveObject({
//         index: lastIndex,
//         valueBefore: lastMove?.get("valueAfter"),
//         valueAfter: new LiveList([...temp]),
//         mode: lastMove?.get("mode")
//       })
//       undoHistory.push(undoItem)
//       redoHistory.delete(redoHistory.length - 1)
//       return
//     }

//     ///BEFORE = OBJECT AND AFTER = OBJECT
//     if (
//       typeof lastMove.get("valueBefore") === "object" &&
//       typeof lastMove.get("valueAfter") === "object"
//     ) {
//       const before = lastMove?.get("valueBefore") as Notes
//       const after = lastMove?.get("valueAfter") as Notes

//       const tempBefore = before.toImmutable()
//       const tempAfter = after.toImmutable()

//       sudokuItem?.update({
//         value: new LiveList([...tempBefore]),
//         valid
//       })

//       setTableCell((prevCell) => ({
//         ...prevCell,
//         value: new LiveList([...tempBefore])
//       }))

//       const undoItem = new LiveObject({
//         index: lastIndex,
//         valueBefore: new LiveList([...tempAfter]),
//         valueAfter: new LiveList([...tempBefore]),
//         mode: lastMove?.get("mode")
//       })
//       undoHistory.push(undoItem)
//       redoHistory.delete(redoHistory.length - 1)
//       return
//     }

//     if (lastIndex === undefined || lastIndex === null) return

//     sudokuItem?.update({
//       value: lastMove?.get("valueBefore"),
//       valid
//     })

//     setTableCell((prevCell) => ({
//       ...prevCell,
//       value: lastMove?.get("valueBefore")
//     }))

//     const undoItem = new LiveObject({
//       index: lastIndex,
//       valueBefore: lastMove?.get("valueAfter"),
//       valueAfter: lastMove?.get("valueBefore"),
//       mode: lastMove?.get("mode")
//     })
//     undoHistory.push(undoItem)

//     redoHistory.delete(redoHistory.length - 1)
//   }, [])

//   const undo = useMutation(({ storage }) => {
//     const root = storage.get("root")
//     if (!root) return

//     const undoHistory = root.get("undoHistory")
//     const redoHistory = root.get("redoHistory")
//     const sudoku = root.get("sudoku")

//     if (undoHistory.length === 0) return

//     const lastMove = undoHistory.get(undoHistory.length - 1)
//     if (!lastMove) return

//     const lastIndex = lastMove?.get("index")
//     const sudokuItem = sudoku.get(lastIndex!)
//     if (!sudokuItem) return

//     const valid = sudokuItem.get("key") === lastMove?.get("valueBefore")

//     //BEFORE = NUMBER AND AFTER = OBJECT
//     if (
//       typeof lastMove.get("valueAfter") === "object" &&
//       typeof lastMove.get("valueBefore") === "number"
//     ) {
//       const arr = lastMove?.get("valueAfter") as Notes
//       const temp = arr.toImmutable()

//       sudokuItem?.update({
//         valid,
//         value: lastMove?.get("valueBefore")
//       })

//       setTableCell((prevCell) => ({
//         ...prevCell,
//         value: lastMove?.get("valueBefore")
//       }))

//       const redoItem = new LiveObject({
//         index: lastIndex,
//         valueBefore: new LiveList([...temp]),
//         valueAfter: lastMove?.get("valueBefore"),
//         mode: lastMove?.get("mode")
//       })
//       redoHistory.push(redoItem)
//       undoHistory.delete(undoHistory.length - 1)
//       return
//     }

//     //BEFORE = OBJECT AND AFTER = NUMBER
//     if (
//       typeof lastMove.get("valueBefore") === "object" &&
//       typeof lastMove.get("valueAfter") === "number"
//     ) {
//       const arr = lastMove?.get("valueBefore") as Notes
//       const temp = arr.toImmutable()

//       sudokuItem?.update({
//         valid,
//         value: new LiveList([...temp])
//       })

//       setTableCell((prevCell) => ({
//         ...prevCell,
//         value: new LiveList([...temp])
//       }))

//       const redoItem = new LiveObject({
//         index: lastIndex,
//         valueBefore: lastMove?.get("valueAfter"),
//         valueAfter: new LiveList([...temp]),
//         mode: lastMove?.get("mode")
//       })

//       redoHistory.push(redoItem)
//       undoHistory.delete(undoHistory.length - 1)
//       return
//     }

//     ///BEFORE = OBJECT AND AFTER = OBJECT
//     if (
//       typeof lastMove.get("valueBefore") === "object" &&
//       typeof lastMove.get("valueAfter") === "object"
//     ) {
//       const before = lastMove?.get("valueBefore") as Notes
//       const after = lastMove?.get("valueAfter") as Notes

//       const tempBefore = before.toImmutable()
//       const tempAfter = after.toImmutable()

//       sudokuItem?.update({
//         valid,
//         value: new LiveList([...tempBefore])
//       })

//       setTableCell((prevCell) => ({
//         ...prevCell,
//         value: new LiveList([...tempBefore])
//       }))

//       const redoItem = new LiveObject({
//         index: lastIndex,
//         valueBefore: new LiveList([...tempAfter]),
//         valueAfter: new LiveList([...tempBefore]),
//         mode: lastMove?.get("mode")
//       })
//       redoHistory.push(redoItem)
//       undoHistory.delete(undoHistory.length - 1)
//       return
//     }

//     const redoItem = new LiveObject({
//       index: lastIndex,
//       valueBefore: lastMove?.get("valueAfter"),
//       valueAfter: lastMove?.get("valueBefore"),
//       mode: lastMove?.get("mode")
//     })
//     redoHistory.push(redoItem)

//     if (lastIndex === undefined || lastIndex === null) return

//     sudokuItem?.update({
//       valid,
//       value: lastMove?.get("valueBefore")
//     })

//     setTableCell((prevCell) => ({
//       ...prevCell,
//       value: lastMove?.get("valueBefore")
//     }))

//     // Remove from undo history
//     undoHistory.delete(undoHistory.length - 1)
//   }, [])

//   const erase = useMutation(({ storage }, index: number) => {
//     if (index === null) return
//     const root = storage.get("root")
//     if (!root) return

//     const sudoku = root.get("sudoku")
//     const undoHistory = root.get("undoHistory")

//     const currentValue = sudoku?.get(index)?.get("value")

//     if (!currentValue) return

//     if (typeof currentValue === "object" && currentValue !== null) {
//       const immutable = currentValue.toImmutable()

//       const temp = [...immutable]

//       const history = new LiveObject<HistoryStack>({
//         index,
//         valueBefore: new LiveList(temp),
//         valueAfter: 0,
//         mode: "erase"
//       })
//       undoHistory.push(history)
//     } else {
//       const history = new LiveObject<HistoryStack>({
//         index,
//         valueBefore: currentValue,
//         valueAfter: 0,
//         mode: "erase"
//       })

//       undoHistory.push(history)
//     }

//     sudoku.get(index)?.update({
//       value: 0,
//       valid: false
//     })

//     setTableCell((prevCell) => ({
//       ...prevCell,
//       value: 0
//     }))
//   }, [])

//   const addNotes = useMutation(
//     ({ storage }, { index, numPad }: { index: number; numPad: number }) => {
//       const root = storage.get("root")
//       if (!root) return

//       const sudoku = root.get("sudoku")
//       const undoHistory = root.get("undoHistory")

//       const cell = sudoku.get(index)

//       if (cell?.get("valid") === true) {
//         cell.set("valid", false)
//       }

//       let value = cell?.get("value")

//       if (typeof value === "number" || value === null) {
//         const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
//         arr[numPad - 1] = numPad
//         cell?.set("value", new LiveList(arr))

//         const history = new LiveObject<HistoryStack>({
//           index,
//           valueBefore: value,
//           valueAfter: new LiveList(arr),
//           mode: "notes"
//         })

//         undoHistory.push(history)
//       }

//       if (typeof value === "object" && value !== null) {
//         const currentValue = value?.get(numPad - 1)

//         if (currentValue !== undefined) {
//           const immutable = value?.toImmutable()
//           const before = [...immutable]
//           const temp = [...immutable]
//           temp[numPad - 1] = currentValue > 0 ? 0 : numPad

//           value.set(numPad - 1, currentValue > 0 ? 0 : numPad)
//           const history = new LiveObject<HistoryStack>({
//             index,
//             valueBefore: new LiveList(before),
//             valueAfter: new LiveList(temp),
//             mode: "notes"
//           })

//           undoHistory.push(history)
//         }
//       }
//     },
//     []
//   )

//   const toggleNotesMode = () => setNotesMode(!notesMode)

//   return (
//     <ToolbarContext.Provider
//       value={{
//         canRedo,
//         canUndo,
//         undo,
//         redo,
//         erase,
//         notesMode,
//         toggleNotesMode,
//         addNotes
//       }}
//     >
//       <TableCellContext.Provider value={{ tableCell, onClickTableCell }}>
//         <NumPadContext.Provider value={{ selectNum }}>
//           {children}
//         </NumPadContext.Provider>
//       </TableCellContext.Provider>
//     </ToolbarContext.Provider>
//   )
// }
