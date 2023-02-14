import { DataSourcePlugin } from '@grafana/data'
import { ConfigEditor } from './ConfigEditor/ConfigEditor'
import { DataSource } from './DataSource'
import { QueryEditor } from './QueryEditor'
import { PropelDataSourceOptions, PropelDataSourceSecureOptions, PropelQuery } from './types'

export const plugin = new DataSourcePlugin<DataSource, PropelQuery, PropelDataSourceOptions, PropelDataSourceSecureOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
