<template>
  <el-menu-item :index="props.index" v-if="!props.item.children" @click="handleClick(props)">
    <side-bar-item :icon="props.item.icon" :title="props.title" :path="props.path"/>
  </el-menu-item>
  <el-sub-menu v-else :index="props.index">
    <template #title>
      <side-bar-item :icon="props.item.icon" :title="title"/>
    </template>
    <el-menu-item-group
      v-for="(child) in props.item.children"
      :key="child.path"
    >
    <el-menu-item :index="props.path + child.path" @click="handleClick(child)">{{ child.text }}</el-menu-item>
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
  path: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['update:route'])

const handleClick = (child: { path: string }) => {
  let completePath
  if (!props.item.children) {
    completePath = props.path
  } else {
    completePath = props.path + child.path
  }
  emits('update:route', completePath)
}
</script>
