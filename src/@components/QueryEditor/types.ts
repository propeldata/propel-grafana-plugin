import type { QueryEditorProps } from '@grafana/data'
import type { DataSource } from 'DataSource'
import type { BasicDataSourceOptions, BasicQuery } from '../../types'

export type EditorProps = QueryEditorProps<DataSource, BasicQuery, BasicDataSourceOptions>
