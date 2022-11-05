import { Button, FieldSet, InlineField, InlineFieldRow, Input, Select } from '@grafana/ui'
import React, { ChangeEvent, HTMLProps, ReactElement } from 'react'
import { DimensionFragment, Filter, FilterInput, FilterOperator } from '../../../generated/graphql'

export interface FilterEditorProps extends HTMLProps<HTMLFieldSetElement> {
  filters: FilterInput[]
  dimensions: DimensionFragment[]
  onFilters: (filters: Filter[]) => any
}

function copyFilters (filters: FilterInput[]): FilterInput[] {
  return filters.map(f => ({ ...f }))
}

function serializeFilter (filter: FilterInput, index: number): string {
  return index.toString() + filter.column+filter.operator+filter.value
}

export default function FilterEditor ({
  filters,
  dimensions,
  onFilters,
  ...fieldSetProps
}: FilterEditorProps): ReactElement {
  return <FieldSet label={'Filters'} {...fieldSetProps}>
    {filters.map((filter, i) =>
      <InlineFieldRow key={serializeFilter(filter, i)} >
        <InlineField label={'column'} >
          <Select
            options={dimensions.map(d => ({ label: d.columnName, value: d.columnName }))}
            value={filter.column}
            onChange={e => {
              const newFilters = copyFilters(filters)
              newFilters[i].column = e.value ?? ''
              onFilters(newFilters)
            }}
          />
        </InlineField>
        <InlineField label={'operator'}>
          <Select
            options={Object.values(FilterOperator).map(f => ({ label: f, value: f }))}
            defaultValue={FilterOperator.Equals}
            value={filter.operator}
            onChange={e => {
              const newFilters = copyFilters(filters)
              newFilters[i].operator = e.value ?? FilterOperator.Equals
              onFilters(newFilters)
            }}
          />
        </InlineField>
        <InlineField label={'value'}>
          <Input
            value={filter.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const newFilters = copyFilters(filters)
              newFilters[i].value = e.target.value
              onFilters(newFilters)
            }}
          />
        </InlineField>
        <Button
          variant={'destructive'}
          onClick={() => {
            const newFilters = copyFilters(filters)
            newFilters[i] = undefined as any
            onFilters(newFilters.filter(f => f !== undefined))
          }}
        >
          Remove
        </Button>
      </InlineFieldRow>
    )}
    <InlineFieldRow >
      <Button
        onClick={() => {
          const newFilters = copyFilters(filters)
          newFilters.push({ column: '', operator: FilterOperator.Equals, value: '' })
          onFilters(newFilters)
        }}
      >
        Add
      </Button>
    </InlineFieldRow>
  </FieldSet>
}
