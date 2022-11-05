import type { QueryEditorProps } from '@grafana/data'
import type { DataSource } from 'DataSource'
import type { BasicDataSourceOptions, BasicQuery } from '../../types'

export type EditorProps = QueryEditorProps<DataSource, BasicQuery, BasicDataSourceOptions>

export interface ChangeOptions<T> {
  propertyName: keyof T
  runQueryCondition: (before: BasicQuery, after: BasicQuery) => boolean
}
