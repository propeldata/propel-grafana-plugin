import { DimensionInput } from '../generated/graphql'

export default function filterInvalidDimensions (columns: DimensionInput[]): DimensionInput[] {
  return columns.filter(c => c.columnName !== '')
}
