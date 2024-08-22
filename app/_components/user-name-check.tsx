"use client"

import { useState, useEffect, PropsWithChildren } from "react"
import useLocalStorage from "@/hooks/use-local-storage"
import { Label } from "@radix-ui/react-label"
import { Button } from "./shadcn/button"
import { Card, CardHeader, CardTitle, CardContent } from "./shadcn/card"
import { Input } from "./shadcn/input"

export default function UserNameCheck({ children }: PropsWithChildren) {
  const [input, setInput] = useState("")
  const [name, setName] = useLocalStorage("name", "")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.length >= 1) {
      setName(input)
    }
  }

  const nameInLocalStorage = name.length >= 1
  const isValid = input.length >= 1

  if (!nameInLocalStorage) {
    return (
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="te-2xl">Sudoku</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  placeholder="Enter your name"
                  minLength={1}
                  id="name"
                  type="text"
                  required
                  value={input}
                  className="[&:user-invalid:not(:focus)]:border-red-500 peer"
                  onChange={(e) => setInput(e.target.value)}
                />
                <p className="text-red-500 hidden text-sm peer-[&:user-invalid:not(:focus)]:block">
                  This field is required
                </p>
              </div>
              <Button disabled={!isValid} type="submit" className="w-full">
                Join game
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    )
  }

  // if (!name && !submit) {
  //   return (
  //     <Card className="mx-auto max-w-sm">
  //       <CardHeader>
  //         <CardTitle className="te-2xl">Sudoku</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="grid gap-4">
  //           <div className="grid gap-2">
  //             <Label htmlFor="name">Name</Label>
  //             <Input
  //               id="name"
  //               type="text"
  //               required
  //               value={name}
  //               className={cn(
  //                 isInvalid &&
  //                   "border-red-500 focus:ring-red-500 invalid:border-red-500 invalid:ring-red-500"
  //               )}
  //               onChange={(e) => setName(e.target.value)}
  //               onBlur={() => setTouched(true)}
  //             />
  //             {isInvalid && (
  //               <p className="text-red-500 text-sm">This field is required</p>
  //             )}
  //           </div>

  //           <Button
  //             type="submit"
  //             className="w-full"
  //             onClick={() => handleJoin(name)}
  //           >
  //             Join game
  //           </Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  return children
}

// "use client"

// import React, { useState, useEffect, PropsWithChildren } from "react"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger
// } from "@/shadcn/alert-dialog"
// import { Button } from "./shadcn/button"
// import useLocalStorage from "@/hooks/use-local-storage"

// export default function UserNameCheck({ children }: PropsWithChildren) {
//   const [name, setName] = useLocalStorage("name", "")
//   const [showDialog, setShowDialog] = useState(false)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//     if (!name) {
//       setShowDialog(true)
//     }
//   }, [name])

//   const handleNameChange = (e) => {
//     setName(e.target.value)
//   }

//   const handleSubmit = () => {
//     setName(name)
//     setShowDialog(false)
//   }

//   return (
//     <>
//       {mounted && (
//         <>
//           {showDialog && (
//             <AlertDialog open={true} onOpenChange={() => setName(name)}>
//               <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
//                 <AlertDialogTitle className="text-lg font-bold mb-2">
//                   Welcome!
//                 </AlertDialogTitle>
//                 <AlertDialogDescription>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={handleNameChange}
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your name"
//                   />
//                 </AlertDialogDescription>
//                 <div className="flex justify-end mt-4">
//                   <AlertDialogAction onClick={handleSubmit} className="mr-2">
//                     Submit
//                   </AlertDialogAction>
//                   <AlertDialogAction onClick={() => setName(name)}>
//                     Cancel
//                   </AlertDialogAction>
//                 </div>
//               </div>
//             </AlertDialog>
//           )}
//           {children}
//         </>
//       )}
//     </>
//   )

//   return (
//     <>
//       {showDialog && (
//         <AlertDialog open={true} onOpenChange={() => setName(name)}>
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
//             <AlertDialogTitle className="text-lg font-bold mb-2">
//               Welcome!
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={handleNameChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your name"
//               />
//             </AlertDialogDescription>
//             <div className="flex justify-end mt-4">
//               <AlertDialogAction onClick={handleSubmit} className="mr-2">
//                 Submit
//               </AlertDialogAction>
//               <AlertDialogAction onClick={() => setName(name)}>
//                 Cancel
//               </AlertDialogAction>
//             </div>
//           </div>
//         </AlertDialog>
//       )}
//       {name && <div>Hello, {name}!</div>}
//     </>
//   )
// }
