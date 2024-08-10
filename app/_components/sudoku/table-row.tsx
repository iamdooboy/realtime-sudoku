import { cn } from "@/lib/utils"

export function TableRow({
  rIndex,
  children
}: {
  rIndex: number
  children: React.ReactNode
}) {
  return (
    <tr
      className={cn({
        "border border-b-4":
          rIndex === 2 || rIndex === 5
      })}
    >
      {children}
    </tr>
  )
}
