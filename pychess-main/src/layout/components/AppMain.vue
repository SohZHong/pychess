<template>
  <!-- Render view only if there's a link -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive>
        <component :is="Component" :key="key" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => route.fullPath)
</script>
