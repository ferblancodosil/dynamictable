<script setup lang="ts">
  import { Column } from '@/logic/Column'
  import { computed } from '@vue/runtime-core'
  import Fields from './Fields.vue'

  // eslint-disable-next-line no-undef
  const props = defineProps({
    columns: {
      type: Object as () => Column[],
      required: true,
    },
  })
  const values = computed(() => {
    return props.columns.map((column: Column) => ({
      field_name: column.field_name,
      label: column.label || column.field_name,
      value: column.label || column.field_name,
    }))
  })
</script>

<template>
  <div class="column-wrapper">
    <Fields
      :show-check-box="false"
      :values="values"
    />
  </div>
</template>

<style scoped lang="scss"></style>
