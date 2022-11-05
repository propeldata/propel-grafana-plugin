import { useCallback } from 'react'
import type { BasicQuery } from '../../../types'
import type { ChangeOptions, EditorProps } from '../types'

type OnChangeType<T> = (value: T) => void

export function useChangeValue<T> (props: EditorProps, options: ChangeOptions<BasicQuery>): OnChangeType<T> {
  const { onChange, onRunQuery, query } = props
  const { propertyName, runQueryCondition } = options

  return useCallback(
    (selectable: T) => {
      const before = query
      const after = {
        ...query,
        [propertyName]: selectable
      }
      onChange(after)

      if (runQueryCondition(before, after)) {
        onRunQuery()
      }
    },
    [onChange, onRunQuery, query, propertyName, runQueryCondition]
  )
}
