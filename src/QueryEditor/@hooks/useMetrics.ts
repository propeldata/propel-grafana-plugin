import { useAsync } from 'react-use'
import { DataSource } from '../../DataSource'
import { MetricInfoFragment } from '../../generated/graphql'

export interface AsyncMetricsState {
  loading: boolean
  metrics: Record<string, MetricInfoFragment>
  error: Error | undefined
}

export default function useMetrics (datasource: DataSource): AsyncMetricsState {
  const result = useAsync(async () => {
    const metrics = await datasource.metrics()
    const result: Record<string, MetricInfoFragment> = {}
    metrics.forEach(m => { result[m.id] = m })
    return result
  }, [datasource])

  return {
    loading: result.loading,
    error: result.error,
    metrics: result.value ?? {}
  }
}
