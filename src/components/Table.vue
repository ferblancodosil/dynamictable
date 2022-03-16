<script setup lang="ts">
  import { computed } from 'vue'
  import { Row } from '@/logic/Row'
  import { Column } from '@/logic/Column'
  import RowTable from './Row.vue'
  import HeaderTable from './Header.vue'
  import VirtualList from 'vue3-virtual-scroll-list'

  // eslint-disable-next-line no-undef
  defineEmits<{
    (event: 'load-more-data'): void
  }>()
  // eslint-disable-next-line no-undef
  defineProps({
    columns: {
      type: Object as () => Column[],
      required: true,
    },
    haveMoreData: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: Object as () => Row[],
      required: true,
    },
    height: {
      type: String,
      default: '100vh',
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  })
</script>

<template>
  <div class="table">
    <HeaderTable :columns="columns" />
    <VirtualList
      class="list-infinite scroll-touch"
      :data-key="'id'"
      :data-sources="rows"
      :data-component="RowTable"
      :estimate-size="70"
      :extra-props="{ columns }"
      :item-class="'list-item-infinite'"
      :footer-class="'loader-wrapper'"
      :style="{ height: height }"
      @tobottom="$emit('load-more-data')"
    >
      <template #footer>
        <div v-if="haveMoreData">
          <div class="loader" />
        </div>
      </template>
    </VirtualList>
  </div>
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
