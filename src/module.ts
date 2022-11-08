import { DataSourcePlugin } from '@grafana/data'
import { ConfigEditor } from './ConfigEditor/ConfigEditor'
import { DataSource } from './DataSource'
import { QueryEditor } from './QueryEditor'
import { BasicDataSourceOptions, BasicQuery } from './types'

export const plugin = new DataSourcePlugin<DataSource, BasicQuery, BasicDataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
