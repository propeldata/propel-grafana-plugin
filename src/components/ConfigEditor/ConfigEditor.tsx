import React, { ReactElement } from 'react'
import { FieldSet, InlineField, Input, LegacyForms } from '@grafana/ui'
import type { EditorProps } from './types'
import { useChangeOptions } from './useChangeOptions'
import { useChangeSecureOptions } from './useChangeSecureOptions'
import { useResetSecureOptions } from './useResetSecureOptions'
import { testIds } from '../testIds'

const { SecretFormField } = LegacyForms

const defaultUrl = 'https://api.us-east-2.propeldata.com/graphql'

export function ConfigEditor (props: EditorProps): ReactElement {
  const { jsonData, secureJsonData, secureJsonFields } = props.options
  const onTimeFieldChange = useChangeOptions(props, 'apiUrl')
  const onClientIdChange = useChangeSecureOptions(props, 'clientId')
  const onResetClientId = useResetSecureOptions(props, 'clientId')
  const onClientSecretChange = useChangeSecureOptions(props, 'clientSecret')
  const onResetClientSecret = useResetSecureOptions(props, 'clientSecret')

  return (
    <>
      <FieldSet label="General">
        <InlineField label="Api Url" tooltip="Url for the Propel data Api">
          <Input
            onChange={onTimeFieldChange}
            placeholder={defaultUrl}
            width={40}
            data-testid={testIds.configEditor.apiUrl}
            default={true}
            defaultValue={defaultUrl}
            value={jsonData?.apiUrl ?? ''}
          />
        </InlineField>
      </FieldSet>

      <FieldSet label="Application credentials">
        <SecretFormField
          tooltip="Client Id for authenticating as an Application"
          isConfigured={Boolean(secureJsonFields.clientId)}
          value={secureJsonData?.clientId ?? ''}
          label="Client Id"
          placeholder="Client Id"
          labelWidth={8}
          inputWidth={20}
          data-testid={testIds.configEditor.clientId}
          onReset={onResetClientId}
          onChange={onClientIdChange}
        />
        <SecretFormField
          tooltip="Client Secret for authenticating as an Application"
          isConfigured={Boolean(secureJsonFields.clientSecret)}
          value={secureJsonData?.clientSecret ?? ''}
          label="Client Secret"
          placeholder="Client Secret"
          labelWidth={8}
          inputWidth={20}
          data-testid={testIds.configEditor.clientSecret}
          onReset={onResetClientSecret}
          onChange={onClientSecretChange}
        />
      </FieldSet>
    </>
  )
}
