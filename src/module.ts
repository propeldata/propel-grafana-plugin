import { DataSourcePlugin } from '@grafana/data'
import { ConfigEditor, QueryEditor } from './components'
import { BasicDataSource } from './DataSource'
import { BasicDataSourceOptions, BasicQuery } from './types'

export const plugin = new DataSourcePlugin<BasicDataSource, BasicQuery, BasicDataSourceOptions>(BasicDataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
