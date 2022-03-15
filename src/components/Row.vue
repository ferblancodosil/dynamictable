<script setup lang="ts">
  import { Column } from '@/logic/Column'
  import { Row } from '@/logic/Row'
  import useColumns from '@/hooks/loadColumns'
  import { Location } from '@/logic/Location'
  import { FORMATS } from '@/logic/Formats'
  import { MEASURES } from '@/logic/Measures'
  import { computed } from '@vue/runtime-core'
  import Fields from './Fields.vue'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    source: {
      type: Object as () => Row,
      default: () => ({}),
    },
  })
  const { columns, loadColumns } = useColumns()

  const format = ({ column, row }: { column: Column; row: Row }): string => {
    let item = row[column.field_name as keyof Row]
    if (column.precision) {
      item = Number(item).toFixed(column.precision)
    }
    if (column.format === FORMATS.location) {
      const location: Location = item as Location
      item = `${location.address}, ${location.postal_code} ${location.city} - ${location.country}`
    }
    if (column.format === FORMATS.speed) {
      item = `${item} ${
        column.measure !== undefined ? MEASURES[column.measure] : ''
      }`
    }
    if (column.format === FORMATS.temperature) {
      item = `${item} ${
        column.measure === undefined
          ? ''
          : column.measure === MEASURES.celsius
          ? 'ºC'
          : 'ºF'
      }`
    }
    return `${item}`
  }
  const values = computed(() => {
    return columns.items.map((column: Column) => ({
      field_name: column.field_name,
      label: column.label || column.field_name,
      value: format({ column, row: props.source }),
    }))
  })
  loadColumns()
</script>

<template>
  <div class="row-wrapper">
    <Fields :values="values" />
  </div>
</template>

<style scoped lang="scss"></style>
