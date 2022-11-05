import { DataSourcePlugin } from '@grafana/data'
import { ConfigEditor, QueryEditor } from './@components'
import { DataSource } from './DataSource'
import { BasicDataSourceOptions, BasicQuery } from './types'

export const plugin = new DataSourcePlugin<DataSource, BasicQuery, BasicDataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
