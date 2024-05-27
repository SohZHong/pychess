<template>
    <el-table striped :data="tableData">
        <el-table-column
            v-for="(value, key, index) in tableColLabels"
            :key="index"
            :index="index"
            :prop="key"
            :label="value"
        />
    </el-table>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

interface TableDataItem {
  [key: string]: string | number | boolean | null;
}

interface TableColItem{
    [key: string]: string;
}

export default defineComponent({
  name: 'StripedTable',
  props: {
    tableData: {
      type: Array as PropType<TableDataItem[]>,
      required: true
    },
    tableColLabels: {
      type: Object as PropType<TableColItem>,
      required: true
    }
  }
})
</script>
