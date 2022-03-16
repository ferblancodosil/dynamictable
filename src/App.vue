<script setup lang="ts">
  import Table from '@/components/Table.vue'
  import { Row } from '@/logic/Row'
  import useColumns from '@/hooks/useColumns'
  import useRows from '@/hooks/useRows'
  import { ref, reactive, computed } from 'vue'
  import '@/assets/global.css'
  import { useMainStore } from '@/store'
  const mainStore = useMainStore()

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
  const selectedRows: Row[] = computed(() => mainStore.selelectedRows as Row[])

  const removeItem = ({ key }: { key: string }) => {
    console.info('key', key)
    mainStore.deleteRow({ key })
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

    <div class="selected">
      <b>Selected items</b>
      <div v-for="(row, index) in selectedRows" :key="index">
        <img
          src="@/assets/close.svg"
          width="10"
          height="10"
          class="remove"
          title="Click to remove"
          @click="removeItem({ key: `${row.id}` })"
        />
        {{ row.id }} - {{ row.plate }}
      </div>
    </div>
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
      .remove {
        cursor: pointer;
      }
    }
  }
</style>
