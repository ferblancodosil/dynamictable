import axios from 'axios'
import { Table } from '@/logic/Table'
import { Column } from '@/logic/Column'
import { Row } from '@/logic/Row'
import { Location } from '@/logic/Location'

let temporalData: Table | undefined = undefined

const getData = async (): Promise<Table> => {
  if (!temporalData) {
    const { data } = await axios({
      url: 'data.json',
      method: 'GET',
      headers: {
        Accept: 'application/json; odata=verbose',
      },
    })
    temporalData = new Table({
      columns: data.columns.map(
        (c: {
          field: string
          label: string
          sortable?: boolean | undefined
          format?: string | undefined
          measure?: string | undefined
          precision?: number | undefined
        }) => new Column(c)
      ),
      rows: data.rows.map(
        (r: {
          id: number
          plate: string
          location: Location
          speed: number
          speed_average: number
          temperature_front: number
          temperature_back: number
        }) => new Row(r)
      ),
    })
  }
  return temporalData
}

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getColumns = async (): Promise<Column[]> => {
  const data: Table = await getData()
  return data.columns
}

export const getRows = async ({
  initItem = 0,
  pageSize = 20,
}: { initItem?: number; pageSize?: number } = {}): Promise<Row[]> => {
  const data: Table = await getData()
  await timeout(2000) // Simulate response time
  return data.rows.splice(initItem, pageSize)
}
