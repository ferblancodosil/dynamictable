import { Column } from './Column'
import { Row } from './Row'

export class Table {
  columns: Column[]
  rows: Row[]

  constructor({ columns, rows }: { columns: Column[]; rows: Row[] }) {
    this.columns = columns
    this.rows = rows
  }
}
