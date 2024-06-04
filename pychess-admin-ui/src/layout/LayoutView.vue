<template>
    <el-container class="app-wrapper">
        <el-header class="navbar">
        <app-header />
        </el-header>
        <el-container class="app-container">
            <el-aside :class="{ mobile: isMobile }">
                <side-bar />
            </el-aside>
            <el-container>
                <app-main />
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import SideBar from './components/SideBar/SideBarView.vue'
import { computed } from 'vue'
import { useResizeHandler } from '@/layout/mixin/resizeHandler'

const store = useStore()
const isMobile = computed(() => !(store.state.app.device === 'desktop'))
useResizeHandler()
</script>

<style scoped>
/* Cover the whole page */
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}

.navbar {
    position: 'sticky';
    width: 100%;
}

.el-aside.mobile {
    width: fit-content;
}
</style>
