import { useCallback } from 'react'
import type { BasicQuery, EditorProps } from '../../types'

type OnChangeType<T> = (value: T) => void

export function useChangeValue<T extends keyof BasicQuery> (
  props: EditorProps,
  property: T
): OnChangeType<EditorProps['query'][T]> {
  const { onChange, query } = props

  return useCallback(
    (selectable: EditorProps['query'][T]) => {
      onChange({
        ...query,
        [property]: selectable
      })
    },
    [onChange, property, query]
  )
}
