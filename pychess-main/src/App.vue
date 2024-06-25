<template>
  <div id="app">
    <router-view />
    <alert-box />
  </div>
</template>

<script lang="ts" setup>
import AlertBox from '@/components/AlertBox.vue'
</script>

<style>
#app {
  font-family: "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
