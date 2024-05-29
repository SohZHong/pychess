<template>
    <el-scrollbar>
        <el-menu>
            <side-bar-sub-menu
                v-for="(item, index) in items"
                :key="index"
                :index="index.toString()"
                :item="item"
                :title="item.title"
            />
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { User, ChatLineSquare } from '@element-plus/icons-vue'
import SideBarSubMenu from './SideBarSubMenu.vue'
import { ref } from 'vue'

const items = ref([
  {
    icon: User,
    title: 'User',
    children: [
      {
        path: '/users',
        text: 'View All'
      },
      {
        path: '/create',
        text: 'Create'
      },
      {
        path: '/delete',
        text: 'Delete'
      }
    ]
  },
  {
    icon: ChatLineSquare,
    title: 'Question',
    children: [
      {
        path: '/questions',
        text: 'View All'
      },
      {
        path: '/create',
        text: 'Create'
      }
    ]
  }
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
