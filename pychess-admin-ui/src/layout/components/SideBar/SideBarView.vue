<template>
    <el-scrollbar>
        <el-menu>
            <el-sub-menu
                v-for="(item, index) in items"
                :key="index"
                :index="index.toString()"
            >
            <side-bar-sub-menu
                :key="index"
                :index="index.toString()"
                :item="item.icon"
                :title="item.title"
            />
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { User, ChatLineSquare } from '@element-plus/icons-vue'
import SideBarSubMenu from './SideBarSubMenu.vue'
import { ref } from 'vue'

const items = ref([
  { icon: User, title: 'User' },
  { icon: ChatLineSquare, title: 'Question' }
])
</script>
<style scoped>
/* el-menu border can change later */
.el-menu {
    border-right: none;
}

.el-scrollbar {
    border-right: 1px solid var(--el-menu-border-color);
    min-height: 100%;
}
</style>
