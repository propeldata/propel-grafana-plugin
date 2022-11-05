import dotenv from 'dotenv'
import raise from '../@utils/raise'
import { defaultAuthUrl } from '../components/ConfigEditor/ConfigEditor'
import AuthTokenService from './AuthTokenService'
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID ?? raise('CLIENT_ID env variable not set')
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? raise('CLIENT_SECRET env variable not set')
const EXPIRED_TOKEN = process.env.EXPIRED_TOKEN ?? raise('EXPIRED_TOKEN env variable not set')

describe('AuthTokenService', function () {
  const authTokenService = new AuthTokenService({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    authUrl: defaultAuthUrl
  })

  it('should fetch a token', async function () {
    const token = await authTokenService.getAuthToken()
    expect(authTokenService.isExpired(token)).toEqual(false)
  })

  it('should verify if a token is expired', function () {
    expect(authTokenService.isExpired(EXPIRED_TOKEN)).toEqual(true)
  })
})
