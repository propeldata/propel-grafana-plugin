import { QueryEditorProps } from '@grafana/data'
import type { DataQuery, DataSourceJsonData } from '@grafana/data'
import { DataSource } from './DataSource'
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

export interface PropelQuery extends DataQuery {
  metricId?: string
  label?: string
  query?: MetricQuery
}

export enum PropelEnvironment {
  Dev = 'dev',
  Prod = 'prod'
}

export enum PropelRegion {
  UsEast2 = 'us-east-2'
}

export interface PropelDataSourceOptions extends DataSourceJsonData {
  environment?: PropelEnvironment
  region?: PropelRegion
}

export interface PropelDataSourceSecureOptions {
  clientId?: string
  clientSecret?: string
}

export interface TestResponse {
  status: 'error' | 'success'
  message: string
}

export type EditorProps = QueryEditorProps<DataSource, PropelQuery, PropelDataSourceOptions>
