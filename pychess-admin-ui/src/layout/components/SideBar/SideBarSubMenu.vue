<template>
      <template v-if="!props.item.hidden">
          <side-bar-item :icon='props.item' :title="props.title"/>
      </template>
      <el-menu-item-group>
          <el-menu-item index="1-1">View All</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
          <el-menu-item index="1-1">Create</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
          <el-menu-item index="1-1">Delete</el-menu-item>
      </el-menu-item-group>
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
