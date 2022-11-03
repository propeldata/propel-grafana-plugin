import defaults from 'lodash/defaults'

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType
} from '@grafana/data'

import { MyQuery, MyDataSourceOptions, defaultQuery } from './types'

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings)
  }

  async query (options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const { range } = options
    const from = range.from.valueOf()
    const to = range.to.valueOf()

    // Return a constant for each query.
    const data = options.targets.map(target => {
      const query = defaults(target, defaultQuery)
      return new MutableDataFrame({
        refId: query.refId,
        fields: [
          { name: 'Time', values: [from, to], type: FieldType.time },
          { name: 'Value', values: [query.constant, query.constant], type: FieldType.number }
        ]
      })
    })

    return { data }
  }

  async testDatasource (): Promise<{ status: string, message: string }> {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success'
    }
  }
}
