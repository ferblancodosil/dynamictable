<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { TableService } from '@/services'
  import { Row } from '@/logic/Row'
  // import useColumns from './loadColumns'
  import RowComponent from './RowComponent.vue'
  import VirtualList from 'vue3-virtual-scroll-list'
  // eslint-disable-next-line no-undef
  const props = defineProps({
    height: {
      type: String,
      default: '100vh',
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  })
  // const { columns, loadColumns } = useColumns()
  const rows: { items: Row[] } = reactive({ items: [] })
  const isLoading = ref(false)
  const haveMoreData = ref(true)

  const loadRows = async (initItem: number): Promise<Row[]> => {
    isLoading.value = true
    const rows = await TableService.getRows({
      initItem,
      pageSize: props.pageSize,
    })
    isLoading.value = false
    return rows
  }
  const onScrollToBottom = async () => {
    if (isLoading.value) {
      return
    }
    const newItems = await loadRows(rows.items.length)
    haveMoreData.value = newItems.length > 0
    rows.items = rows.items.concat(newItems)
  }
  onMounted(async () => {
    // await loadColumns()
    rows.items = await loadRows(0)
  })
</script>

<template>
  <VirtualList
    class="list-infinite scroll-touch"
    :data-key="'id'"
    :data-sources="rows.items"
    :data-component="RowComponent"
    :estimate-size="70"
    :item-class="'list-item-infinite'"
    :footer-class="'loader-wrapper'"
    :style="{ height: height }"
    @tobottom="onScrollToBottom"
  >
    <template #footer>
      <div v-if="haveMoreData">
        <div class="loader" />
      </div>
    </template>
  </VirtualList>
</template>

<style scoped lang="scss">
  .list-infinite {
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    position: relative;
    .list-item-infinite {
      display: flex;
      align-items: center;
      padding: 1em;
    }
    .loader {
      font-size: 10px;
      margin: 0px auto;
      text-indent: -9999em;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #ffffff;
      background: linear-gradient(
        to right,
        #9b4dca 10%,
        rgba(255, 255, 255, 0) 42%
      );
      position: relative;
      animation: load3 1.4s infinite linear;
      transform: translateZ(0);
    }
    .loader:before {
      width: 50%;
      height: 50%;
      background: #9b4dca;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
    }
    .loader:after {
      background: #ffffff;
      width: 75%;
      height: 75%;
      border-radius: 50%;
      content: '';
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    @-webkit-keyframes load3 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes load3 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
