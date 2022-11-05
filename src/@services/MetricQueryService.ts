import { GraphQLClient } from 'graphql-request'
import raise from '../@utils/raise'
import { CounterInput, getSdk, Sdk, TimeSeriesInput, MetricInfoFragment, FilterInput } from '../generated/graphql'

export interface MetricQueryServiceOptions {
  apiUrl: string
  tokenGetter: () => Promise<string>
}

function filterInvalidFilters (filters: FilterInput[]): FilterInput[] {
  return filters.filter(f => f.column !== '' && f.value !== '')
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
}
