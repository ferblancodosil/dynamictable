<script setup lang="ts">
  import { useMainStore } from '@/store'
  import { Row } from '@/logic/Row'
  import { computed } from 'vue'
  const mainStore = useMainStore()

  const selectedRows: Row[] = computed(() => mainStore.selelectedRows as Row[])

  const removeItem = ({ key }: { key: string }) => {
    console.info('key', key)
    mainStore.deleteRow({ key })
  }
</script>
<template>
  <div>
    <b>Selected items</b>
    <div
      v-for="(row, index) in selectedRows"
      :key="index"
    >
      <img
        src="@/assets/close.svg"
        width="10"
        height="10"
        class="remove"
        title="Click to remove"
        @click="removeItem({ key: `${row.id}` })"
      >
      {{ row.id }} - {{ row.plate }}
    </div>
  </div>
</template>
<style scoped lang="scss">
  .remove {
    cursor: pointer;
  }
</style>
