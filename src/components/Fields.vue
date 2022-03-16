<script setup lang="ts">
  import { computed } from '@vue/runtime-core'
  import { Row } from '@/logic/Row'
  import { useMainStore } from '@/store'
  import { ValueType } from '@/logic/ValueType'
  const mainStore = useMainStore()

  // eslint-disable-next-line no-undef
  const props = defineProps({
    id: {
      type: String,
      default: 'id',
    },
    values: {
      type: Object as () => ValueType[],
      default: () => ({}),
    },
    data2save: {
      type: Object,
      default: () => undefined,
    },
    showCheckBox: {
      type: Boolean,
      default: true,
    },
  })

  const keyValue = computed(() => {
    const filterValue: ValueType | undefined = props.values.find(
      (value: ValueType) => value.field_name === props.id
    )
    if (filterValue === undefined) {
      throw new Error(
        `Not defined key value in ${JSON.stringify(props.values)}`
      )
    }
    return filterValue.value || filterValue.label
  })

  const isSelected = computed({
    get: () => mainStore.rows.get(keyValue.value) !== undefined,
    set: (val) => {
      if (!val) {
        mainStore.deleteRow({ key: keyValue.value })
      } else {
        mainStore.addRow({
          key: keyValue.value,
          row: props.data2save || props.values,
        })
      }
    },
  })
</script>

<template>
  <div class="item-wrapper">
    <div class="item checkbox">
      <input
        v-if="showCheckBox"
        v-model="isSelected"
        type="checkbox"
      >
    </div>

    <div
      v-for="(item, index) in values"
      :key="index"
      :class="['item', item.field_name]"
    >
      <span :title="item.label">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .item-wrapper {
    color: black;
    grid-gap: 0.5rem;
    padding: 0 0.5rem;
    border-bottom: 1px solid #efefef;
    // grid-auto-columns: minmax(0, 1fr);
    grid-template-columns: 0.5fr 1fr 1.5fr 4fr 1fr 1fr 1fr 1fr;
    grid-auto-flow: column;
    display: grid;
    grid-template-areas: 'checkbox id plate location speed speed_average temperature_front temperature_back';
    .item {
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &.checkbox {
        grid-area: checkbox;
      }
      &.id {
        font-weight: bold;
        grid-area: id;
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
