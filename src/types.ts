import type { DataQuery, DataSourceJsonData } from '@grafana/data'

export interface BasicQuery extends DataQuery {
  rawQuery: string
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
