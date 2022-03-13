import { FORMATS } from './Formats'
import { MEASURES } from './Measures'
import { FIELDS } from './Fields'

export class Column {
  field!: FIELDS
  field_name!: string
  label!: string
  sortable?: boolean
  format?: FORMATS
  measure?: MEASURES
  precision?: number

  constructor({
    field,
    label,
    sortable,
    format,
    measure,
    precision,
  }: {
    field: string
    label: string
    sortable?: boolean
    format?: string
    measure?: string
    precision?: number
  }) {
    this.field = FIELDS[field as keyof typeof FIELDS]
    this.field_name = field
    this.label = label
    this.sortable = sortable || false
    this.precision = precision
    this.format = FORMATS[format as keyof typeof FORMATS]
    this.measure = MEASURES[measure as keyof typeof MEASURES]
  }
}
