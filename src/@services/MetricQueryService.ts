import { GraphQLClient } from 'graphql-request'
import filterInvalidDimensions from '../@utils/filterInvalidDimensions'
import filterInvalidFilters from '../@utils/filterInvalidFilters'
import raise from '../@utils/raise'
import { CounterInput, getSdk, LeaderboardInput, MetricInfoFragment, Sdk, TimeSeriesInput } from '../generated/graphql'

export interface MetricQueryServiceOptions {
  apiUrl: string
  tokenGetter: () => Promise<string>
}

export default class MetricQueryService {
  constructor (private readonly options: MetricQueryServiceOptions) {}

  private async makeClient (): Promise<Sdk> {
    const token = await this.options.tokenGetter()
    return getSdk(new GraphQLClient(
      this.options.apiUrl,
      { headers: { authorization: 'Bearer ' + token } }
    ))
  }

  async metrics (): Promise<MetricInfoFragment[]> {
    const client = await this.makeClient()
    const response = await client.metrics()
    return response.metrics?.nodes ?? []
  }

  async counter (metricId: string, input: CounterInput = { timeRange: {} }): Promise<number> {
    const client = await this.makeClient()
    input = { ...input, filters: filterInvalidFilters(input.filters ?? []) }
    const result = await client.metricCounter({ id: metricId, input })
    return Number(result.metric?.counter?.value ?? raise('Could not query counter'))
  }

  async timeSeries (metricId: string, input: TimeSeriesInput): Promise<[Date[], number[]]> {
    const client = await this.makeClient()
    input = { ...input, filters: filterInvalidFilters(input.filters ?? []) }
    const result = await client.metricTimeSeries({ id: metricId, input })
    return [
      (result.metric?.timeSeries?.labels ?? raise('Could not query timeSeries')).map(v => new Date(v)),
      (result.metric?.timeSeries?.values ?? raise('Could not query timeSeries')).map(v => Number(v))
    ]
  }

  async leaderboard (metricId: string, input: LeaderboardInput): Promise<{ header: string[], columns: Array<Array<number | string>> }> {
    const client = await this.makeClient()
    input = { ...input, filters: filterInvalidFilters(input.filters ?? []), dimensions: filterInvalidDimensions(input.dimensions) }
    const result = await client.metricLeaderboard({ id: metricId, input })
    const header = result.metric?.leaderboard?.headers ?? []
    const rows = result.metric?.leaderboard?.rows ?? []
    const columns: Array<Array<string | null>> = []
    for (let i = 0; i < header.length; i++) {
      const column: Array<string | null> = []
      for (const row of rows) column.push(row[i])
      columns.push(column)
    }
    return {
      header,
      columns: columns.map(column => {
        if (rowIsNumeric(column)) {
          return column.map(el => Number(el))
        } else {
          return column.map(el => el ?? '')
        }
      }) ?? []
    }
  }
}

function rowIsNumeric (column: any[]): boolean {
  for (const el of column) {
    if (el == null) continue
    if (el === '') return false
    return !isNaN(el)
  }
  return false
}
