<template>
    <el-container class="app-main">
        <!-- Render view only if there's a link -->
        <router-view v-slot="{ Component, route }">
        <transition name="fade">
            <keep-alive>
            <component :is="Component" v-if="!route.meta.link" :key="key" />
            </keep-alive>
        </transition>
        </router-view>
    </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AppMain',
  setup () {
    const route = useRoute()
    const key = computed(() => route.fullPath)
    const store = useStore()
    // Fetch user data when app refreshes
    store.dispatch('getUserData')
    return {
      route,
      key
    }
  }
})

</script>

<style scoped>
.app-main {
    display: flex;
    flex-direction: column;
}
</style>
