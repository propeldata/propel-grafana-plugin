import { InlineField, InlineFieldRow, Select, Alert } from '@grafana/ui'
import React, { ReactElement } from 'react'
import { useAsync } from 'react-use'
import { DataSource } from '../../DataSource'
import { MetricInfoFragment, TimeSeriesGranularity } from '../../generated/graphql'
import { MetricQuery } from '../../types'
import type { EditorProps } from './types'
import { useChangeSelectableValue } from './useChangeSelectableValue'
import { useChangeValue } from './useChangeValue'

interface AsyncMetricsState {
  loading: boolean
  metrics: Record<string, MetricInfoFragment>
  error: Error | undefined
}

function useMetrics (datasource: DataSource): AsyncMetricsState {
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

export function QueryEditor (props: EditorProps): ReactElement {
  const { datasource, query } = props

  const metrics = useMetrics(datasource)

  const onChangeMetricQuery = useChangeValue<MetricQuery | undefined>(props, {
    propertyName: 'query',
    runQuery: true
  })

  const onChangeMetricId = useChangeSelectableValue<string>(props, {
    propertyName: 'metricId',
    runQuery: true
  })

  return (
    <>
      {metrics.error != null && <Alert title={metrics.error.message}/>}
      <InlineFieldRow>
        <InlineField label="Metrics" grow>
          <Select
            options={Object.values(metrics.metrics).map(m => ({ label: m.uniqueName ?? m.id, value: m.id }))}
            onChange={onChangeMetricId}
            isLoading={metrics.loading}
            disabled={!(metrics.error == null)}
            value={metrics.metrics[query.metricId ?? '']?.uniqueName ?? query.metricId}
          />
        </InlineField>
        <InlineField label="Query type" grow>
          <Select
            options={DataSource.queryTypes.map(v => ({ value: v, label: v }))}
            onChange={(v) => {
              switch (v.value) {
                case 'counter':
                  return onChangeMetricQuery({ type: 'counter', input: {} })
                case 'time-series':
                  return onChangeMetricQuery({ type: 'time-series', input: { granularity: TimeSeriesGranularity.Day } })
                case 'leaderboard':
                  return onChangeMetricQuery({ type: 'leaderboard', input: { dimensions: [], rowLimit: 10 } })
              }
            }}
            value={query.query?.type}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}
