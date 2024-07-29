import clsx from "clsx"

export function TableRow({
  rIndex,
  children
}: {
  rIndex: number
  children: React.ReactNode
}) {
  return (
    <tr
      className={clsx({
        "border-slate-200 dark:border-slate-700 border-b-4":
          rIndex === 2 || rIndex === 5
      })}
    >
      {children}
    </tr>
  )
}
