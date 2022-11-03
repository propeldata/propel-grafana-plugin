import type { QueryEditorProps } from '@grafana/data'
import type { BasicDataSource } from 'DataSource'
import type { BasicDataSourceOptions, BasicQuery } from '../../types'

export type EditorProps = QueryEditorProps<BasicDataSource, BasicQuery, BasicDataSourceOptions>

export interface ChangeOptions<T> {
  propertyName: keyof T
  runQuery: boolean
}
