<script setup lang="ts">
  import { useCountersService } from "@/modules/counters/services/counters.service";
  import { onBeforeMount } from "vue";

  const { loadCounters, counters, incrementCounter, decrementCounter } = useCountersService();

  onBeforeMount(loadCounters);
</script>

<template>
  <div class="counter-viewer">
    <button
      v-for="counter in counters"
      :key="`counter-key-${counter.id}`"
      class="counter-item glow-on-hover"
      @click="incrementCounter({ id: counter.id })"
      @click.right.prevent="decrementCounter({ id: counter.id })"
    >
      {{ counter.value }}
    </button>
  </div>
</template>

<style lang="scss">
  .counter-viewer {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-around;

    .counter-item {
      width: 100px;
      height: 100px;
      background-color: lightgray;
      text-align: center;
      font-size: 30px;
      line-height: 100px;
    }

    .glow-on-hover {
      width: 100px;
      height: 100px;
      border: none;
      outline: none;
      color: #fff;
      background: #111;
      cursor: pointer;
      position: relative;
      z-index: 0;
      border-radius: 10px;
    }

    .glow-on-hover:before {
      content: "";
      background: linear-gradient(
        45deg,
        #ff0000,
        #ff7300,
        #fffb00,
        #48ff00,
        #00ffd5,
        #002bff,
        #7a00ff,
        #ff00c8,
        #ff0000
      );
      position: absolute;
      top: -2px;
      left: -2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      border-radius: 10px;
    }

    .glow-on-hover:active {
      color: #000;
    }

    .glow-on-hover:active:after {
      background: transparent;
    }

    .glow-on-hover:hover:before {
      opacity: 1;
    }

    .glow-on-hover:after {
      z-index: -1;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #111;
      left: 0;
      top: 0;
      border-radius: 10px;
    }

    @keyframes glowing {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 400% 0;
      }
      100% {
        background-position: 0 0;
      }
    }
  }
</style>
