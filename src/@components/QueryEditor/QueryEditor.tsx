import { css } from '@emotion/css'
import { SelectableValue } from '@grafana/data'
import { Alert, InlineField, InlineFieldRow, Select, useStyles2 } from '@grafana/ui'
import React, { ChangeEvent, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react'
import clamp from '../../@utils/clamp'

import { DataSource } from '../../DataSource'
import { MetricInfoFragment, TimeSeriesGranularity } from '../../generated/graphql'
import { MetricQuery } from '../../types'
import DelayedInput from './@components/DelayedInput'
import FilterEditor from './@components/FilterEditor'
import GranularityEditor from './@components/GranularityEditor'
import GroupByColumnsEditor from './@components/GroupByColumnsEditor'
import { useChangeSelectableValue } from './@hooks/useChangeSelectableValue'
import { useChangeValue } from './@hooks/useChangeValue'
import useMetrics from './@hooks/useMetrics'
import type { EditorProps } from './types'

const defaultGranularity = TimeSeriesGranularity.Day
const queryFireDelay = 0

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function style () {
  return {
    marginTop: css`margin-top: 10px`
  }
}

function copyMetricQuery (query: MetricQuery): MetricQuery {
  return {
    type: query.type,
    input: { ...query.input }
  } as unknown as MetricQuery
}

export function QueryEditor (props: EditorProps): ReactElement {
  const { datasource, query, onRunQuery } = props

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (query.query === undefined || query.metricId === undefined) return
    const timeout = setTimeout(() => onRunQuery(), queryFireDelay)
    timeoutRef.current = timeout
    return () => clearTimeout(timeout)
  }, [query.query, query.metricId, onRunQuery])

  const C = useStyles2(style)

  const metrics = useMetrics(datasource)

  const onChangeMetricQuery = useChangeValue<MetricQuery | undefined>(props, 'query')

  const onChangeMetricId = useChangeSelectableValue<string>(props, 'metricId')

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

  const selectableMetrics = useMemo(() =>
    Object.values(metrics.metrics).map(m => ({ label: m.uniqueName ?? m.id, value: m.id })),
  [metrics])

  const activeMetric: MetricInfoFragment | undefined = useMemo(() => {
    return metrics.metrics[query.metricId ?? '']
  }, [metrics.metrics, query.metricId])

  return (
    <>
      {metrics.error != null && <Alert title={metrics.error.message}/>}
      <InlineFieldRow className={C.marginTop}>
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
      <FilterEditor
        className={C.marginTop}
        filters={filters}
        dimensions={activeMetric?.dimensions ?? []}
        onFilters={(filters) => {
          const newQuery = copyMetricQuery((query.query ?? {}) as MetricQuery)
          newQuery.input.filters = filters
          onChangeMetricQuery(newQuery)
        }}
      />
      {query.query?.type === 'time-series' &&
        <GranularityEditor
            className={C.marginTop}
            granularity={query.query.input.granularity}
            onGranularity={(granularity) => {
              const newQuery = copyMetricQuery((query.query ?? {}) as MetricQuery)
              if (newQuery.type !== 'time-series') return
              newQuery.input.granularity = granularity
              onChangeMetricQuery(newQuery)
            }}
        />
      }
      {query.query?.type === 'leaderboard' &&
        <>
          <GroupByColumnsEditor
              dimensions={activeMetric?.dimensions ?? []}
              columns={query.query.input.dimensions.map(_ => _.columnName)}
              onColumns={columns => {
                const newQuery = copyMetricQuery((query.query ?? {}) as MetricQuery)
                if (newQuery.type !== 'leaderboard') return
                newQuery.input.dimensions = columns.map(columnName => ({ columnName }))
                onChangeMetricQuery(newQuery)
              }}
          />
            <InlineFieldRow>
                <InlineField label={'Number of rows'}>
                    <DelayedInput
                        inputDelay={1000}
                        type={'number'}
                        value={query.query.input.rowLimit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const newQuery = copyMetricQuery((query.query ?? {}) as MetricQuery)
                          if (newQuery.type !== 'leaderboard') return
                          newQuery.input.rowLimit = clamp(3, e.target.value, 100)
                          onChangeMetricQuery(newQuery)
                        }}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
      }
    </>
  )
}
