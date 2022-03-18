<script setup lang="ts">
  import Table from '@/components/Table.vue'
  import Selections from '@/components/Selections.vue'
  import useColumns from '@/hooks/useColumns'
  import useRows from '@/hooks/useRows'
  import { Row } from '@/logic/Row'
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
  <div class="wrapper">
    <Table
      :columns="columns.items"
      :rows="rows.items"
      height="70vh"
      class="table"
      @load-more-data="loadMoreRows"
    />
    <Selections class="selected" />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .wrapper {
      display: flex;
      flex-direction: row;
    }
    .table {
      border: 2px solid;
      border-color: dimgray;
      width: 80vw;
    }
    .selected {
      width: 20vw;
    }
  }
</style>
