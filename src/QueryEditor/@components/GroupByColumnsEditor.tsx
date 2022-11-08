import { Button, FieldSet, InlineFieldRow, InlineField, Select } from '@grafana/ui'
import React, { HTMLProps, ReactElement } from 'react'
import { DimensionFragment } from '../../generated/graphql'

export interface GroupByColumnsEditorProps extends HTMLProps<HTMLFieldSetElement> {
  dimensions: DimensionFragment[]
  columns: string[]
  onColumns: (columns: string[]) => any
}

function copyColumns (columns: string[]): string[] {
  return [...columns]
}

export default function GroupByColumnsEditor ({
  columns,
  onColumns,
  dimensions,
  ...fieldSetProps
}: GroupByColumnsEditorProps): ReactElement {
  return <FieldSet label={'Group by columns'} {...fieldSetProps}>
    {columns.map((column, i) =>
      <InlineFieldRow key={i.toString() + column}>
        <InlineField label={'column'} >
          <Select
            options={dimensions.map(d => ({ label: d.columnName, value: d.columnName }))}
            value={column}
            onChange={e => {
              const newColumns = copyColumns(columns)
              newColumns[i] = e.value as string
              onColumns(newColumns)
            }}
          />
        </InlineField>
        <Button
          variant={'destructive'}
          onClick={() => {
            const newColumns = copyColumns(columns)
            newColumns[i] = undefined as any
            onColumns(newColumns.filter(column => column !== undefined))
          }}
        >
          Remove
        </Button>
      </InlineFieldRow>
    )}
    <InlineFieldRow >
      <Button
        onClick={() => {
          const newColumns = copyColumns(columns)
          newColumns.push('')
          onColumns(newColumns)
        }}
      >
        Add
      </Button>
    </InlineFieldRow>
  </FieldSet>
}
