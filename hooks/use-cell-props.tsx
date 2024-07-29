import { MouseEventHandler } from "react"

interface SquareProps {
  key: number
  index: number
  cIndex: number
  value: string | number
  // selectedValue: string | number | null
  // onClick: MouseEventHandler<HTMLElement>
  // highlight: boolean
}

const useCellProps = (
  indexOfArray: number,
  cIndex: number,
  value: string | number,
  // selectedValue: string | number | null,
  // highlight: boolean,
  // onClickSquare: (index: number | null, value: string | number) => void
): SquareProps => ({
  key: indexOfArray,
  index: indexOfArray,
  cIndex,
  value,
  // selectedValue,
  // onClick: () => onClickSquare(null, value),
  // highlight
})

export default useCellProps
