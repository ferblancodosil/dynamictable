import { Row } from '@/logic/Row'
import { TableService } from '@/services'
import { ref } from 'vue'

export default () => {
  const isLoading = ref(false)

  const loadRows = async (
    initItem: number,
    pageSize: number
  ): Promise<Row[]> => {
    isLoading.value = true
    const rows = await TableService.getRows({
      initItem,
      pageSize: pageSize,
    })
    isLoading.value = false
    return rows
  }
  return {
    isLoading,
    loadRows,
  }
}
