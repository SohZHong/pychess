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

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => route.fullPath)
</script>

<style scoped>
.app-main {
    display: flex;
    flex-direction: column;
}
</style>
