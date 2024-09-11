interface Props {
  notes: readonly number[] | null
}

export function Notes({ notes }: Props) {
  return (
    <div className="absolute inset-0 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 gap-[2px] p-[2px]">
      {notes?.map((num, index) => (
        <div key={index} className="flex items-center justify-center">
          <span className="text-muted-foreground text-xs">
            {num > 0 && num}
          </span>
        </div>
      ))}
    </div>
  )
}
