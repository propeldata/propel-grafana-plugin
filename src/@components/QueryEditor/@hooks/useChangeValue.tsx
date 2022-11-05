import { useCallback } from 'react'
import type { BasicQuery } from '../../../types'
import type { EditorProps } from '../types'

type OnChangeType<T> = (value: T) => void

export function useChangeValue<T> (props: EditorProps, property: keyof BasicQuery): OnChangeType<T> {
  const { onChange, query } = props

  return useCallback(
    (selectable: T) => {
      onChange({
        ...query,
        [property]: selectable
      })
    },
    [onChange, property, query]
  )
}
