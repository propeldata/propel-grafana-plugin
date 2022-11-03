import {
  DataQueryRequest,
  DataQueryResponse, DataSourceApi,
  DataSourceInstanceSettings,
  FieldType,
  MutableDataFrame
} from '@grafana/data'
import { defaultApiUrl, defaultAuthUrl } from './components/ConfigEditor/ConfigEditor'
import { BasicQuery, BasicDataSourceOptions, TestResponse } from './types'

export class DataSource extends DataSourceApi<BasicQuery, BasicDataSourceOptions> {
  static queryTypes = ['counter', 'timeseries', 'leaderboard'] as const

  apiUrl: string
  authUrl: string
  clientId?: string
  clientSecret?: string

  constructor (instanceSettings: DataSourceInstanceSettings<BasicDataSourceOptions>) {
    super(instanceSettings)
    console.log(instanceSettings)

    this.apiUrl = instanceSettings.jsonData.apiUrl ?? defaultApiUrl
    this.authUrl = instanceSettings.jsonData.authUrl ?? defaultAuthUrl
    this.clientId = instanceSettings.jsonData.clientId
    this.clientSecret = instanceSettings.jsonData.clientSecret
  }

  async query (options: DataQueryRequest<BasicQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map(async (target) => {
      const dataPoints: any = '' // todo

      const timestamps: number[] = []
      const values: number[] = []

      for (let i = 0; i < dataPoints.length; i++) {
        timestamps.push(dataPoints[i].Time)
        values.push(dataPoints[i].Value)
      }

      return new MutableDataFrame({
        refId: target.refId,
        fields: [
          { name: 'Time', type: FieldType.time, values: timestamps },
          { name: 'Value', type: FieldType.number, values: values }
        ]
      })
    })

    return Promise.all(promises).then((data) => ({ data })) as any
  }

  static async getAuthToken (clientId?: string, clientSecret?: string, authUrl?: string): Promise<string> {
    if ((clientId ?? '') === '') {
      throw new Error('Client Id is not set')
    } else if ((clientSecret ?? '') === '') {
      throw new Error('Client secret is not set')
    }
    const response = await fetch(
      authUrl ?? defaultAuthUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId ?? '',
          client_secret: clientSecret ?? ''
        })
      }
    )
    if (response.status !== 200) {
      throw new Error(`Received unexpected status code ${response.status}`)
    }
    let data: { access_token?: string }
    const result = await response.text()
    try {
      data = await JSON.parse(result)
    } catch (e) {
      throw new Error('Failed to parse response as Json: '+result)
    }
    if ('access_token' in data && typeof data.access_token === 'string') {
      return data.access_token
    } else {
      throw new Error(`Unexpected response format from ${authUrl}: ${JSON.stringify(data)}`)
    }
  }

  /**
   * Checks whether we can connect to the API.
   */
  async testDatasource (): Promise<TestResponse> {
    return DataSource.getAuthToken(
      this.clientId,
      this.clientSecret,
      this.authUrl
    )
      .then(() => ({
        status: 'success' as const,
        message: 'Success'
      }))
      .catch((err: Error) => ({
        status: 'error' as const,
        message: err.message
      }))
  }
}
