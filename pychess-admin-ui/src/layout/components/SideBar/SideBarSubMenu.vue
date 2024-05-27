<template>
      <template v-if="!item.hidden">
          <side-bar-item :icon='item' :title="title"/>
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

<script lang="ts">
import { defineComponent } from 'vue'
import SideBarItem from './SideBarItem.vue'

export default defineComponent({
  name: 'SideBarSubMenu',
  components: { SideBarItem },
  props: {
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
  }
})
</script>
