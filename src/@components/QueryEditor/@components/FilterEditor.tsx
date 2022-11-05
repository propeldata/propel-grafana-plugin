import { css } from '@emotion/css'
import { Button, FieldSet, InlineField, InlineFieldRow, Input, Select, useStyles2 } from '@grafana/ui'
import React, { ChangeEvent, ReactElement } from 'react'
import { DimensionFragment, Filter, FilterInput, FilterOperator } from '../../../generated/graphql'

export interface FilterEditorProps {
  filters: FilterInput[]
  dimensions: DimensionFragment[]
  onFilters: (filters: Filter[]) => any
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function style () {
  return {
    marginTop: css`margin-top: 10px`
  }
}

function copyFilters (filters: FilterInput[]): FilterInput[] {
  return filters.map(f => ({ ...f }))
}

function serializeFilter (filter: FilterInput, index: number): string {
  return index.toString() + filter.column+filter.operator+filter.value
}

export default function FilterEditor (props: FilterEditorProps): ReactElement {
  const C = useStyles2(style)

  return <FieldSet label={'Filters'} className={C.marginTop}>
    {props.filters.map((filter, i) =>
      <InlineFieldRow key={serializeFilter(filter, i)} >
        <InlineField label={'column'} >
          <Select
            options={props.dimensions.map(d => ({ label: d.columnName, value: d.columnName }))}
            value={filter.column}
            onChange={e => {
              const newFilters = copyFilters(props.filters)
              newFilters[i].column = e.value ?? ''
              props.onFilters(newFilters)
            }}
          />
        </InlineField>
        <InlineField label={'operator'}>
          <Select
            options={Object.values(FilterOperator).map(f => ({ label: f, value: f }))}
            defaultValue={FilterOperator.Equals}
            value={filter.operator}
            onChange={e => {
              const newFilters = copyFilters(props.filters)
              newFilters[i].operator = e.value ?? FilterOperator.Equals
              props.onFilters(newFilters)
            }}
          />
        </InlineField>
        <InlineField label={'value'}>
          <Input
            value={filter.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const newFilters = copyFilters(props.filters)
              newFilters[i].value = e.target.value
              props.onFilters(newFilters)
            }}
          />
        </InlineField>
        <Button
          variant={'destructive'}
          onClick={() => {
            const newFilters = copyFilters(props.filters)
            newFilters[i] = undefined as any
            props.onFilters(newFilters.filter(f => f !== undefined))
          }}
        >
          Remove
        </Button>
      </InlineFieldRow>
    )}
    <InlineFieldRow >
      <Button
        onClick={() => {
          const newFilters = copyFilters(props.filters)
          newFilters.push({ column: '', operator: FilterOperator.Equals, value: '' })
          props.onFilters(newFilters)
        }}
      >
        Add
      </Button>
    </InlineFieldRow>
  </FieldSet>
}
