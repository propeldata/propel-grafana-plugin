import { FilterInput } from '../generated/graphql'

export default function filterInvalidFilters (filters: FilterInput[]): FilterInput[] {
  return filters.filter(f => f.column !== '' && f.value !== '')
}
