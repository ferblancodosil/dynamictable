import { Column } from '@/logic/Column'
import { TableService } from '@/services'
import { reactive } from 'vue'

export default () => {
  const columns: { items: Column[] } = reactive({ items: [] })
  const loadColumns = async () => {
    columns.items = await TableService.getColumns()
  }
  return {
    columns,
    loadColumns,
  }
}
