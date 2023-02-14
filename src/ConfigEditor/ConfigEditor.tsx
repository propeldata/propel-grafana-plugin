import React, { ChangeEvent, ReactElement } from 'react'
import { FieldSet, InlineField, InlineSwitch, SecretInput } from '@grafana/ui'
import type { EditorProps } from './types'
import { useChangeOptions, useChangeSecureOptions, useResetSecureOption } from './useChangeOptions'
import { testIds } from './testIds'

export function ConfigEditor (props: EditorProps): ReactElement {
  const { jsonData, secureJsonFields } = props.options
  const onEnvironmentChange = useChangeOptions(props, 'environment')
  const onClientIdChange = useChangeSecureOptions(props, 'clientId')
  const onClientSecretChange = useChangeSecureOptions(props, 'clientSecret')
  const onResetClientId = useResetSecureOption(props, 'clientId')
  const onResetClientSecret = useResetSecureOption(props, 'clientSecret')

  const isDev = jsonData.environment === 'dev'

  return (
    <>
      <FieldSet label="General">
        <InlineField
          label="Dev"
          labelWidth={16}
          tooltip="Whether to use the development API or not"
        >
          <InlineSwitch
            label={'dev'}
            value={isDev}
            onClick={() => onEnvironmentChange(isDev ? 'prod' : 'dev')}
          />
        </InlineField>
      </FieldSet>

      <FieldSet label="Application credentials">
        <InlineField
          label="Client Id"
          labelWidth={16}
          tooltip="Client Id for authenticating as an Application"
        >
          <SecretInput
            onChange={(e: ChangeEvent<HTMLInputElement>) => onClientIdChange(e.target.value)}
            onReset={onResetClientId}
            isConfigured={secureJsonFields.clientId}
            placeholder={'Client Id'}
            label={'Client Id'}
            type={'password'}
            width={40}
            data-testid={testIds.configEditor.clientId}
          />
        </InlineField>
        <InlineField
          label="Client Secret"
          labelWidth={16}
          tooltip="Client Secret for authenticating as an Application"
        >
          <SecretInput
            onReset={onResetClientSecret}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onClientSecretChange(e.target.value)}
            isConfigured={secureJsonFields.clientSecret}
            label="Client Secret"
            placeholder="Client Secret"
            type={'password'}
            width={40}
            data-testid={testIds.configEditor.clientSecret}
          />
        </InlineField>
      </FieldSet>
    </>
  )
}
