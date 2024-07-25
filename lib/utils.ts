import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const randomId = (count: number) => {
  return "x".repeat(23).replace(/[x]/g, () => {
    return ((Math.random() * 16) | 0).toString(16)
  })
}
