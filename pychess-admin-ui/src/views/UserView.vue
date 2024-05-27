<template>
    <el-header class="table-header">
        <h2>
            Users
        </h2>
        <div class="button-container">
            <el-button>Add User</el-button>
            <el-button>Edit User</el-button>
        </div>
    </el-header>
    <el-main class="table-wrapper">
        <el-scrollbar height="600px">
            <striped-table :table-data="tableData" :table-col-labels="tableColLabels"/>
        </el-scrollbar>
    </el-main>
</template>

<script lang="ts">
import StripedTable from '@/components/StripedTable.vue'
import { listAllUser } from '@/api/user'
import { defineComponent, onMounted, ref } from 'vue'

// const tableData = [
//   {
//     name: 'Soh Zhe Hong',
//     password: 'sohzhehong',
//     email: 'sohzhehong09@gmail.com',
//     status: '0'
//   },
//   {
//     name: 'Soh Jia Seng',
//     password: 'jiaseng123',
//     email: 'jiaseng@gmail.com',
//     status: '1'
//   }
// ]

export default defineComponent({
  name: 'UserView',
  components: { StripedTable },
  setup () {
    const tableData = ref([])
    const tableColLabels = {
      name: 'Name',
      password: 'Password',
      email: 'Email',
      status: 'Status'
    }
    // Fetch data on component mount
    onMounted(async () => {
      const data = await listAllUser('')
      console.log(data)
      tableData.value = data.data
    })

    return {
      tableData,
      tableColLabels
    }
  }
})

</script>
<style scoped>
.table-header {
  text-align: left;
  height: fit-content;
}

.table-header h2 {
  color: var(--primary-brand-font-color);
}

.el-main {
  padding: 0;
}

.table-header .button-container {
  align-self: flex-end;
}
</style>
