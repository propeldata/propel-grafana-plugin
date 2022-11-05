import { useCallback } from 'react'
import type { BasicQuery } from '../../types'
import type { ChangeOptions, EditorProps } from './types'

type OnChangeType<T> = (value: T) => void

export function useChangeValue<T> (props: EditorProps, options: ChangeOptions<BasicQuery>): OnChangeType<T> {
  const { onChange, onRunQuery, query } = props
  const { propertyName, runQuery } = options

  return useCallback(
    (selectable: T) => {
      onChange({
        ...query,
        [propertyName]: selectable
      })

      if (runQuery) {
        onRunQuery()
      }
    },
    [onChange, onRunQuery, query, propertyName, runQuery]
  )
}
