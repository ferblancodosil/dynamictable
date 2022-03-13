<script setup lang="ts">
  import { Column } from '@/logic/Column'
  import { Row } from '@/logic/Row'
  import useColumns from './loadColumns'
  import { Location } from '@/logic/Location'
  import { FORMATS } from '@/logic/Formats'
  import { MEASURES } from '@/logic/Measures'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    source: {
      type: Object,
      default: () => ({ row: [], columns: [] }),
    },
  })
  const { columns, loadColumns } = useColumns()
  const row = props.source as Row

  const format = ({ column }: { column: Column }): string => {
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
  loadColumns()
</script>

<template>
  <div class="row-wrapper">
    <div
      v-for="(column, index) in columns.items"
      :key="index"
      :class="['item', column.field_name]"
      :title="column.field_name"
    >
      {{ format({ column }) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .row-wrapper {
    color: black;
    grid-gap: 0.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #efefef;
    width: 100%;
    display: grid;
    grid-template-areas: 'id plate location speed speed_average temperature_front temperature_back';
    .item {
      padding: 0.5rem;
      &.id {
        font-weight: bold;
        display: flex;
        grid-area: id;
        justify-content: center;
        align-items: center;
      }

      &.plate {
        font-weight: 700;
        grid-area: plate;
        text-align: left;
      }

      &.location {
        font-style: italic;
        grid-area: location;
        text-align: right;
        padding-right: 0.5rem;
      }

      &.speed {
        grid-area: speed;
      }

      &.speed_average {
        grid-area: speed_average;
      }
      &.temperature_front {
        grid-area: temperature_front;
      }
      &.temperature_back {
        grid-area: temperature_back;
      }
    }
  }
</style>
