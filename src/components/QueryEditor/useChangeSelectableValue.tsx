import { useCallback } from 'react'
import type { SelectableValue } from '@grafana/data'
import type { BasicQuery } from '../../types'
import type { ChangeOptions, EditorProps } from './types'

type OnChangeType<T> = (value: SelectableValue<T>) => void

export function useChangeSelectableValue<T> (props: EditorProps, options: ChangeOptions<BasicQuery>): OnChangeType<T> {
  const { onChange, onRunQuery, query } = props
  const { propertyName, runQuery } = options

  return useCallback(
    (selectable: SelectableValue<T>) => {
      if (selectable?.value == null) {
        return
      }

      onChange({
        ...query,
        [propertyName]: selectable.value
      })

      if (runQuery) {
        onRunQuery()
      }
    },
    [onChange, onRunQuery, query, propertyName, runQuery]
  )
}
