import { useEffect, useState, useRef } from "react"

function useLocal() {
  const [loadingStates, setLoadingStates] = useState<Map<string, boolean>>(
    new Map()
  )
  const loadingStatesRef = useRef(loadingStates)
  loadingStatesRef.current = loadingStates

  const setStorageValue = <T>(key: string, value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  const getStorageValue = <T>(
    key: string,
    fallbackValue?: T
  ): [T | undefined, boolean] => {
    const [value, setValue] = useState<T | undefined>(fallbackValue)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
      setIsLoading(loadingStatesRef.current.get(key) ?? true)

      try {
        const item = window.localStorage.getItem(key)
        setValue(item !== null ? JSON.parse(item) : fallbackValue)
      } catch (error) {
        console.error(error)
        setValue(fallbackValue)
      } finally {
        setIsLoading(false)
        setLoadingStates((prev) => new Map(prev).set(key, false))
      }
    }, [key, fallbackValue])

    return [value, isLoading]
  }

  // Effect to update component when localStorage changes
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key) {
        setLoadingStates((prev) => new Map(prev).set(event.key as string, true))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return { getStorageValue, setStorageValue }
}

export default useLocal
