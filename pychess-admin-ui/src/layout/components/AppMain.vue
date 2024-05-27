<template>
    <el-container class="app-main">
        <!-- Render view only if theres a link -->
        <transition name="fade">
            <keep-alive>
                <router-view v-if="!$route.meta.link" :key="key"/>
            </keep-alive>
        </transition>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppMain',
  setup () {
    const route = useRoute()
    const key = computed(() => route.fullPath)
    return { key, route }
  }
})
</script>

<style scoped>
.app-main {
  display: flex;
  flex-direction: column;
}
</style>
