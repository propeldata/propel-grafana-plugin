import { FieldSet, InlineField, Select } from '@grafana/ui'
import React, { HTMLProps, ReactElement } from 'react'
import { TimeSeriesGranularity } from '../../generated/graphql'

export interface GranularityEditorProps extends HTMLProps<HTMLFieldSetElement> {
  granularity: TimeSeriesGranularity
  onGranularity: (granularity: TimeSeriesGranularity) => any
}

export default function GranularityEditor ({
  granularity,
  onGranularity,
  ...fieldSetProps
}: GranularityEditorProps): ReactElement {
  return <FieldSet label={'Granularity'} { ...fieldSetProps}>
    <InlineField label={'time granularity'}>
      <Select
        options={Object.values(TimeSeriesGranularity).map(f => ({ label: f, value: f }))}
        defaultValue={TimeSeriesGranularity.Day}
        value={granularity}
        onChange={e => {
          if (e.value !== undefined) onGranularity(e.value)
        }}
      />
    </InlineField>
  </FieldSet>
}
