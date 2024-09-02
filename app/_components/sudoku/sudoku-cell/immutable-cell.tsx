import { Json, useOthersMapped } from "@liveblocks/react/suspense"
import { OtherPresence } from "./other-presence"

type ImmutableCellProps = {
  value: number | readonly number[] | undefined
  sudokuIndex: number
  className: string
  onClick: () => void
  userColors: Map<number, string>
  others: ReturnType<
    typeof useOthersMapped<{
      focusIndex: Json | undefined
      name: string
      id: number
    }>
  >
}
export const ImmutableCell: React.FC<ImmutableCellProps> = ({
  value,
  sudokuIndex,
  onClick,
  userColors,
  others,
  className
}) => {
  return (
    <div onClick={onClick} className={className}>
      <p>{value}</p>
      <OtherPresence
        others={others}
        sudokuIndex={sudokuIndex}
        userColors={userColors}
      />
    </div>
  )
}
