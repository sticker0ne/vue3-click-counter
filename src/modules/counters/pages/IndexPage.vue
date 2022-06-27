<script setup lang="ts">
  import CountersViewer from "@/modules/counters/components/HOC/CountersViewer.vue";
</script>

<template>
  <div class="counter-index-page">
    <CountersViewer />
  </div>
</template>

<style lang="scss">
  .counter-index-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
