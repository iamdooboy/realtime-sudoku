interface Props {
  notes: readonly number[] | null
}

export function Notes({ notes }: Props) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-full h-full absolute inset-0">
      {notes?.map((num, index) => (
        <div key={index} className="flex items-center justify-center">
          <span className="text-[8px] sm:text-xs text-gray-400">
            {num > 0 && num}
          </span>
        </div>
      ))}
    </div>
  )
}
