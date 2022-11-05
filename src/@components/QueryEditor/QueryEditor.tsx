import { css } from '@emotion/css'
import { SelectableValue } from '@grafana/data'
import { Alert, InlineField, InlineFieldRow, Select, useStyles2 } from '@grafana/ui'
import React, { ReactElement, useCallback, useMemo } from 'react'

import { DataSource } from '../../DataSource'
import { FilterInput, MetricInfoFragment, TimeSeriesGranularity } from '../../generated/graphql'
import { BasicQuery, MetricQuery } from '../../types'
import FilterEditor from './@components/FilterEditor'
import { useChangeSelectableValue } from './@hooks/useChangeSelectableValue'
import { useChangeValue } from './@hooks/useChangeValue'
import useMetrics from './@hooks/useMetrics'
import type { EditorProps } from './types'

const defaultGranularity = TimeSeriesGranularity.Day

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function style () {
  return {
    header: css`margin-top: 10px`
  }
}

function copyMetricQuery (query: MetricQuery): MetricQuery {
  return {
    type: query.type,
    input: { ...query.input }
  } as unknown as MetricQuery
}

export function QueryEditor (props: EditorProps): ReactElement {
  const { datasource, query } = props

  const C = useStyles2(style)

  const metrics = useMetrics(datasource)

  const runQueryCondition = useCallback((query: BasicQuery) => {
    return (query.query !== undefined && query.metricId !== undefined)
  }, [])

  const onChangeMetricQuery = useChangeValue<MetricQuery | undefined>(props, {
    propertyName: 'query',
    runQueryCondition
  })

  const onChangeMetricId = useChangeSelectableValue<string>(props, {
    propertyName: 'metricId',
    runQueryCondition
  })

  const filters = useMemo(() => query.query?.input.filters ?? [], [query.query?.input.filters])

  const onChooseQueryType = useCallback((queryType: SelectableValue<MetricQuery['type']>) => {
    switch (queryType.value) {
      case 'counter':
        return onChangeMetricQuery({ type: 'counter', input: { filters } })
      case 'time-series':
        return onChangeMetricQuery({ type: 'time-series', input: { granularity: defaultGranularity, filters } })
      case 'leaderboard':
        return onChangeMetricQuery({ type: 'leaderboard', input: { dimensions: [], rowLimit: 10, filters } })
    }
  }, [filters, onChangeMetricQuery])

  const onChangeFilters = useCallback((filters: FilterInput[]) => {
    const newQuery = copyMetricQuery((query.query ?? {}) as MetricQuery)
    newQuery.input.filters = filters
    onChangeMetricQuery(newQuery)
  }, [onChangeMetricQuery, query.query])

  const selectableMetrics = useMemo(() =>
    Object.values(metrics.metrics).map(m => ({ label: m.uniqueName ?? m.id, value: m.id })),
  [metrics])

  const activeMetric: MetricInfoFragment | undefined = useMemo(() => {
    return metrics.metrics[query.metricId ?? '']
  }, [metrics.metrics, query.metricId])

  return (
    <>
      {metrics.error != null && <Alert title={metrics.error.message}/>}
      <InlineFieldRow className={C.header}>
        <InlineField label="Metric" grow>
          <Select
            options={selectableMetrics}
            onChange={onChangeMetricId}
            isLoading={metrics.loading}
            disabled={metrics.error != null}
            value={query.metricId}
          />
        </InlineField>
        <InlineField label="Query type" grow>
          <Select
            options={DataSource.queryTypes.map(v => ({ value: v, label: v }))}
            onChange={onChooseQueryType}
            value={query.query?.type}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <FilterEditor
          filters={filters}
          dimensions={activeMetric?.dimensions ?? []}
          onFilters={onChangeFilters}
        />
      </InlineFieldRow>
    </>
  )
}
