import type { DataQuery, DataSourceJsonData } from '@grafana/data'
import { CounterInput, LeaderboardInput, TimeSeriesInput } from './generated/graphql'

export interface CounterQuery {
  type: 'counter'
  input: Omit<CounterInput, 'timeRange'>
}

export interface TimeSeriesQuery {
  type: 'time-series'
  input: Omit<TimeSeriesInput, 'timeRange'>
}

export interface LeaderboardQuery {
  type: 'leaderboard'
  input: Omit<LeaderboardInput, 'timeRange'>
}

export type MetricQuery = CounterQuery | TimeSeriesQuery | LeaderboardQuery

export interface BasicQuery extends DataQuery {
  metricId?: string
  query?: MetricQuery
}

/**
 * These are options configured for each DataSource instance
 */
export interface BasicDataSourceOptions extends DataSourceJsonData {
  apiUrl?: string
  authUrl?: string
  clientId?: string
  clientSecret?: string
}

export interface TestResponse {
  status: 'error' | 'success'
  message: string
}
