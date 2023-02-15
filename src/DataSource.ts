import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  FieldType,
  MutableDataFrame,
  MutableField
} from '@grafana/data'
import MetricQueryService from './@services/MetricQueryService'
import { CounterInput, LeaderboardInput, MetricInfoFragment, TimeSeriesInput } from './generated/graphql'
import { MetricQuery, PropelDataSourceOptions, PropelEnvironment, PropelQuery, PropelRegion, TestResponse } from './types'

export class DataSource extends DataSourceApi<PropelQuery, PropelDataSourceOptions> {
  static queryTypes = ['counter', 'time-series', 'leaderboard'] as Array<MetricQuery['type']>

  private readonly metricQueryService: MetricQueryService

  constructor (instanceSettings: DataSourceInstanceSettings<PropelDataSourceOptions>) {
    super(instanceSettings)
    const { url, jsonData } = instanceSettings
    if (url !== undefined) {
      const apiUrl = `${url}/${jsonData.region ?? PropelRegion.UsEast2}/${jsonData.environment ?? PropelEnvironment.Prod}`
      this.metricQueryService = new MetricQueryService({ apiUrl })
    } else {
      throw new Error('Internal plugin error: instanceSettings.url is undefined')
    }
  }

  async metrics (): Promise<MetricInfoFragment[]> {
    return this.metricQueryService.metrics()
  }

  private async mutableDfFromCounter (metricId: string, input: CounterInput, label?: string): Promise<Array<MutableField<number>>> {
    const result = await this.metricQueryService.counter(metricId, input)
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
    const [labels, values] = await this.metricQueryService.timeSeries(metricId, input)
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
    const { header, columns } = await this.metricQueryService.leaderboard(metricId, input)
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

  async query (options: DataQueryRequest<PropelQuery>): Promise<DataQueryResponse> {
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
    try {
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
    } catch (err) {
      return {
        status: 'error' as const,
        message: (err as Error).message
      }
    }
  }
}
