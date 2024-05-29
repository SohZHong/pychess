<template>
  <el-sub-menu ref="subMenu" :index="props.index">
    <template #title>
      <side-bar-item :icon="props.item.icon" :title="title"/>
    </template>
    <el-menu-item-group
      v-for="(child, index) in props.item.children"
      :key="child.path"
    >
    <el-menu-item :index="index" >{{ child.text }}</el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import SideBarItem from './SideBarItem.vue'

const props = defineProps({
  index: {
    type: String,
    required: true
  },
  item: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})
</script>
