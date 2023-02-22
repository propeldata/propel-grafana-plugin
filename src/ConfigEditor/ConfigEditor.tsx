import React, { ChangeEvent, ReactElement } from 'react'
import { FieldSet, InlineField, Input, SecretInput, Select } from '@grafana/ui'
import type { EditorProps } from './types'
import { useChangeOptions, useChangeSecureOptions, useResetSecureOption } from './useChangeOptions'
import { testIds } from './testIds'
import { PropelRegion } from '../types'

export function ConfigEditor (props: EditorProps): ReactElement {
  const { jsonData, secureJsonFields } = props.options
  const onRegionChange = useChangeOptions(props, 'region')
  const onClientIdChange = useChangeOptions(props, 'clientId')
  const onClientSecretChange = useChangeSecureOptions(props, 'clientSecret')
  const onResetClientSecret = useResetSecureOption(props, 'clientSecret')

  return (
    <>
      <FieldSet label="General">
        <InlineField
          label="Region"
          labelWidth={16}
          tooltip="Region where the data lives"
        >
          <Select<PropelRegion>
            value={jsonData.region ?? PropelRegion.UsEast2}
            options={Object.values(PropelRegion).map(value => ({ value, label: value }))}
            onChange={selected => selected.value != null && onRegionChange(selected.value)}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => onClientIdChange(e.target.value)}
            value={jsonData.clientId}
            placeholder={'Client Id'}
            label={'Client Id'}
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
