import React, { ChangeEvent, PureComponent } from 'react'
import { LegacyForms } from '@grafana/ui'
import { DataSourcePluginOptionsEditorProps } from '@grafana/data'
import { MyDataSourceOptions, MySecureJsonData } from './types'

const { SecretFormField, FormField } = LegacyForms

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onPathChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { onOptionsChange, options } = this.props
    const jsonData = {
      ...options.jsonData,
      path: event.target.value
    }
    onOptionsChange({ ...options, jsonData })
  }

  // Secure field (only sent to the backend)
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { onOptionsChange, options } = this.props
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value
      }
    })
  }

  onResetAPIKey = (): void => {
    const { onOptionsChange, options } = this.props
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: ''
      }
    })
  }

  render (): React.ReactNode {
    const { options } = this.props
    const { jsonData, secureJsonFields } = options
    const secureJsonData = ((options.secureJsonData != null) || {}) as MySecureJsonData

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="Path"
            labelWidth={6}
            inputWidth={20}
            onChange={this.onPathChange}
            value={jsonData.path ?? ''}
            placeholder="json field returned to frontend"
          />
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={secureJsonFields?.apiKey !== undefined}
              value={secureJsonData.apiKey ?? ''}
              label="API Key"
              placeholder="secure json field (backend only)"
              labelWidth={6}
              inputWidth={20}
              onReset={this.onResetAPIKey}
              onChange={this.onAPIKeyChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
