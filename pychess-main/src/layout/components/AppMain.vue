<template>
  <!-- Render view only if there's a link -->
  <router-view v-slot="{ Component, route }">
  <transition name="fade">
      <keep-alive>
      <component :is="Component" v-if="!route.meta.link" :key="key" />
      </keep-alive>
  </transition>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppMain',
  setup () {
    const route = useRoute()
    const key = computed(() => route.fullPath)
    return {
      route,
      key
    }
  }
})

</script>

<style scoped>

</style>
