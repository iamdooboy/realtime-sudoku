interface Props {
  notes: readonly number[]
}

export function Notes({ notes }: Props) {
  return (
    <div className="grid grid-cols-3 grid-rows-3">
      {notes.map((num, index) => (
        <p
          key={index}
          className="p-[2px] text-xs text-muted-foreground text-center"
        >
          {num > 0 && num}
        </p>
      ))}
    </div>
  )
}
