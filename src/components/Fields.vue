<script setup lang="ts">
  // eslint-disable-next-line no-undef
  defineProps({
    values: {
      type: Object,
      default: () => ({}),
    },
  })
</script>

<template>
  <div class="item-wrapper">
    <div
      v-for="(item, index) in values"
      :key="index"
      :class="['item', item.field_name]"
      :title="item.label"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .item-wrapper {
    color: black;
    grid-gap: 0.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #efefef;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    display: grid;
    grid-template-areas: 'id plate location speed speed_average temperature_front temperature_back';
    .item {
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
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
