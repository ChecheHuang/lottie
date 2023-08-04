import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  const jsonStringVal = JSON.stringify(value)
  useEffect(() => {
    ref.current = JSON.parse(jsonStringVal)
    // console.log(ref.current)
  }, [jsonStringVal])
  return ref.current
}
