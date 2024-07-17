<template>
  <el-scrollbar :class="{ mobile: isCollapse }">
    <el-menu
      :collapse="isCollapse"
      :default-active="activeMenu"
      :active-text-color="activeTextColor"
    >
      <side-bar-sub-menu
        v-for="(item, index) in items"
        :key="index"
        :index="item.path"
        :item="item"
        :title="item.title"
        :path="item.path"
        @update:route="handleRouteUpdate"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { User, ChatLineSquare, Setting } from '@element-plus/icons-vue'
import SideBarSubMenu from './SideBarSubMenu.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const isCollapse = computed(() => !(store.state.app.device === 'desktop'))
const route = useRoute()
const router = useRouter()

const activeTextColor = computed(() => {
  return getComputedStyle(document.documentElement).getPropertyValue('--primary-brand-font-color').trim()
})

const activeMenu = computed(() => {
  return route.path
})

const handleRouteUpdate = (path: string) => {
  router.push(path)
}

const items = ref([
  {
    icon: User,
    title: 'User',
    path: '',
    children: [
      {
        path: '',
        text: 'System'
      },
      {
        path: '/user',
        text: 'Game'
      }
    ]
  },
  {
    icon: ChatLineSquare,
    title: 'Question',
    path: '/question',
    children: [
      {
        path: '',
        text: 'Overview'
      },
      {
        path: '/chess',
        text: 'Chess Piece'
      }
    ]
  },
  {
    icon: Setting,
    title: 'Settings',
    path: '/settings'
  }
])
</script>

<style scoped>
.el-menu {
  border-right: none;
}

.el-scrollbar {
  border-right: 1px solid var(--el-menu-border-color);
  min-height: 100%;
}

.el-scrollbar.mobile {
  width: fit-content;
}
</style>
