<template>
    <el-container class="app-wrapper">
        <el-header class="navbar">
        <app-header />
        </el-header>
        <el-container class="app-container">
            <el-aside>
                <side-bar />
            </el-aside>
            <el-container>
                <app-main />
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import SideBar from './components/SideBar/SideBarView.vue'

export default {
  name: 'LayoutView',
  components: {
    AppHeader,
    AppMain,
    SideBar
  }
}
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
</style>
