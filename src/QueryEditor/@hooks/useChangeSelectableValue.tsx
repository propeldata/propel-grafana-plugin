import { useCallback } from 'react'
import type { SelectableValue } from '@grafana/data'
import type { PropelQuery, EditorProps } from '../../types'

type OnChangeType<T> = (value: SelectableValue<T>) => void

export function useChangeSelectableValue<T> (props: EditorProps, property: keyof PropelQuery): OnChangeType<T> {
  const { onChange, query } = props

  return useCallback(
    (selectable: SelectableValue<T>) => {
      if (selectable?.value == null) {
        return
      }

      onChange({
        ...query,
        [property]: selectable.value
      })
    },
    [onChange, query, property]
  )
}
