import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import { defaultAuthUrl } from '../@components/ConfigEditor/ConfigEditor'

export interface AuthTokenServiceOptions {
  clientId: string
  clientSecret: string
  authUrl: string
}

export default class AuthTokenService {
  private token?: string

  constructor (private readonly options: AuthTokenServiceOptions) { }

  async getAuthToken (): Promise<string> {
    if (this.token !== undefined && this.isExpired(this.token)) {
      this.token = undefined
    }
    this.token ??= await this._getAuthToken()
    return this.token
  }

  isExpired (token: string): boolean {
    const decoded: any = jwtDecode(token)
    if ('exp' in decoded && typeof decoded.exp === 'number') {
      return new Date().getTime() - decoded.exp * 1000 > 0
    } else {
      throw new Error('Could not validate token expiration')
    }
  }

  private async _getAuthToken (): Promise<string> {
    if ((this.options.clientId ?? '') === '') {
      throw new Error('Client Id is not set')
    } else if ((this.options.clientSecret ?? '') === '') {
      throw new Error('Client secret is not set')
    }
    const response = await Axios.post(
      this.options.authUrl ?? defaultAuthUrl,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.options.clientId ?? '',
        client_secret: this.options.clientSecret ?? ''
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    if (response.status !== 200) {
      throw new Error(`Received unexpected status code ${response.status}`)
    }
    let data: { access_token?: string }
    const result = response.data
    if (typeof result !== 'object') {
      throw new Error(`Failed to parse response as Json: ${result}`)
    } else {
      data = result
    }
    if ('access_token' in data && typeof data.access_token === 'string') {
      return data.access_token
    } else {
      throw new Error(`Unexpected response format from ${this.options.authUrl}: ${JSON.stringify(data)}`)
    }
  }
}
