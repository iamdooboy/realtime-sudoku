import { Json, useOthersMapped } from "@liveblocks/react/suspense"
import { Notes } from "./notes"
import { OtherPresence } from "./other-presence"

type MutableCellProps = {
  value: number | readonly number[] | undefined
  sudokuIndex: number
  onClick: () => void
  className?: string
  userColors: Map<number, string>
  others: ReturnType<
    typeof useOthersMapped<{
      focusIndex: Json | undefined
      name: string
      id: number
    }>
  >
}
export const MutableCell: React.FC<MutableCellProps> = ({
  value,
  sudokuIndex,
  onClick,
  userColors,
  others,
  className
}) => {
  const showNotes = typeof value === "object"
  return (
    <div onClick={onClick} className={className}>
      {showNotes ? <Notes notes={value} /> : value !== 0 && <p>{value}</p>}
      <OtherPresence
        others={others}
        sudokuIndex={sudokuIndex}
        userColors={userColors}
      />
    </div>
  )
}
