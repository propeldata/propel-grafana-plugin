import { useMemo } from 'react'
import type { SelectableValue } from '@grafana/data'

export function useSelectableValue<T extends { toString: () => string }> (value: T, label?: string): SelectableValue<T> | undefined {
  return useMemo(() => {
    if (value == null) {
      return
    }

    return {
      label: label ?? value.toString(),
      value: value
    }
  }, [label, value])
}
