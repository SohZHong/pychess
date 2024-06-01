<template>
  <el-icon v-if="props.icon">
    <component :is="icon"></component>
  </el-icon>
  <span :title="props.title">{{ props.title }}</span>
</template>

<script lang="ts" setup>
import { PropType, Component } from 'vue'

const props = defineProps({
  icon: {
    type: Object as PropType<Component>,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: null
  }
})
</script>
