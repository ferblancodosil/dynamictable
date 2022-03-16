import { defineStore } from 'pinia'
import { Row } from '@/logic/Row'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    rows: new Map<string, object>(),
  }),
  getters: {
    selelectedRows(): object[] {
      return [...this.rows.values()]
    },
  },
  actions: {
    addRow({ key, row }: { key: string; row: object }) {
      if (!key || !row) return
      this.rows.set(key, row)
    },
    deleteRow({ key }: { key: string }) {
      this.rows.delete(key)
    },
  },
})
