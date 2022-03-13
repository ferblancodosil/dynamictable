<script setup lang="ts">
  import Table from '@/components/Table.vue'
  import { ref } from 'vue'
  import '@/assets/global.css'

  const pageSize = ref(30)
</script>

<template>
  <h1>Example table</h1>
  <Table height="50vh" :page-size="pageSize" class="table" />
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
