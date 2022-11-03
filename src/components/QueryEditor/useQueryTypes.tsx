import { useAsync } from 'react-use'
import type { SelectableValue } from '@grafana/data'
import { DataSource } from '../../DataSource'

interface AsyncQueryTypeState {
  loading: boolean
  queryTypes: Array<SelectableValue<string>>
  error: Error | undefined
}

export function useQueryTypes (datasource: DataSource): AsyncQueryTypeState {
  const result = useAsync(async () => {
    return DataSource.queryTypes.map((queryType) => ({
      label: queryType,
      value: queryType
    }))
  }, [datasource])

  return {
    loading: result.loading,
    queryTypes: result.value ?? [],
    error: result.error
  }
}
