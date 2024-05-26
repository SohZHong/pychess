<template>
    <el-container class="app-wrapper">
        <el-container>
            <app-main />
        </el-container>
    </el-container>
</template>

<script lang="ts">
import AppMain from './components/AppMain.vue'

export default {
  name: 'LayoutView',
  components: {
    AppMain
  }
}
</script>
