import dotenv from 'dotenv'
import raise from '../@utils/raise'
import { defaultApiUrl, defaultAuthUrl } from '../components/ConfigEditor/ConfigEditor'
import AuthTokenService from './AuthTokenService'
import MetricQueryService from './MetricQueryService'
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID ?? raise('CLIENT_ID env variable not set')
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? raise('CLIENT_SECRET env variable not set')
const METRIC_ID = process.env.METRIC_ID ?? raise('METRIC_ID env variable not set')

const authTokenService = new AuthTokenService({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  authUrl: defaultAuthUrl
})

const metricQueryService = new MetricQueryService({
  apiUrl: defaultApiUrl,
  tokenGetter: async () => await authTokenService.getAuthToken()
})

describe('MetricQueryService', function () {
  it('should retrieve all Metrics', async function () {
    const metrics = await metricQueryService.metrics() ?? raise('Not found')
    expect(metrics.length).toBeGreaterThan(0)
  })

  it('should query as a counter', async function () {
    const result = await metricQueryService.counter(METRIC_ID) ?? raise('Error')
    expect(typeof result).toEqual('number')
  })
})
