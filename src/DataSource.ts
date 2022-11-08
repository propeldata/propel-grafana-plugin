import {
  DataQueryRequest,
  DataQueryResponse, DataSourceApi,
  DataSourceInstanceSettings,
  FieldType,
  MutableDataFrame, MutableField
} from '@grafana/data'
import AuthTokenService from './@services/AuthTokenService'
import MetricQueryService from './@services/MetricQueryService'
import { defaultApiUrl, defaultAuthUrl } from './ConfigEditor/ConfigEditor'
import { CounterInput, LeaderboardInput, MetricInfoFragment, TimeSeriesInput } from './generated/graphql'
import { BasicQuery, BasicDataSourceOptions, TestResponse, MetricQuery } from './types'

export class DataSource extends DataSourceApi<BasicQuery, BasicDataSourceOptions> {
  static queryTypes = ['counter', 'time-series', 'leaderboard'] as Array<MetricQuery['type']>

  private readonly authTokenService: AuthTokenService
  apiUrl: string

  constructor (instanceSettings: DataSourceInstanceSettings<BasicDataSourceOptions>) {
    super(instanceSettings)
    let authUrl = instanceSettings.jsonData.authUrl
    if (authUrl === '') authUrl = undefined
    let apiUrl = instanceSettings.jsonData.apiUrl
    if (apiUrl === '') apiUrl = undefined
    this.authTokenService = new AuthTokenService({
      authUrl: authUrl ?? defaultAuthUrl,
      clientId: instanceSettings.jsonData.clientId ?? '',
      clientSecret: instanceSettings.jsonData.clientSecret ?? ''
    })
    this.apiUrl = apiUrl ?? defaultApiUrl
  }

  async metrics (): Promise<MetricInfoFragment[]> {
    const metricQueryService = new MetricQueryService({
      apiUrl: this.apiUrl,
      tokenGetter: async () => this.authTokenService.getAuthToken()
    })
    return metricQueryService.metrics()
  }

  private async mutableDfFromCounter (metricId: string, input: CounterInput, label?: string): Promise<Array<MutableField<number>>> {
    const metricQueryService = new MetricQueryService({
      apiUrl: this.apiUrl,
      tokenGetter: async () => this.authTokenService.getAuthToken()
    })

    const result = await metricQueryService.counter(metricId, input)
    const values: number[] = [result]
    return [
      {
        name: (label != null) ? label : 'value',
        type: FieldType.number,
        config: { },
        values: values as any
      }
    ]
  }

  private async mutableDfFromTimeSeries (metricId: string, input: TimeSeriesInput, label?: string): Promise<Array<MutableField<number>>> {
    const metricQueryService = new MetricQueryService({
      apiUrl: this.apiUrl,
      tokenGetter: async () => this.authTokenService.getAuthToken()
    })

    const [labels, values] = await metricQueryService.timeSeries(metricId, input)
    return [
      {
        name: (label != null) ? label : 'value',
        type: FieldType.number,
        config: {},
        values: values as any
      },
      {
        name: 'Label',
        type: FieldType.time,
        config: {},
        values: labels.map(l => l.getTime()) as any
      }
    ]
  }

  private async mutableDfFromLeaderboard (metricId: string, input: LeaderboardInput): Promise<Array<MutableField<number>>> {
    const metricQueryService = new MetricQueryService({
      apiUrl: this.apiUrl,
      tokenGetter: async () => this.authTokenService.getAuthToken()
    })

    const { header, columns } = await metricQueryService.leaderboard(metricId, input)
    const result: MutableField[] = []
    for (let i = 0; i < header.length; i++) {
      const column = columns[i]
      let type
      if (typeof column[0] === 'number') {
        type = FieldType.number
      } else {
        type = FieldType.string
      }
      result.push({
        name: header[i],
        type,
        config: {},
        values: column as any
      })
    }
    return result
  }

  async query (options: DataQueryRequest<BasicQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map(async (target) => {
      if (target.metricId === undefined || target.query === undefined) {
        return new MutableDataFrame({
          refId: target.refId,
          fields: []
        })
      }
      const timeRange: CounterInput['timeRange'] = {
        start: options.range.from.toISOString(),
        stop: options.range.to.toISOString()
      }
      let fields: MutableField[]
      switch (target.query.type) {
        case 'counter':
          fields = await this.mutableDfFromCounter(target.metricId, {
            ...target.query.input,
            timeRange
          }, target.label)
          break
        case 'time-series':
          fields = await this.mutableDfFromTimeSeries(target.metricId, {
            ...target.query.input,
            timeRange
          }, target.label)
          break
        case 'leaderboard':
          fields = await this.mutableDfFromLeaderboard(target.metricId, {
            ...target.query.input,
            timeRange
          })
          break
        default:
          throw new Error(`Unknown query type ${(target.query as any).type}`)
      }

      return new MutableDataFrame({
        refId: target.refId,
        fields
      })
    })

    return Promise.all(promises).then((data) => ({ data }))
  }

  /**
   * Checks whether we can connect to the API.
   */
  async testDatasource (): Promise<TestResponse> {
    return this.authTokenService.getAuthToken()
      .then(async () => {
        const metrics = await this.metrics()
        if (metrics.length > 0) {
          return {
            status: 'success' as const,
            message: `Success, this application has access to ${metrics.length} metrics`
          }
        } else {
          return {
            status: 'error' as const,
            message: 'The Application is correctly configured, but does not have access to any Metric'
          }
        }
      })
      .catch((err: Error) => ({
        status: 'error' as const,
        message: err.message
      }))
  }
}
