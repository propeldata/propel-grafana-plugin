import React, { ReactElement } from 'react'
import { FieldSet, InlineField, Input } from '@grafana/ui'
import type { EditorProps } from './types'
import { useChangeOptions } from './useChangeOptions'
import { testIds } from './testIds'

export const defaultApiUrl = 'https://api.us-east-2.propeldata.com/graphql'
export const defaultAuthUrl = 'https://auth.us-east-2.propeldata.com/oauth2/token'

export function ConfigEditor (props: EditorProps): ReactElement {
  const { jsonData } = props.options
  const onApiUrlChange = useChangeOptions(props, 'apiUrl')
  const onAuthUrlChange = useChangeOptions(props, 'authUrl')
  const onClientIdChange = useChangeOptions(props, 'clientId')
  const onClientSecretChange = useChangeOptions(props, 'clientSecret')

  return (
    <>
      <FieldSet label="General">
        <InlineField label="Api Url" tooltip="Url for the Propel data Api">
          <Input
            onChange={onApiUrlChange}
            placeholder={defaultApiUrl}
            width={40}
            data-testid={testIds.configEditor.apiUrl}
            default={true}
            defaultValue={defaultApiUrl}
            value={jsonData?.apiUrl ?? ''}
          />
        </InlineField>
        <InlineField label="Auth Url" tooltip="Url for the OAuth flow">
          <Input
            onChange={onAuthUrlChange}
            placeholder={defaultAuthUrl}
            width={40}
            data-testid={testIds.configEditor.apiUrl}
            default={true}
            defaultValue={defaultAuthUrl}
            value={jsonData?.authUrl ?? ''}
          />
        </InlineField>
      </FieldSet>

      <FieldSet label="Application credentials">
        <InlineField
          label="Client Id"
          labelWidth={16}
          tooltip="Client Id for authenticating as an Application"
        >
          <Input
            onChange={onClientIdChange}
            placeholder={'Client Id'}
            label={'Client Id'}
            width={40}
            data-testid={testIds.configEditor.clientId}
            value={jsonData?.clientId ?? ''}
          />
        </InlineField>
        <InlineField
          label="Client Secret"
          labelWidth={16}
          tooltip="Client Secret for authenticating as an Application"
        >
          <Input
            onChange={onClientSecretChange}
            label="Client Secret"
            placeholder="Client Secret"
            type={'password'}
            width={40}
            data-testid={testIds.configEditor.clientSecret}
            value={jsonData?.clientSecret ?? ''}
          />
        </InlineField>
      </FieldSet>
    </>
  )
}
