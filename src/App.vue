<script setup lang="ts">
  import Table from '@/components/Table.vue'
  import { Row } from '@/logic/Row'
  import useColumns from '@/hooks/loadColumns'
  import useRows from '@/hooks/loadRows'
  import { ref, reactive } from 'vue'
  import '@/assets/global.css'

  const rows: { items: Row[] } = reactive({ items: [] })
  const { columns, loadColumns } = useColumns()
  const { loadRows, isLoading } = useRows()
  const haveMoreData = ref(true)

  const pageSize = ref(30)
  const loadMoreRows = async () => {
    if (isLoading.value) {
      return
    }
    const newItems = await loadRows(rows.items.length, pageSize.value)
    haveMoreData.value = newItems.length > 0
    rows.items = rows.items.concat(newItems)
  }

  loadColumns()
  loadMoreRows()
</script>

<template>
  <h1>Example table</h1>
  <Table
    :columns="columns.items"
    :rows="rows.items"
    height="50vh"
    class="table"
    @load-more-data="loadMoreRows"
  />
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .table {
      border: 2px solid;
      border-color: dimgray;
    }
  }
</style>
