import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  FieldType,
  MutableDataFrame
} from '@grafana/data'
import { FetchResponse, getBackendSrv, isFetchError } from '@grafana/runtime'
import _ from 'lodash'
import defaults from 'lodash/defaults'
import { DataSourceResponse, defaultQuery, MyDataSourceOptions, MyQuery, PluginResponse } from './types'
import { lastValueFrom } from 'rxjs'

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  baseUrl: string

  constructor (instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings)

    this.baseUrl = instanceSettings.url ?? ''
  }

  async query (options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map(async (target) => {
      const query = defaults(target, defaultQuery)
      const response = await this.request('/api/metrics', `query=${query.queryText}`)

      /**
       * In this example, the /api/metrics endpoint returns:
       *
       * {
       *   "datapoints": [
       *     {
       *       Time: 1234567891011,
       *       Value: 12.5
       *     },
       *     {
       *     ...
       *   ]
       * }
       */
      const dataPoints = response.data.datapoints

      const timestamps: number[] = []
      const values: number[] = []

      for (let i = 0; i < dataPoints.length; i++) {
        timestamps.push(dataPoints[i].Time)
        values.push(dataPoints[i].Value)
      }

      return new MutableDataFrame({
        refId: query.refId,
        fields: [
          { name: 'Time', type: FieldType.time, values: timestamps },
          { name: 'Value', type: FieldType.number, values: values }
        ]
      })
    })

    return Promise.all(promises).then((data) => ({ data }))
  }

  async request (url: string, params?: string): Promise<FetchResponse<DataSourceResponse>> {
    const response = getBackendSrv().fetch<DataSourceResponse>({
      url: `${this.baseUrl}${url}${(params ?? '').length != null ? `?${params}` : ''}`
    })
    return lastValueFrom(response)
  }

  /**
   * Checks whether we can connect to the API.
   */
  async testDatasource (): Promise<PluginResponse> {
    const defaultErrorMessage = 'Cannot connect to API'

    try {
      const response = await this.request('/healthz')
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Success'
        }
      } else {
        return {
          status: 'error',
          message: response.statusText ?? defaultErrorMessage
        }
      }
    } catch (err) {
      let message = ''
      if (_.isString(err)) {
        message = err
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      } else if (isFetchError(err)) {
        message += (err.statusText ?? defaultErrorMessage) as string
        if (err.data != null && err.data.error != null&& err.data.error.code != null) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          message += ': ' + err.data.error.code + '. ' + err.data.error.message
        }
      }
      return {
        status: 'error',
        message
      }
    }
  }
}
